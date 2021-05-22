# Custom Startup Programs

OpenOS provides a variety of tools for running programs automatically.
This document describes all of those tools, how to use them, and their
comparative advantages and disadvantages. Note that some of these
options were not available or as robust an option in older versions of
the operating system. The 1.7.2 development builds (across all supported
minecraft versions) have full support as documented here. The next
general available OC 1.7.3 will include all of the development build
fixes.

Before we cover the access points for running programs automatically,
this document reviews background vs foreground, blocking calls, threads,
and event registrants (listeners and timers).

### Background vs Foreground Interactive Processes

A foreground interactive program interrupts or delays OpenOS from
loading the shell. This type of modal process is a natural fit for
programs that need to wait for user input. For developing background
processes, OpenOS provides threads and event registrants (listeners and
timers). When designing a custom startup program, a user is at liberty
to choose either background or foreground approach, as may suit their
needs.

### Blocking Calls

When building a background process you need to know what is a blocking
call, and what is blocked when you call it. There are two distinct types
of blocking calls: machine blocking and system yielding.

Machine blocking calls are a subset of component api, such as a
filesystem file read, which cause the entire OpenComputer machine state
to wait. These blocking calls are outside the control of the operating
system, are truly blocking, and outside our control. Thus we generally
are not referring to machine blocking calls when we discuss whether an
operation is blocking or not. During a machine blocking call nothing in
the system is running.

In contrast, the system call `computer.pullSignal` yields the current
thread (event.pull and os.sleep also call computer.pullSignal). OpenOS
creates a single init thread and runs all processes inside that one
thread. If you create multiple coroutines and resume them in a
continuous loop, once any single coroutine makes a system yield call --
your loop would be blocked on that one coroutine. You would not see it
yield back to you. For all intents and purposes, all coroutines in that
thread are essentially suspended. When developing a background
application this is a critical workflow to understand. If you need your
application to sleep for 10s before resuming its work, and you call
os.sleep(10), you block execution of the the foreground application
(because are in the same thread). System yielding methods include:
`term.read`, `os.sleep`, and `event.pull`.

### Threads

Review the threading library api documentation [here](/api/thread).
Threads are ideal for developing a background application whose design,
for the most part, can disregard the rest of the system.

#### OpenOS threads are nonblocking processes

As we discussed previously, making a system yield call (anything that
calls `computer.pullSignal`), will suspend all coroutines in the
current thread. However, you have the option to create your own thread.
Any other thread that makes a system yield call does not block your
thread, and your thread is free to make system yield calls without
blocking any other thread. If you want your background process to
broadcast a network message once every second, you can easily do so with
a short while loop:

``` lua
thread.create(function()
    while true do
      modem.broadcast(port, msg)
      os.sleep(1)
    end
end)
```

#### OpenOS threads are not reentrant

The thread is programmed entirely from a single entry point. This
paradigm can be easier to grasp, and allows the programmer to build the
code as subsystem of its own. When the one and only thread function
exits, the thread is dead and will not resume. Also note that when you
create your thread (as described in the [thread](/api/thread)
documentation) it will attach to the current process. A thread blocks
its parent process from closing until itself closes. If you want to run
a truly background thread, not attached to any process, call
`:detach()`.

#### OpenOS threads are "event cooperative"

Event signals are queued and are removed from that queue when you pull
them. If you have multiple and distinct areas of code making
`pullSignal` (or `event.pull`) calls, one process may rob signals
that another process was expecting (event handlers registered via
event.listen is not affected by this). Threads pull from their own queue
(there is no additional memory cost for this, technically a thread is a
registered event handler that is unaffected by signal robbers), and when
designing your background application running on an OpenOS thread, you
need not concern yourself with the rest of the system and the events it
may care about.

#### OpenOS threads are not suitable for low memory systems

