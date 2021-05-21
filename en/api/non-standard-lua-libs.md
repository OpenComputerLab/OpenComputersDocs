# Non-standard Lua Libraries

Most of Lua's standard libraries are available, although some of them
may only be available partially or as re-implementations, meaning
behavior may differ slightly. Please see [the Lua 5.3
manual](<http://www.lua.org/manual/5.3/manual.html#6>) for
documentation on the standard libraries.

Descriptions of "re-implementations" are based on OpenOS. Other custom
operating system may have different details.

This page tries to list all *differences* to these standard libraries.

## Basic Functions

The [original
functions](<http://www.lua.org/manual/5.3/manual.html#6.1>) from the
base library are available with the following differences.

- `collectgarbage` is *not* available. - `dofile` and
`loadfile` have been reimplemented to load files from

      mounted file system components (they use [[api:filesystem|the
      filesystem API]] / reimplemented `io` library).

- `load` can only be used to load text, no binary/compiled code by

      default. Note that bytecode loading can be enabled in the config,
      but is really not recommended, since it is a *major security risk*.

- `print`, `io.write`, and `io.stdout:write`, and `term.write`
all

      push strings through stdout, which in most circumstances means gpu
      rendered, i.e. printed to the screen.

## Coroutine Manipulation

The [original
functions](<http://www.lua.org/manual/5.3/manual.html#6.2>) from the
`coroutine` library are available with no observable differences.

Note that the `coroutine.resume` and `coroutine.yield`
implementations exposed to user code are wrappers that take care of
aborting code that does not yield after a certain time (see config), and
to allow differentiating system yields from user yields (system yields
"bubble", for example this is used for the shutdown command and
component API calls). This should not be noticeable from user code,
however. If it is, it should be considered a bug.

## Modules

The package module got a reimplementation for OpenComputers. It should
operate the same as [the
original](<http://www.lua.org/manual/5.3/manual.html#6.3>), but is
lacking the following functions:

- `package.config` is missing and not used. - `package.cpath` is
missing and not used. - `package.loadlib` is not implemented

The latter two are missing because it is impossible to load C code in
OpenComputers.

`require` is a method available in the global scope, i.e. no module
loading is required to have access to it, you can use it on the first
line of your scripts (which is commonly the case). Its interworkings
depend on the `package` library so a description of it is appropriate
here.

- `require(library: string) table`

Returns `library` defined by name. First, if the library has been
loaded previously, the `package` library will have cached it and
`require` will return the cached version of the library. For unloading
a precached library, see `package.loaded`. If the library is not
cached, the `package.path` is searched until a match is found.

- `package.path` **It is recommended that users do not change the
default package.path. Rather they should place their custom libraries in
/usr/lib/**

Defines a list of library search paths that `require` iterates to find
libraries. It is a semi-colon delimited list of paths, using '?' as a
placeholder for a library name passed to `require`. An example would
make this much easier to explain

Default package.path

`/lib/?.lua;/usr/lib/?.lua;/home/lib/?.lua;./?.lua;/lib/?/init.lua;/usr/lib/?/init.lua;/home/lib/?/init.lua;./?/init.lua`

if the user tries to load "foobar"

`local foobar = require("foobar")`

Following is the order of files `require` looks for to resolve
require("foobar"). To make it interesting, we are assuming the current
working directory is /tmp/

      - /lib/foobar.lua
      - /usr/lib/foobar.lua
      - /home/lib/foobar.lua
      - /tmp/foobar.lua
      - /lib/foobar/init.lua
      - /usr/lib/foobar/init.lua
      - /home/lib/foobar/init.lua
      - /tmp/foobar/init.lua

- `package.loaded` **It is nonstandard to modify `package.loaded`**

Contains the source of cached libraries in a table, keyed by the library
name (as given to `require`), and whose value is the cached library
itself. Setting a value to `nil` in this table essentially removes the
library from the cache. Some libraries are assumed to remain loaded for
the proper execution of the operating system.

## String Manipulation

The [original
functions](<http://www.lua.org/manual/5.2/manual.html#6.4>) from the
`string` library are available without alterations.

Note that the functions of the GPU API work on UTF-8 strings, and, by
extension, so does `term.write` and `print`. To help you work with
UTF-8 strings, there is an additional library, [the Unicode
API](/api/unicode).

## Table Manipulation

The [original
functions](<http://www.lua.org/manual/5.2/manual.html#6.5>) from the
`table` library are available without alteration.

## Mathematical Functions

The [original
functions](<http://www.lua.org/manual/5.2/manual.html#6.6>) from the
`math` library are available with minor alterations.

- `math.random` uses a separate `java.util.Random` instance for
each

      Lua state / computer.

- `math.randomseed` is applied to that instance.

## Bitwise Operations

The [original
functions](<http://www.lua.org/manual/5.2/manual.html#6.7>) from the
`bit32` library are available without alteration.

## Input and Output Facilities

The [original
functions](<http://www.lua.org/manual/5.2/manual.html#6.8>) from the
`io` library have been reimplemented for the most part, and work on
mounted filesystem components. Standard input is read by `io.read` (as
well as `term.read` and `io.stdin:read`). Standard ouput is written
to by `io.write` (as well as `term.write`, `io.stdout:write`, and
`print`). Standard error is written to by `io.stderr:write`. For the
most part these should be *functionally* equivalent to the standard
Lua implementation. They may return error strings that differ from
vanilla Lua, though, but since that uses C library errors for the most
part, which are platform dependent, it's not a very good idea to use
these for program logic anyway.

- `io.open(path,mode)` does *not* support the `+` modes, i.e. it
only

      supports `r`, `w`, `a`, and `rb` (`wb` and `ab` are allowed, but
      binary mode has no meaning for writes). Note that `io.open()`
      returns a [[api:buffer#instance_methods|buffered stream]] with
      smart api such as `read("*a")` to read the whole file, or
      `io.read("*l")` to read a single line. Note that a buffered stream
      (returned by `io.open`) can be in binary or text mode, whereas a raw
      stream (returned by `filesystem.open`) is only and always in binary
      mode. The binary vs text mode of a stream only affects `read`.

      `path` is a relative or absolute path to a file you want to open.

      `mode` can be `nil` or a string. `nil` defaults to "r".

      -   **binary mode**

      Streams given by `io.open(path, "rb")` or `filesystem.open(path)`
      are in binary mode. `filesystem.open(path, "rb")` also works, but
      streams returned by `filesystem.open` are **always** in binary mode.
      `stream:read(1)` in binary mode reads a single byte. Reading a
      numerical value via `buffered_stream:read("*n")` reads the data as
      single-byte characters. (buffered streams are returned from
      `io.open`, and support interpreting numerical values from a stream)

      -   **text mode**

      Only streams given by `io.open` that specifically do not use "b"
      in the mode are in text mode. Examples are `io.open(path)` and
      `io.open(path, "r")`. No type of handle given by `filesystem.open`
      is a stream in text mode. `stream:read(1)` in text mode reads a
      single unicode-aware char. This could be a single byte, or even 3
      bytes - depending on the text. Reading a numerical value via
      `buffered_stream:read("*n")` reads the data as unicode chars.
      (buffered streams are returned from `io.open`, and support
      interpreting numerical values from a stream)

      -   `io.open(path, "r")` is equivalent to `io.open(path)`, which
          opens a file in text read-only mode.
      -   `io.open(path, "rb")` opens a file in binary read-only mode.
      -   `io.open(path, "w")` truncates all contents from a file and
          opens it in write-mode. The binary vs text mode of the stream
          does not affect writes. Thus, "w" is functionally equivalent
          to "wb".
      -   `io.open(path, "a")` opens a file in write-mode putting the file
          handle position at the end of the file, meaning the next write
          will append to the end of the file.

- `io.stdin` reads data from the emulated stdin, which defaults to
the

      user input in the openos shell. Note that `io.read()` is short hand
      for `io.stdin:read()`, they resolve to exactly the same operation.

``` io.stdin:read() -- read from std in io.read() -- also read from
std in term.read() -- also read from std in ```

- `io.stdout` writes data to the emulated stdout, which defaults to

      render on the gpu. Note that `io.write()` is short hand for
      `io.stdout:write()`, they resolve to exactly the same operation.

``` io.stdout:write("write to stdout") io.write("also write to
stdout") term.write("also write to stdout, but wraps text if the
string is longer than the width of the screen resolution allows")
```

- `io.stderr` writes data to the emulated stderr, which defaults to

      render on the gpu, but tries to do so in a red color, if supported
      by the primary GPU and Screen. There is no short hand for using
      stderr like there is for stdin and stdout.

``` io.stderr:write("error text to stderr") ```

## Operating System Facilities

The [original
functions](<http://www.lua.org/manual/5.2/manual.html#6.9>) from the
`os` library have been partially reimplemented.

- `os.clock` has been reimplemented to return the approximate CPU

      time, meaning the time the computer has actually been running in an
      executor thread. This is *not* the same as the time the computer has
      been running, for that see [[api:computer|computer.uptime]].

- `os.date` has been reimplemented to use ingame time and supports

      most formats.

- `os.execute` has been reimplemented to start programs from a
mounted

      filesystem via `shell.execute`. The specified string is parsed the
      same as commands entered in the shell.

- `os.exit` throws an error to try and terminate the current

      coroutine.

- `os.setenv` is added to set shell variables from Lua. -
`os.remove` is an alias for `filesystem.remove`. - `os.rename` is
an alias for `filesystem.rename`. - `os.setlocale` is *not*
available. - `os.time` has been reimplemented to return the ingame
time since the

      world has been created.
      Note that this time is in "in-game seconds". To get the number of
      game ticks since the world was created, multiply it with
      `1000/60/60` (since there are 24000 ticks in a day) and
      subtract 6000. This offset of 6000 is not arbitrary, it ensures that
      6 o'clock AM is actually that. Minecraft somehow thinks six
      o'clock in the morning is zero - probably because that's "when"
      a new game starts...

- `os.tmpname` has been reimplemented to generate an unused name in

      the `/tmp` mount.

One additional function has been added:

- `os.sleep(seconds: number)` which allows pausing a script for the

      specified amount of time. `os.sleep` consumes events but registered
      event handlers and threads are still receiving events during the
      sleep. Rephrased, signals will still be processed by event handlers
      while the sleep is active, i.e. you cannot pull signals that were
      accumulated during the sleep after it ended, since no signals will
      remain in the queue (or at least not all of them).

Some new functions that kind of fall into this category are available in
[the computer API](/api/computer).

## Debug

Only `debug.traceback` and `debug.getinfo` (since 1.5.9), which is
limited only to passive info, are implemented.

## Contents

# Non-standard Lua Libraries

Most of Lua's standard libraries are available, although some of them
may only be available partially or as re-implementations, meaning
behavior may differ slightly. Please see [the Lua 5.3
manual](<http://www.lua.org/manual/5.3/manual.html#6>) for
documentation on the standard libraries.

Descriptions of "re-implementations" are based on OpenOS. Other custom
operating system may have different details.

This page tries to list all *differences* to these standard libraries.

## Basic Functions

The [original
functions](<http://www.lua.org/manual/5.3/manual.html#6.1>) from the
base library are available with the following differences.

- `collectgarbage` is *not* available. - `dofile` and
`loadfile` have been reimplemented to load files from

      mounted file system components (they use [[api:filesystem|the
      filesystem API]] / reimplemented `io` library).

- `load` can only be used to load text, no binary/compiled code by

      default. Note that bytecode loading can be enabled in the config,
      but is really not recommended, since it is a *major security risk*.

- `print`, `io.write`, and `io.stdout:write`, and `term.write`
all

      push strings through stdout, which in most circumstances means gpu
      rendered, i.e. printed to the screen.

## Coroutine Manipulation

The [original
functions](<http://www.lua.org/manual/5.3/manual.html#6.2>) from the
`coroutine` library are available with no observable differences.

Note that the `coroutine.resume` and `coroutine.yield`
implementations exposed to user code are wrappers that take care of
aborting code that does not yield after a certain time (see config), and
to allow differentiating system yields from user yields (system yields
"bubble", for example this is used for the shutdown command and
component API calls). This should not be noticeable from user code,
however. If it is, it should be considered a bug.

## Modules

The package module got a reimplementation for OpenComputers. It should
operate the same as [the
original](<http://www.lua.org/manual/5.3/manual.html#6.3>), but is
lacking the following functions:

- `package.config` is missing and not used. - `package.cpath` is
missing and not used. - `package.loadlib` is not implemented

The latter two are missing because it is impossible to load C code in
OpenComputers.

`require` is a method available in the global scope, i.e. no module
loading is required to have access to it, you can use it on the first
line of your scripts (which is commonly the case). Its interworkings
depend on the `package` library so a description of it is appropriate
here.

- `require(library: string) table`

Returns `library` defined by name. First, if the library has been
loaded previously, the `package` library will have cached it and
`require` will return the cached version of the library. For unloading
a precached library, see `package.loaded`. If the library is not
cached, the `package.path` is searched until a match is found.

- `package.path` **It is recommended that users do not change the
default package.path. Rather they should place their custom libraries in
/usr/lib/**

Defines a list of library search paths that `require` iterates to find
libraries. It is a semi-colon delimited list of paths, using '?' as a
placeholder for a library name passed to `require`. An example would
make this much easier to explain

Default package.path

`/lib/?.lua;/usr/lib/?.lua;/home/lib/?.lua;./?.lua;/lib/?/init.lua;/usr/lib/?/init.lua;/home/lib/?/init.lua;./?/init.lua`

if the user tries to load "foobar"

`local foobar = require("foobar")`

Following is the order of files `require` looks for to resolve
require("foobar"). To make it interesting, we are assuming the current
working directory is /tmp/

      - /lib/foobar.lua
      - /usr/lib/foobar.lua
      - /home/lib/foobar.lua
      - /tmp/foobar.lua
      - /lib/foobar/init.lua
      - /usr/lib/foobar/init.lua
      - /home/lib/foobar/init.lua
      - /tmp/foobar/init.lua

- `package.loaded` **It is nonstandard to modify `package.loaded`**

Contains the source of cached libraries in a table, keyed by the library
name (as given to `require`), and whose value is the cached library
itself. Setting a value to `nil` in this table essentially removes the
library from the cache. Some libraries are assumed to remain loaded for
the proper execution of the operating system.

## String Manipulation

The [original
functions](<http://www.lua.org/manual/5.2/manual.html#6.4>) from the
`string` library are available without alterations.

Note that the functions of the GPU API work on UTF-8 strings, and, by
extension, so does `term.write` and `print`. To help you work with
UTF-8 strings, there is an additional library, [the Unicode
API](/api/unicode).

## Table Manipulation

The [original
functions](<http://www.lua.org/manual/5.2/manual.html#6.5>) from the
`table` library are available without alteration.

## Mathematical Functions

The [original
functions](<http://www.lua.org/manual/5.2/manual.html#6.6>) from the
`math` library are available with minor alterations.

- `math.random` uses a separate `java.util.Random` instance for
each

      Lua state / computer.

- `math.randomseed` is applied to that instance.

## Bitwise Operations

The [original
functions](<http://www.lua.org/manual/5.2/manual.html#6.7>) from the
`bit32` library are available without alteration.

## Input and Output Facilities

The [original
functions](<http://www.lua.org/manual/5.2/manual.html#6.8>) from the
`io` library have been reimplemented for the most part, and work on
mounted filesystem components. Standard input is read by `io.read` (as
well as `term.read` and `io.stdin:read`). Standard ouput is written
to by `io.write` (as well as `term.write`, `io.stdout:write`, and
`print`). Standard error is written to by `io.stderr:write`. For the
most part these should be *functionally* equivalent to the standard
Lua implementation. They may return error strings that differ from
vanilla Lua, though, but since that uses C library errors for the most
part, which are platform dependent, it's not a very good idea to use
these for program logic anyway.

- `io.open(path,mode)` does *not* support the `+` modes, i.e. it
only

      supports `r`, `w`, `a`, and `rb` (`wb` and `ab` are allowed, but
      binary mode has no meaning for writes). Note that `io.open()`
      returns a [[api:buffer#instance_methods|buffered stream]] with
      smart api such as `read("*a")` to read the whole file, or
      `io.read("*l")` to read a single line. Note that a buffered stream
      (returned by `io.open`) can be in binary or text mode, whereas a raw
      stream (returned by `filesystem.open`) is only and always in binary
      mode. The binary vs text mode of a stream only affects `read`.

      `path` is a relative or absolute path to a file you want to open.

      `mode` can be `nil` or a string. `nil` defaults to "r".

      -   **binary mode**

      Streams given by `io.open(path, "rb")` or `filesystem.open(path)`
      are in binary mode. `filesystem.open(path, "rb")` also works, but
      streams returned by `filesystem.open` are **always** in binary mode.
      `stream:read(1)` in binary mode reads a single byte. Reading a
      numerical value via `buffered_stream:read("*n")` reads the data as
      single-byte characters. (buffered streams are returned from
      `io.open`, and support interpreting numerical values from a stream)

      -   **text mode**

      Only streams given by `io.open` that specifically do not use "b"
      in the mode are in text mode. Examples are `io.open(path)` and
      `io.open(path, "r")`. No type of handle given by `filesystem.open`
      is a stream in text mode. `stream:read(1)` in text mode reads a
      single unicode-aware char. This could be a single byte, or even 3
      bytes - depending on the text. Reading a numerical value via
      `buffered_stream:read("*n")` reads the data as unicode chars.
      (buffered streams are returned from `io.open`, and support
      interpreting numerical values from a stream)

      -   `io.open(path, "r")` is equivalent to `io.open(path)`, which
          opens a file in text read-only mode.
      -   `io.open(path, "rb")` opens a file in binary read-only mode.
      -   `io.open(path, "w")` truncates all contents from a file and
          opens it in write-mode. The binary vs text mode of the stream
          does not affect writes. Thus, "w" is functionally equivalent
          to "wb".
      -   `io.open(path, "a")` opens a file in write-mode putting the file
          handle position at the end of the file, meaning the next write
          will append to the end of the file.

- `io.stdin` reads data from the emulated stdin, which defaults to
the

      user input in the openos shell. Note that `io.read()` is short hand
      for `io.stdin:read()`, they resolve to exactly the same operation.

``` io.stdin:read() -- read from std in io.read() -- also read from
std in term.read() -- also read from std in ```

- `io.stdout` writes data to the emulated stdout, which defaults to

      render on the gpu. Note that `io.write()` is short hand for
      `io.stdout:write()`, they resolve to exactly the same operation.

``` io.stdout:write("write to stdout") io.write("also write to
stdout") term.write("also write to stdout, but wraps text if the
string is longer than the width of the screen resolution allows")
```

- `io.stderr` writes data to the emulated stderr, which defaults to

      render on the gpu, but tries to do so in a red color, if supported
      by the primary GPU and Screen. There is no short hand for using
      stderr like there is for stdin and stdout.

``` io.stderr:write("error text to stderr") ```

## Operating System Facilities

The [original
functions](<http://www.lua.org/manual/5.2/manual.html#6.9>) from the
`os` library have been partially reimplemented.

- `os.clock` has been reimplemented to return the approximate CPU

      time, meaning the time the computer has actually been running in an
      executor thread. This is *not* the same as the time the computer has
      been running, for that see [[api:computer|computer.uptime]].

- `os.date` has been reimplemented to use ingame time and supports

      most formats.

- `os.execute` has been reimplemented to start programs from a
mounted

      filesystem via `shell.execute`. The specified string is parsed the
      same as commands entered in the shell.

- `os.exit` throws an error to try and terminate the current

      coroutine.

- `os.setenv` is added to set shell variables from Lua. -
`os.remove` is an alias for `filesystem.remove`. - `os.rename` is
an alias for `filesystem.rename`. - `os.setlocale` is *not*
available. - `os.time` has been reimplemented to return the ingame
time since the

      world has been created.
      Note that this time is in "in-game seconds". To get the number of
      game ticks since the world was created, multiply it with
      `1000/60/60` (since there are 24000 ticks in a day) and
      subtract 6000. This offset of 6000 is not arbitrary, it ensures that
      6 o'clock AM is actually that. Minecraft somehow thinks six
      o'clock in the morning is zero - probably because that's "when"
      a new game starts...

- `os.tmpname` has been reimplemented to generate an unused name in

      the `/tmp` mount.

One additional function has been added:

- `os.sleep(seconds: number)` which allows pausing a script for the

      specified amount of time. `os.sleep` consumes events but registered
      event handlers and threads are still receiving events during the
      sleep. Rephrased, signals will still be processed by event handlers
      while the sleep is active, i.e. you cannot pull signals that were
      accumulated during the sleep after it ended, since no signals will
      remain in the queue (or at least not all of them).

Some new functions that kind of fall into this category are available in
[the computer API](/api/computer).

## Debug

Only `debug.traceback` and `debug.getinfo` (since 1.5.9), which is
limited only to passive info, are implemented.

## Contents
