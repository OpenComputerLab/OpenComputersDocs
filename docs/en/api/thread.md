# Thread API

The Thread API provides a variation of coroutines for openos. A thread
is superior to basic coroutines in many ways and, for many workflows, is
easier to work with. An openos thread is an autonomous non-blocking
detachable process.

- **Autonomous**: Threads asynchronously begin execution immediately

      after creation without needing to call resume. Unlike coroutines,
      threads self-resume after yielding and do not yield back to the line
      of code where they were created. Programming with coroutines builds
      on the cooperative yield and resume calls made explicitly by the
      user. Yielding or calling `event.pull` from a thread, however, only
      temporarily blocks just that thread and will continue on its own.

- **Non-Blocking**: Threads can call `computer.pullSignal` (or any

      higher level wrapper such as `event.pull`, `io.pull`, etc) without
      blocking the main kernel process nor any other thread. The thread
      itself is blocked until a signal or timeout occurs. The
      computational flow of the thread behaves just as if the same code
      were run in a script from the command line. Behind the scenes, the
      thread library is using pullSignal to swap between threads, and
      waking threads up when appropriate. This is very much unlike
      coroutines where `computer.pullSignal` blocks all other activity on
      the system until a signal or timeout occurs.

- **Detachable**: By default, threads are owned by the process in

      which they are created (note that threads themselves are a process).
      The owning process is known as the parent process. When a parent
      process is closing (i.e. it has reached the end of its execution) it
      will close(i.e. join) all of its running child threads. A process
      does not have to close a thread when:

      -   The thread detaches from the parent process. see `t:detach()`.
          Note that a thread can also attach to another parent. see
          `t:attach()`

      -   The parent process throws an exception or calls `os.exit` in
          which case all attached threads are killed. Note that rebooting
          also kills all threads.

      -   The thread is killed. see `t:kill()`

      -   The thread is manually suspended. see `t:suspend()`

### Event Registration Independence

A thread maintains an independent set of event registrations; it does
not inherit any and it does not share any. Any event registration made
(e.g. listeners or timers) inside a thread belongs to that thread.

- When a thread dies all of its event registrations die with it. - A
`suspended` thread ignores events (see `t:status() suspended`) - A
thread cannot access/remove/interfere with another thread's event

      registrations.

- A pushed event is observed by all running threads on the system. -
Two separate threads can `event.pull` for the same event, and each

      thread will observe the event independently. ===== Overview =====

There are two main use cases for using threads over other viable options

- You want to write a function that makes blocking calls without

      blocking the rest of your application.

- You want a long running background function without having to manage

      yielding and resuming it manually.

## Functions

There are two sections of API defined here.