OpenOS needs less than 130k of ram to boot and run the interactive
shell. One stick of tier 1 ram provides 196k of ram, thus leaving you
with more than 60k of "wiggle" room. This low memory state is already
severe as it is. However, the boot process does not fully load the
available system libraries. Loading the thread library allocates an
additional ~20k, and each user thread costs ~5k. These are
conservative measurements and, frankly, imprecise due to the nature of
the Lua VM and how it allocates memory in chunks. I will admit, the
threading library could be optimized for memory costs. However, the
threading library has thus far been strongly focused on correctness and
robustness. Future versions will likely have reduced cost. Ideally, your
system has >100k free even with all the libraries you need loaded, and
all of your programs running.

### Event Registrants

Event **listeners** and event **timers** are types of an event
registrant.

Review the event library api documentation [here](/api/event). Event
registrants are ideal for developing background "responders"; tasks
that spin up for short lived jobs in response to some expected event
signal.

#### Event Registrants are reentrant

The event handler function is a callback that is called every time the
condition under its registration is satisfied.

``` lua
event.listen("key_down", function(...)
    handle_key_down(...)
end)
```

`handle_key_down()` is called every time there is a key_down signal.

``` lua
    event.timer(1, function()
      onTimeout()
    end, 10)
```

`onTimeout()` is called every 1s, and 10 times (see the
[event](/api/event) api for details).

The callback also has the option to return `false` (`nil` is not the
same, specifically `false`) to unregister itself. Returning anything
else, or nothing, does not unregister the callback. Timers auto self
unregister when the `times` (3rd parameter) is met.

This reentrant behavior can be easy to use when your program needs to do
a small reoccuring task based on event, but it can be difficult to build
a long running background system that needs to complete various and
disparate jobs. Event registrants may not be well suited for programs
that may need to keep state or complete a long list of jobs, or are
wholely unrelated to a system event. Obviously, these are not rules,
just subjective considerations lacking any context of your specific
needs.

#### Event Registrants are lightweight

Unlike threads, event registrations have a tiny footprint. The most
basic registration `event.listen("key_down", function()end)` could
be as cheap as 400 bytes (you might find that a huge cost, welcome to
the Lua VM). OpenOS already employs many event registrations, and the
system has been heavily optimized for reliability and memory cost around
these.

#### Event Registrants are blocking

