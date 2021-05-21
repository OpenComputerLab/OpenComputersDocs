# APIs

## Standard Libraries

First and foremost you should get familiar with the
[Lua reference manual](http://www.lua.org/manual/5.3/manual.html),
if you are new to Lua. You will find most basic Lua functionality
explained there, as well as a bunch of standard library functions.

OpenComputers makes an effort to largely emulate the standard library in
areas that would usually interact with the host system - that being the
I/O library. There are a few differences, which you can look up here:
[differences in the standard libraries](/api/non-standard-lua-libs).
Most notably, the debug library is mostly unavailable, and `load` only
accepts text source files, no binary / pre-compiled Lua programs (for
security reasons).

These standard libraries are available in the global environment and
thus are immediately available; meaning they do not need to be loaded in
your scripts to be accessible.

- [coroutine](/api/non-standard-lua-libs#coroutine_manipulation)
- [debug](/api/non-standard-lua-libs#debug)
- [io](/api/non-standard-lua-libs#input_and_output_facilities)
- [math](/api/non-standard-lua-libs#mathematical_functions)
- [os](/api/non-standard-lua-libs#operating_system_facilities)
- [package](/api/non-standard-lua-libs#Modules)
- `print` Not a library, but a commonly used standard method for printing text to stdout.\
      Ex. `print("hello world")`
- [string](/api/non-standard-lua-libs#string_manipulation)
- [table](/api/non-standard-lua-libs#table_manipulation)

## Custom Libraries

Following is a description of the non-standard libraries, provided for
convenience.

Note that you need to `require` all non-standard APIs before you use
them, i.e. all modules not listed in the [Lua reference manual](http://www.lua.org/manual/5.3/manual.html) nor in
[#standard_libraries]. For example, instead of simple going `local
rs = component.redstone`, you now need to require the component API,
like so:

``` lua
local component = require("component")
local rs = component.redstone
 
--You can of course change the variable name:
local mycomp = require("component")
local rs = mycomp.redstone
```

The same applies for all other APIs listed below (even `sides` and
`colors`).

The standard libraries aside, OpenComputers comes with a couple of
additional, built-in libraries. Here is a list of all these libraries.
Note that some of these may not be usable depending on your
configuration (HTTP) and context (Robot library on computers), but
they'll still be there.

- [buffer](/api/buffer): a Lua `FILE*` API buffer implementation for wrapping streams.

- [colors](/api/colors): a global table that allows referencing standard Minecraft colors by name.

- [component](/api/component): look-up and management of components attached to the computer.

- [computer](/api/computer): information on and interactions with the computer the Lua state is running on.

- [event](/api/event): an event system, often used by libraries, for pulling and registering handlers to signals.

- [uuid](/api/uuid): creates long unique identifier strings in the common 8-4-4-4-12 format.

- [filesystem](/api/fileSystem): abstracted interaction with file system components.

- [internet](/api/internet): a wrapper for Internet Card functionality.

- [keyboard](/api/keyboard): a table of key codes by name and pressed key tracking.

- [note](/api/note): converts music notes between their real name, their MIDI code and their frequency

- [process](/api/process): keeps track of running programs and their environments.

- [rc](/api/rc): provides automatic program execution and service management.

- [robot](/api/robot): abstracted access to robot actions.

- [serialization](/api/serialization): allows serialization of values, e.g. for sending them via the network.

- [shell](/api/shell): working path tracking and program execution.

- [sides](/api/sides): a global table that allows referencing sides by name.

- [term](/api/term): provides the concept of the cursor, to read and write from keyboard input and screen output, respectively.

- [text](/api/text): provides text utilities such as tab to space conversion.

- [thread](/api/thread): provides autonomous and non-blocking cooperative threads.

- [transforms](/api/transforms): provides helpful and advanced table manipulators.

- [unicode](/api/unicode): provides Unicode aware implementations of some functions in the string library.