1. The [thread](/api/thread#Thread_API) api, or the static

      functions, provided by `require("thread")`

2. The [thread handle](/api/thread#Thread_Handle_API) api, or the

      api available the thread *objects* created by `thread.create`. In
      this documentation these thread handles will be denoted by just `t`.

## Thread API

- `thread.create(thread_proc: function[, ...]): table`

      Starts a new thread executing the function `thread_proc` and returns
      its thread handle, see [[api:thread#Thread_Handle_API|Thread
      Handle API]]. This method takes an optional `...` which is passed
      to `thread_proc`. The runtime of the thread continues autonomously.

``` local thread = require("thread") print("Main program start")
thread.create(function(a, b)

    print(a)
    os.sleep()
    print(b)

end, 'A', 'B') print("Main program end") ```

Output:

      Main program start
      A
      Main program end
      B

- `thread.waitForAll(threads: table[, timeout: number]): boolean,
string`

      Waits for the array of `threads` to complete. This blocking call can
      return in `timeout` seconds if provided. Returns success and an
      error message on failure. A thread is "completed" under multiple
      conditions, see `t:join()` for details.

``` local thread = require("thread") print("Main program start")
local t = thread.create(function(a, b)

    print(a)
    os.sleep()
    print(b)

end, 'A', 'B') thread.waitForAll({t}) print("Main program end")
```

Output:

      Main program start
      A
      B
      Main program end

- `thread.waitForAny(threads: table[, timeout: number): boolean,
string`

      Waits for any single thread to complete and is otherwise equivalent
      to `thread.waitForAll()`

``` local thread = require("thread") print("Main program start")
local t1 = thread.create(function(a, b)

    print(a)
    os.sleep()
    print(b)

end, 'A', 'B') local t2 = thread.create(function(c, d)

    print(c)
    os.sleep()
    os.sleep()
    print(d)

end, 'C', 'D') thread.waitForAny({t1, t2}) print("Main program
end") ```

Output:

      Main program start
      A
      C
      B
      Main program end
      D

Please note that threads resume order is not specified and this example
may print "D" before it prints "Main program end"

- `thread.current(): table`

      Returns the current thread `t` object. The init process does not
      represent a thread and nothing is returned from this method if
      called from the init process and not inside any thread.

## Thread Handle API

- `t:resume(): boolean, string`

      Resumes (or thaws) a suspended thread. Returns success and an error
      message on failure. A thread begins its life already in a running
      state and thus basic thread workflows will not ever need to call
      `t:resume()`. A "running" thread will autonomously continue until
      it completes. `t:resume()` is only necessary to resume a thread that
      has been suspended(`t:suspend()`). **Note** that because you are not
      directly resuming the thread any exceptions thrown from the thread
      are absorbed by the threading library and not exposed to your
      process.

      -   At this time there is no way to hook in an exception handler for
          threads but for now `event.onError` is used to print the error
          message to "/tmp/event.log". Please note that currently the
          hard interrupt exception is only thrown once, and the behavior
          of a process with threads when a hard interrupt is thrown is
          unspecified. At this time, any one of the threads or the parent
          process may take the exception. These details are not part of
          the specification for threads and any part of this
          implementation detail may change later.

- `t:suspend(): boolean, string`

      Suspends (or freezes) a running thread. Returns success and an error
      message on failure. A "suspended" thread never autonomously wakes
      up and dies as soon as its parent process (if attached) closes. A
      suspended thread ignores events. That means any event listeners or
      timers created inside the thread will not respond to event
      notifications. Note that threads do not buffer event signals and a
      suspended thread may miss event signals it was waiting for. For
      example, if a thread was last waiting on
      `event.pull("modem_message")` and is "suspended" and a
      "modem_message" is received by the computer then the thread will
      miss the event and never know it happened. Please note that if you
      suspend a thread that is blocked waiting for an event, it is
      unspecified which event the thread will receive when it is next
      resumed.

      Suspending the current thread causes the thread to immediately yield
      and does not resume until `t:resume()` is called explicitly
      elsewhere.

**Special notes about `t:resume`, `t:suspend`**

Do not think of these methods as `coroutine.resume()` nor
`coroutine.yield()`. These methods are indirect and a thread will
asynchronously start or stop running on its own. Contrast this to
coroutine methods which directly and immediately invoke execution or
leave execution of a coroutine. Consider these examples:

``` local thread = require("thread") local t -- this example needs
an upvalue to t t = thread.create(function()

    print("start")
    thread.current():suspend()
    print("after suspend")
    os.sleep()
    print("after sleep")

end) ```

Output:

      start

``` local thread = require("thread") local t -- this example needs
an upvalue to t t = thread.create(function()

    print("start")
    thread.current():suspend()
    print("after suspend")
    os.sleep()
    print("after sleep")

end) print("outside thread create") t:resume() print("after resume")
```

Output:

      start
      outside thread create
      after suspend
      after resume
      after sleep

- `t:kill()`

      Stabby stab! Kills the thread dead. The thread is terminated and
      will not continue its thread function. Any event registrations it
      made will die with it. Keep in mind that the core underlying Lua
      type is a coroutine which is not a preemptive thread. Thus, the
      thread's stopping points are deterministic, meaning that you can
      predict exactly where the thread will stop. Consider this example:

``` local thread = require("thread") local t =
thread.create(function()

    while true do
      print("running")
      print("still running")
      os.sleep()
      print("after sleep")
    end
    print("unreachable code")

end) print("before kill") t:kill() print("after kill") ```

Output:

      running
      still running
      before kill
      after kill

- `t:status(): string`

      Returns the thread status as a string.

      -   **"running"**

      A running thread will continue (autonomously reactivating) after
      yields and blocking calls until its thread function exits. This is
      the default and initial state of a created thread. A thread remains
      in the "running" state even when blocked or not active. A running
      thread can be suspended(`t:suspend()`) or killed (`t:kill()`) but
      not resumed(`t:resume()`). A running thread will block calls to
      `t:join()` and block its parent from closing. Unlike a coroutine
      which appears "suspended" when not executing in this very moment,
      a thread state remains "running" even when waiting for an event.

      -   **"suspended"**

      A suspended thread will remain suspended and never self resume
      execution of its thread function. A suspended thread is
      automatically killed when its attached parent closes or when you
      attempt to `t:join()` it. A suspended thread ignores event signals,
      and any event registrations made from the context of the thread, or
      any child threads created therein, also ignore any event signals. A
      suspended thread's children behave as if suspended even if their
      status is "running". A suspended thread can be
      resumed(`t:resume()`) or killed (`t:kill()`) but not
      suspended(`t:suspend()`).

      -   **"dead"**

      A dead thread has completed or aborted its execution or has been
      terminated. It cannot be resumed(`t:resume()`) nor
      suspended(`t:suspend()`). A dead thread does not block a parent
      process from closing. Killing a dead thread is not an error but does
      nothing.

** Status Examples **

``` local thread = require("thread") local t =
thread.create(function()

    print("before sleep")
    os.sleep()
    print("after sleep")

end) print(t:status()) ```

Output:

      before sleep
      running
      after sleep

``` local thread = require("thread") local t =
thread.create(function()

    print("before sleep")
    os.sleep()
    print("after sleep")

end) t:suspend() print(t:status()) os.sleep(10) print(t:status())
t:resume() print("after resume") print(t:status()) ```

Output:

      before sleep
      suspended
      suspended
      after resume
      dead

- `t:attach([level: number]): boolean, string`

      Attaches a thread to a process, conventionally known as a child
      thread or attached thread. `level` is an optional used to get parent
      processes, 0 or nil uses the currently running process. When
      initially created a thread is already attached to the current
      process. This method returns nil and an error message if `level`
      refers to a nonexistent process, otherwise it returns truthy. An
      attached thread blocks its parent process from closing until the
      thread dies (or is killed, or the parent process aborts).

- `t:detach(): table, string`

      Detaches a thread from its parent if it has one. Returns nil and an
      error message if no action was taken, otherwise returns self (handy
      if you want to create and detach a thread in one line). A detached
      thread will continue to run until the computer is shutdown or
      rebooted, or the thread dies.

``` local detached_thread = thread.create(function() end):detach()
```

- `t:join([timeout: number]): boolean, string`

      Blocks the caller until `t` is no longer running or (optionally)
      returns false if `timeout` seconds is reached. After a call to
      `t:join()` the thread state is "dead". Any of the following
      circumstances allow `join` to finish and unblock the caller

      -   The thread continues running until it returns from its thread
          function
      -   The thread aborts, or throws an uncaught exception
      -   The thread is suspended
      -   The thread is killed

      Calling `thread.waitForAll({t})` is functionally equivalent to
      calling `t:join()`. When a processs is closing it will call
      `thread.waitForAll` on the group of its child threads if it has any.
      A child thread blocks its parent thread by the same machanism.

## Thread Exception Example

This example demonstrates what happens when a thread throws an
exception. A thread stops executing and becomes "dead" when it throws
an uncaught exception. The exception message is not printed to stdout
nor stderr (see `t:resume()`) for details.

``` local thread = require("thread") local tty = require("tty")

print("p start") local reader = thread.create(function()

    print("reader start")
    error("thread abort") -- throws an exception
    print("reader done")

end) print("p end", reader:status()) ```

Output

      p start
      reader start
      p end   dead

## Thread Interrupt Handler Example

This example demonstrates how you would register a function that handles
soft interrupts (^c) to close file handles, release resources, etc, and
then exit the whole program.

``` local thread = require("thread") local event =
require("event")

local cleanup_thread = thread.create(function()

    event.pull("interrupted")
    print("cleaning up resources")

end)

local main_thread = thread.create(function()

    print("main program")
    while true do
      io.write("input: ")
      io.read()
    end

end)

thread.waitForAny({cleanup_thread, main_thread}) os.exit(0) -- closes
all remaining threads ```

Assuming the user presses ^c to send an interrupt Output

      main program
      input: ^c
      cleaning up resources

## Thread Yield/Pull Without Blocking Example

This example demonstrates that now OpenOS supports non blocking threads.

``` local event = require("event") local thread =
require("thread") thread.create(function()

    a,b,c,d,e,f,g = coroutine.yield()
    print(a,b,c,d,e,f,g)
    print(event.pull())

end)

event.push("custom_event_a") print("done")
event.push("custom_event_b", 2) ```

Output

      custom_event_a
      done
      custom_event_b  2

## Contents

# Thread API

The Thread API provides a variation of coroutines for openos. A thread
is superior to basic coroutines in many ways and, for many workflows, is
easier to work with. An openos thread is an autonomous non-blocking
detachable process.

- **Autonomous**: Threads asynchronously begin execution immediately

      after creation without needing to call resume. Unlike coroutines,
      threads self-resume after yielding and do not yield back to the line
      of code where they were created. Programming with coroutines builds
      on the cooperative yield and resume calls made explicitly by the
      user. Yielding or calling `event.pull` from a thread, however, only
      temporarily blocks just that thread and will continue on its own.

- **Non-Blocking**: Threads can call `computer.pullSignal` (or any

      higher level wrapper such as `event.pull`, `io.pull`, etc) without
      blocking the main kernel process nor any other thread. The thread
      itself is blocked until a signal or timeout occurs. The
      computational flow of the thread behaves just as if the same code
      were run in a script from the command line. Behind the scenes, the
      thread library is using pullSignal to swap between threads, and
      waking threads up when appropriate. This is very much unlike
      coroutines where `computer.pullSignal` blocks all other activity on
      the system until a signal or timeout occurs.

- **Detachable**: By default, threads are owned by the process in

      which they are created (note that threads themselves are a process).
      The owning process is known as the parent process. When a parent
      process is closing (i.e. it has reached the end of its execution) it
      will close(i.e. join) all of its running child threads. A process
      does not have to close a thread when:

      -   The thread detaches from the parent process. see `t:detach()`.
          Note that a thread can also attach to another parent. see
          `t:attach()`

      -   The parent process throws an exception or calls `os.exit` in
          which case all attached threads are killed. Note that rebooting
          also kills all threads.

      -   The thread is killed. see `t:kill()`

      -   The thread is manually suspended. see `t:suspend()`

### Event Registration Independence

A thread maintains an independent set of event registrations; it does
not inherit any and it does not share any. Any event registration made
(e.g. listeners or timers) inside a thread belongs to that thread.

- When a thread dies all of its event registrations die with it. - A
`suspended` thread ignores events (see `t:status() suspended`) - A
thread cannot access/remove/interfere with another thread's event

      registrations.

- A pushed event is observed by all running threads on the system. -
Two separate threads can `event.pull` for the same event, and each

      thread will observe the event independently. ===== Overview =====

There are two main use cases for using threads over other viable options

- You want to write a function that makes blocking calls without

      blocking the rest of your application.

- You want a long running background function without having to manage

      yielding and resuming it manually.

## Functions

There are two sections of API defined here.

1. The [thread](/api/thread#Thread_API) api, or the static

      functions, provided by `require("thread")`

2. The [thread handle](/api/thread#Thread_Handle_API) api, or the

      api available the thread *objects* created by `thread.create`. In
      this documentation these thread handles will be denoted by just `t`.

## Thread API

- `thread.create(thread_proc: function[, ...]): table`

      Starts a new thread executing the function `thread_proc` and returns
      its thread handle, see [[api:thread#Thread_Handle_API|Thread
      Handle API]]. This method takes an optional `...` which is passed
      to `thread_proc`. The runtime of the thread continues autonomously.

``` local thread = require("thread") print("Main program start")
thread.create(function(a, b)

    print(a)
    os.sleep()
    print(b)

end, 'A', 'B') print("Main program end") ```

Output:

      Main program start
      A
      Main program end
      B

- `thread.waitForAll(threads: table[, timeout: number]): boolean,
string`

      Waits for the array of `threads` to complete. This blocking call can
      return in `timeout` seconds if provided. Returns success and an
      error message on failure. A thread is "completed" under multiple
      conditions, see `t:join()` for details.

``` local thread = require("thread") print("Main program start")
local t = thread.create(function(a, b)

    print(a)
    os.sleep()
    print(b)

end, 'A', 'B') thread.waitForAll({t}) print("Main program end")
```

Output:

      Main program start
      A
      B
      Main program end

- `thread.waitForAny(threads: table[, timeout: number): boolean,
string`

      Waits for any single thread to complete and is otherwise equivalent
      to `thread.waitForAll()`

``` local thread = require("thread") print("Main program start")
local t1 = thread.create(function(a, b)

    print(a)
    os.sleep()
    print(b)

end, 'A', 'B') local t2 = thread.create(function(c, d)

    print(c)
    os.sleep()
    os.sleep()
    print(d)

end, 'C', 'D') thread.waitForAny({t1, t2}) print("Main program
end") ```

Output:

      Main program start
      A
      C
      B
      Main program end
      D

Please note that threads resume order is not specified and this example
may print "D" before it prints "Main program end"

- `thread.current(): table`

      Returns the current thread `t` object. The init process does not
      represent a thread and nothing is returned from this method if
      called from the init process and not inside any thread.

## Thread Handle API

- `t:resume(): boolean, string`

      Resumes (or thaws) a suspended thread. Returns success and an error
      message on failure. A thread begins its life already in a running
      state and thus basic thread workflows will not ever need to call
      `t:resume()`. A "running" thread will autonomously continue until
      it completes. `t:resume()` is only necessary to resume a thread that
      has been suspended(`t:suspend()`). **Note** that because you are not
      directly resuming the thread any exceptions thrown from the thread
      are absorbed by the threading library and not exposed to your
      process.

      -   At this time there is no way to hook in an exception handler for
          threads but for now `event.onError` is used to print the error
          message to "/tmp/event.log". Please note that currently the
          hard interrupt exception is only thrown once, and the behavior
          of a process with threads when a hard interrupt is thrown is
          unspecified. At this time, any one of the threads or the parent
          process may take the exception. These details are not part of
          the specification for threads and any part of this
          implementation detail may change later.

- `t:suspend(): boolean, string`

      Suspends (or freezes) a running thread. Returns success and an error
      message on failure. A "suspended" thread never autonomously wakes
      up and dies as soon as its parent process (if attached) closes. A
      suspended thread ignores events. That means any event listeners or
      timers created inside the thread will not respond to event
      notifications. Note that threads do not buffer event signals and a
      suspended thread may miss event signals it was waiting for. For
      example, if a thread was last waiting on
      `event.pull("modem_message")` and is "suspended" and a
      "modem_message" is received by the computer then the thread will
      miss the event and never know it happened. Please note that if you
      suspend a thread that is blocked waiting for an event, it is
      unspecified which event the thread will receive when it is next
      resumed.

      Suspending the current thread causes the thread to immediately yield
      and does not resume until `t:resume()` is called explicitly
      elsewhere.

**Special notes about `t:resume`, `t:suspend`**

Do not think of these methods as `coroutine.resume()` nor
`coroutine.yield()`. These methods are indirect and a thread will
asynchronously start or stop running on its own. Contrast this to
coroutine methods which directly and immediately invoke execution or
leave execution of a coroutine. Consider these examples:

``` local thread = require("thread") local t -- this example needs
an upvalue to t t = thread.create(function()

    print("start")
    thread.current():suspend()
    print("after suspend")
    os.sleep()
    print("after sleep")

end) ```

Output:

      start

``` local thread = require("thread") local t -- this example needs
an upvalue to t t = thread.create(function()

    print("start")
    thread.current():suspend()
    print("after suspend")
    os.sleep()
    print("after sleep")

end) print("outside thread create") t:resume() print("after resume")
```

Output:

      start
      outside thread create
      after suspend
      after resume
      after sleep

- `t:kill()`

      Stabby stab! Kills the thread dead. The thread is terminated and
      will not continue its thread function. Any event registrations it
      made will die with it. Keep in mind that the core underlying Lua
      type is a coroutine which is not a preemptive thread. Thus, the
      thread's stopping points are deterministic, meaning that you can
      predict exactly where the thread will stop. Consider this example:

``` local thread = require("thread") local t =
thread.create(function()

    while true do
      print("running")
      print("still running")
      os.sleep()
      print("after sleep")
    end
    print("unreachable code")

end) print("before kill") t:kill() print("after kill") ```

Output:

      running
      still running
      before kill
      after kill

- `t:status(): string`

      Returns the thread status as a string.

      -   **"running"**

      A running thread will continue (autonomously reactivating) after
      yields and blocking calls until its thread function exits. This is
      the default and initial state of a created thread. A thread remains
      in the "running" state even when blocked or not active. A running
      thread can be suspended(`t:suspend()`) or killed (`t:kill()`) but
      not resumed(`t:resume()`). A running thread will block calls to
      `t:join()` and block its parent from closing. Unlike a coroutine
      which appears "suspended" when not executing in this very moment,
      a thread state remains "running" even when waiting for an event.

      -   **"suspended"**

      A suspended thread will remain suspended and never self resume
      execution of its thread function. A suspended thread is
      automatically killed when its attached parent closes or when you
      attempt to `t:join()` it. A suspended thread ignores event signals,
      and any event registrations made from the context of the thread, or
      any child threads created therein, also ignore any event signals. A
      suspended thread's children behave as if suspended even if their
      status is "running". A suspended thread can be
      resumed(`t:resume()`) or killed (`t:kill()`) but not
      suspended(`t:suspend()`).

      -   **"dead"**

      A dead thread has completed or aborted its execution or has been
      terminated. It cannot be resumed(`t:resume()`) nor
      suspended(`t:suspend()`). A dead thread does not block a parent
      process from closing. Killing a dead thread is not an error but does
      nothing.

** Status Examples **

``` local thread = require("thread") local t =
thread.create(function()

    print("before sleep")
    os.sleep()
    print("after sleep")

end) print(t:status()) ```

Output:

      before sleep
      running
      after sleep

``` local thread = require("thread") local t =
thread.create(function()

    print("before sleep")
    os.sleep()
    print("after sleep")

end) t:suspend() print(t:status()) os.sleep(10) print(t:status())
t:resume() print("after resume") print(t:status()) ```

Output:

      before sleep
      suspended
      suspended
      after resume
      dead

- `t:attach([level: number]): boolean, string`

      Attaches a thread to a process, conventionally known as a child
      thread or attached thread. `level` is an optional used to get parent
      processes, 0 or nil uses the currently running process. When
      initially created a thread is already attached to the current
      process. This method returns nil and an error message if `level`
      refers to a nonexistent process, otherwise it returns truthy. An
      attached thread blocks its parent process from closing until the
      thread dies (or is killed, or the parent process aborts).

- `t:detach(): table, string`

      Detaches a thread from its parent if it has one. Returns nil and an
      error message if no action was taken, otherwise returns self (handy
      if you want to create and detach a thread in one line). A detached
      thread will continue to run until the computer is shutdown or
      rebooted, or the thread dies.

``` local detached_thread = thread.create(function() end):detach()
```

- `t:join([timeout: number]): boolean, string`

      Blocks the caller until `t` is no longer running or (optionally)
      returns false if `timeout` seconds is reached. After a call to
      `t:join()` the thread state is "dead". Any of the following
      circumstances allow `join` to finish and unblock the caller

      -   The thread continues running until it returns from its thread
          function
      -   The thread aborts, or throws an uncaught exception
      -   The thread is suspended
      -   The thread is killed

      Calling `thread.waitForAll({t})` is functionally equivalent to
      calling `t:join()`. When a processs is closing it will call
      `thread.waitForAll` on the group of its child threads if it has any.
      A child thread blocks its parent thread by the same machanism.

## Thread Exception Example

This example demonstrates what happens when a thread throws an
exception. A thread stops executing and becomes "dead" when it throws
an uncaught exception. The exception message is not printed to stdout
nor stderr (see `t:resume()`) for details.

``` local thread = require("thread") local tty = require("tty")

print("p start") local reader = thread.create(function()

    print("reader start")
    error("thread abort") -- throws an exception
    print("reader done")

end) print("p end", reader:status()) ```

Output

      p start
      reader start
      p end   dead

## Thread Interrupt Handler Example

This example demonstrates how you would register a function that handles
soft interrupts (^c) to close file handles, release resources, etc, and
then exit the whole program.

``` local thread = require("thread") local event =
require("event")

local cleanup_thread = thread.create(function()

    event.pull("interrupted")
    print("cleaning up resources")

end)

local main_thread = thread.create(function()

    print("main program")
    while true do
      io.write("input: ")
      io.read()
    end

end)

thread.waitForAny({cleanup_thread, main_thread}) os.exit(0) -- closes
all remaining threads ```

Assuming the user presses ^c to send an interrupt Output

      main program
      input: ^c
      cleaning up resources

## Thread Yield/Pull Without Blocking Example

This example demonstrates that now OpenOS supports non blocking threads.

``` local event = require("event") local thread =
require("thread") thread.create(function()

    a,b,c,d,e,f,g = coroutine.yield()
    print(a,b,c,d,e,f,g)
    print(event.pull())

end)

event.push("custom_event_a") print("done")
event.push("custom_event_b", 2) ```

Output

      custom_event_a
      done
      custom_event_b  2

## Contents