In case you skipped it, read about [blocking calls](/tutorial/autorun_options#blocking_calls) earlier in this
document. As stated, OpenOS runs on the singular init thread, and all
processes and event registrants made thereon are suspended when any
actor in that thread makes the system yield call,
`computer.pullSignal` (or any method that calls it, such as
`event.pull`). Thus, it would be unwise to call `os.sleep` in your
event registrant if you also expect the system to respond interactively
with another foreground application, such as the shell.

## Access Points For Automatic Program Execution

The following access points are like "hooks", or script locations,
where you can start your background or foreground application during
machine startup.

### Interactive Shell Startup (.shrc)

The last boot process to load is the OpenOS shell. The shell blocks
until a tty output is available. This means that if there is no gpu or
no screen, the shell startup will wait.

After a stdout for tty becomes available, the shell will finish loading
and will execute `/etc/profile.lua` which loads aliases and sets
environment variables. The last thing `/etc/profile.lua` will do is
[source](https://ss64.com/bash/source.html) your `/home/.shrc` file,
which by default is an empty file. `source` does not run lua code, but
instead runs each line in the file as a shell command. If you have a
script you want to run when the shell loads, put the path to your script
in your `.shrc`. `.shrc` is run each time the shell is loaded, which
may be more than once per boot. The user could type 'exit', or ^d, or
even send a hard interrupt signal and kill the shell (and the init
process will load a new one).

I recommend editing `/home/.shrc` rather than `/etc/profile.lua`
purely for organizational purposes.

### Runscripts (rc)

Review the [rc](/api/rc) documentation.

`/bin/rc` can be used to enable boot level scripts. RC scripts are
started even on systems with no shell, no gpu, no screen, no keyboard.

### Filesystem Autorun (autorun.lua)

Relative to the root of any filesystem, you can create a file named
`autorun.lua` (or `.autorun.lua`). When that filesystem component is
first detected OpenOS will automatically run the file. Note that
`/home/autorun.lua` is not at the root of *rootfs*. This also
applies to the *rootfs*. This autorun will execute each and every time
the filesystem component is added to the system (e.g. you can remove and
re-insert a floppy disk with an autorun).

The feature is enabled by default, and can be disabled on a rw
filesystem by either calling `filesystem.setAutorunEnabled(false)`, or
by modifying /etc/filesystem.cfg directly: `autorun=false`.

### Boot Scripts (/boot/)

This option is really a non-option, documented here to disuade users
with reasonable arguments against doing so.

OpenOS runs boot scripts (sorted by their filenames) in `/boot/` for
its core operations. While it is possible to install custom boot scripts
along side the kernel boot scripts, it is quite unadvisable to do so.

Installing a custom boot script (in `/boot/`) poses the risk that your
boot script may be run before core libraries are available. There is no
guarantee that even invoking `require` in a boot script is safe in the
current version OpenOS, or will be safe in future OpenOS updates (as I
may change the boot order).

There may not be a fully initialized io, there may be an incomplete init
process, there may even be incomplete lua libraries. Depending on the
code you execute in your boot script, you may even unintentionally
circumvent the event dispatching system causing the system to miss
component updates. Yes, there is a lot that the boot process is
responsible for.

With all of that said, here are a couple examples of `/boot` scripts
that would probably work now and for the foreseeable future. Prefix your
script filename 99_ so that it loads at the end of the boot sequence.
If anything doesn't work like you'd expect (such as printing to
stdout, or reading from stdin), it isn't a bug and isn't supported. In
other words, use the `/boot/` script directory at you own risk. If you
need stdout, you can also wait for the `term_available` signal. Again,
this is not an officially supported option.

``` lua
local event = require("event") -- the init signal is fired by
the boot process, means the system is ready event.listen("init",
function()

    local thread = require("thread")
    thread.create(function()
      -- your custom service code as a background thread --
    end):detach()
end)
```

``` lua
local event = require("event")
event.listen("component_added", function(...)
    -- your custom service code as a background event responder --
end)
```

## Contents

# Custom Startup Programs

OpenOS provides a variety of tools for running programs automatically.
This document describes all of those tools, how to use them, and their
comparative advantages and disadvantages. Note that some of these
options were not available or as robust an option in older versions of
the operating system. The 1.7.2 development builds (across all supported
minecraft versions) have full support as documented here. The next
general available OC 1.7.3 will include all of the development build
fixes.

Before we cover the access points for running programs automatically,
this document reviews background vs foreground, blocking calls, threads,
and event registrants (listeners and timers).

### Background vs Foreground Interactive Processes

A foreground interactive program interrupts or delays OpenOS from
loading the shell. This type of modal process is a natural fit for
programs that need to wait for user input. For developing background
processes, OpenOS provides threads and event registrants (listeners and
timers). When designing a custom startup program, a user is at liberty
to choose either background or foreground approach, as may suit their
needs.

### Blocking Calls

When building a background process you need to know what is a blocking
call, and what is blocked when you call it. There are two distinct types
of blocking calls: machine blocking and system yielding.

Machine blocking calls are a subset of component api, such as a
filesystem file read, which cause the entire OpenComputer machine state
to wait. These blocking calls are outside the control of the operating
system, are truly blocking, and outside our control. Thus we generally
are not referring to machine blocking calls when we discuss whether an
operation is blocking or not. During a machine blocking call nothing in
the system is running.

In contrast, the system call `computer.pullSignal` yields the current
thread (event.pull and os.sleep also call computer.pullSignal). OpenOS
creates a single init thread and runs all processes inside that one
thread. If you create multiple coroutines and resume them in a
continuous loop, once any single coroutine makes a system yield call --
your loop would be blocked on that one coroutine. You would not see it
yield back to you. For all intents and purposes, all coroutines in that
thread are essentially suspended. When developing a background
application this is a critical workflow to understand. If you need your
application to sleep for 10s before resuming its work, and you call
os.sleep(10), you block execution of the the foreground application
(because are in the same thread). System yielding methods include:
`term.read`, `os.sleep`, and `event.pull`.

### Threads

Review the threading library api documentation [here](/api/thread).
Threads are ideal for developing a background application whose design,
for the most part, can disregard the rest of the system.

#### OpenOS threads are nonblocking processes

As we discussed previously, making a system yield call (anything that
calls `computer.pullSignal`), will suspend all coroutines in the
current thread. However, you have the option to create your own thread.
Any other thread that makes a system yield call does not block your
thread, and your thread is free to make system yield calls without
blocking any other thread. If you want your background process to
broadcast a network message once every second, you can easily do so with
a short while loop:

``` lua
thread.create(function()
    while true do
      modem.broadcast(port, msg)
      os.sleep(1)
    end
end)
```

#### OpenOS threads are not reentrant

The thread is programmed entirely from a single entry point. This
paradigm can be easier to grasp, and allows the programmer to build the
code as subsystem of its own. When the one and only thread function
exits, the thread is dead and will not resume. Also note that when you
create your thread (as described in the [thread](/api/thread)
documentation) it will attach to the current process. A thread blocks
its parent process from closing until itself closes. If you want to run
a truly background thread, not attached to any process, call
`:detach()`.

#### OpenOS threads are "event cooperative"

Event signals are queued and are removed from that queue when you pull
them. If you have multiple and distinct areas of code making
`pullSignal` (or `event.pull`) calls, one process may rob signals
that another process was expecting (event handlers registered via
event.listen is not affected by this). Threads pull from their own queue
(there is no additional memory cost for this, technically a thread is a
registered event handler that is unaffected by signal robbers), and when
designing your background application running on an OpenOS thread, you
need not concern yourself with the rest of the system and the events it
may care about.

#### OpenOS threads are not suitable for low memory systems

OpenOS needs less than 130k of ram to boot and run the interactive
shell. One stick of tier 1 ram provides 196k of ram, thus leaving you
with more than 60k of "wiggle" room. This low memory state is already
severe as it is. However, the boot process does not fully load the
available system libraries. Loading the thread library allocates an
additional ~20k, and each user thread costs ~5k. These are
conservative measurements and, frankly, imprecise due to the nature of
the Lua VM and how it allocates memory in chunks. I will admit, the
threading library could be optimized for memory costs. However, the
threading library has thus far been strongly focused on correctness and
robustness. Future versions will likely have reduced cost. Ideally, your
system has >100k free even with all the libraries you need loaded, and
all of your programs running.

### Event Registrants

Event **listeners** and event **timers** are types of an event
registrant.

Review the event library api documentation [here](/api/event). Event
registrants are ideal for developing background "responders"; tasks
that spin up for short lived jobs in response to some expected event
signal.

#### Event Registrants are reentrant

The event handler function is a callback that is called every time the
condition under its registration is satisfied.

``` lua
event.listen("key_down", function(...)
    handle_key_down(...)
end)
```

`handle_key_down()` is called every time there is a key_down signal.

```lua
    event.timer(1, function()
      onTimeout()
    end, 10)
```

`onTimeout()` is called every 1s, and 10 times (see the
[event](/api/event) api for details).

The callback also has the option to return `false` (`nil` is not the
same, specifically `false`) to unregister itself. Returning anything
else, or nothing, does not unregister the callback. Timers auto self
unregister when the `times` (3rd parameter) is met.

This reentrant behavior can be easy to use when your program needs to do
a small reoccuring task based on event, but it can be difficult to build
a long running background system that needs to complete various and
disparate jobs. Event registrants may not be well suited for programs
that may need to keep state or complete a long list of jobs, or are
wholely unrelated to a system event. Obviously, these are not rules,
just subjective considerations lacking any context of your specific
needs.

#### Event Registrants are lightweight

Unlike threads, event registrations have a tiny footprint. The most
basic registration `event.listen("key_down", function()end)` could
be as cheap as 400 bytes (you might find that a huge cost, welcome to
the Lua VM). OpenOS already employs many event registrations, and the
system has been heavily optimized for reliability and memory cost around
these.

#### Event Registrants are blocking

In case you skipped it, read about
[blocking calls](/tutorial/autorun_options#blocking_calls) earlier in this
document. As stated, OpenOS runs on the singular init thread, and all
processes and event registrants made thereon are suspended when any
actor in that thread makes the system yield call,
`computer.pullSignal` (or any method that calls it, such as
`event.pull`). Thus, it would be unwise to call `os.sleep` in your
event registrant if you also expect the system to respond interactively
with another foreground application, such as the shell.

## Access Points For Automatic Program Execution

The following access points are like "hooks", or script locations,
where you can start your background or foreground application during
machine startup.

### Interactive Shell Startup (.shrc)

The last boot process to load is the OpenOS shell. The shell blocks
until a tty output is available. This means that if there is no gpu or
no screen, the shell startup will wait.

After a stdout for tty becomes available, the shell will finish loading
and will execute `/etc/profile.lua` which loads aliases and sets
environment variables. The last thing `/etc/profile.lua` will do is
[source](https://ss64.com/bash/source.html) your `/home/.shrc` file,
which by default is an empty file. `source` does not run lua code, but
instead runs each line in the file as a shell command. If you have a
script you want to run when the shell loads, put the path to your script
in your `.shrc`. `.shrc` is run each time the shell is loaded, which
may be more than once per boot. The user could type 'exit', or ^d, or
even send a hard interrupt signal and kill the shell (and the init
process will load a new one).

I recommend editing `/home/.shrc` rather than `/etc/profile.lua`
purely for organizational purposes.

### Runscripts (rc)

Review the [rc](/api/rc) documentation.

`/bin/rc` can be used to enable boot level scripts. RC scripts are
started even on systems with no shell, no gpu, no screen, no keyboard.

### Filesystem Autorun (autorun.lua)

Relative to the root of any filesystem, you can create a file named
`autorun.lua` (or `.autorun.lua`). When that filesystem component is
first detected OpenOS will automatically run the file. Note that
`/home/autorun.lua` is not at the root of *rootfs*. This also
applies to the *rootfs*. This autorun will execute each and every time
the filesystem component is added to the system (e.g. you can remove and
re-insert a floppy disk with an autorun).

The feature is enabled by default, and can be disabled on a rw
filesystem by either calling `filesystem.setAutorunEnabled(false)`, or
by modifying /etc/filesystem.cfg directly: `autorun=false`.

### Boot Scripts (/boot/)

This option is really a non-option, documented here to disuade users
with reasonable arguments against doing so.

OpenOS runs boot scripts (sorted by their filenames) in `/boot/` for
its core operations. While it is possible to install custom boot scripts
along side the kernel boot scripts, it is quite unadvisable to do so.

Installing a custom boot script (in `/boot/`) poses the risk that your
boot script may be run before core libraries are available. There is no
guarantee that even invoking `require` in a boot script is safe in the
current version OpenOS, or will be safe in future OpenOS updates (as I
may change the boot order).

There may not be a fully initialized io, there may be an incomplete init
process, there may even be incomplete lua libraries. Depending on the
code you execute in your boot script, you may even unintentionally
circumvent the event dispatching system causing the system to miss
component updates. Yes, there is a lot that the boot process is
responsible for.

With all of that said, here are a couple examples of `/boot` scripts
that would probably work now and for the foreseeable future. Prefix your
script filename 99_ so that it loads at the end of the boot sequence.
If anything doesn't work like you'd expect (such as printing to
stdout, or reading from stdin), it isn't a bug and isn't supported. In
other words, use the `/boot/` script directory at you own risk. If you
need stdout, you can also wait for the `term_available` signal. Again,
this is not an officially supported option.

``` lua 
local event = require("event") -- the init signal is fired by
the boot process, means the system is ready event.listen("init",
function()

    local thread = require("thread")
    thread.create(function()
      --[[
        your custom service code as a background thread
      ]]--
    end):detach()

end)
```

``` lua
local event = require("event")
event.listen("component_added", function(...)

    --[[
      your custom service code as a background event responder
    ]]--

end)
```