# Writing custom OSes

Starting with OpenComputers 1.3 computers need an "Operating System"
to function - OpenOS is no longer built-in. As of 1.4(.2?) you even need
an EEPROM in your computers, which acts as the BIOS of the machine.
While this makes it slightly more annoying to set up computers, it opens
up a lot more possibilities for people that want to write their own
OSes; which is what this article is all about!

## Booting

The only thing built-in now is the "machine" booting the BIOS. This
"machine" wrapper is a non-editable Lua script responsible for setting
up the sandbox and super-low-level interaction with the "host" side of
things (that being Java/Scala). When a computer is powered on, that
script is loaded and run. After estabilishing the sandboxed environment
it looks for an EEPROM and tries to run the data on it as a Lua script.
If that fails the computer crashes. Otherwise that BIOS is run. For the
provided one (Lua BIOS, crafted using EEPROM + book) it will perform the
actions previously done by the machine itself:

The only thing built-in now is the "machine" booting the BIOS. This "machine" wrapper is a non-editable Lua script responsible for setting up the sandbox and super-low-level interaction with the "host" side of things (that being Java/Scala). When a computer is powered on, that script is loaded and run. After estabilishing the sandboxed environment it looks for an EEPROM and tries to run the data on it as a Lua script. If that fails the computer crashes. Otherwise that BIOS is run. For the provided one (Lua BIOS, crafted using EEPROM + book) it will perform the actions previously done by the machine itself:

1. It looks for a file system with address set via `computer.setBootAddress` (read via `computer.getBootAddress`).
2. On that file system it tries to load and execute a Lua script from a file named `init.lua`.
3. If it succeeds, that's it. The user script is now in control. If it fails, it iterates over all present file systems, performing step 2 again until it succeeds.
4. If no working `init.lua` script is found, the computer crashes with a `no bootable medium found` error.

But since you can program the EEPROM however you like you could also boot from a network device, for example.

## What's Available?

There are a few libraries documented on the wiki that are in fact part of OpenOS, so when you're implementing your own operation system, those won't be at your disposal. Most notably that includes the `io`, `package` and `filesystem` libraries. For a definite reference for what's available in an init script, check the kernel or [machine.lua script for your current OpenComputers version](https://github.com/MightyPirates/OpenComputers/blob/master-MC1.12/src/main/resources/assets/opencomputers/lua/machine.lua). The following list isn't guaranteed to be complete and/or up-to-date!

```lua
_G
_VERSION

assert
error
getmetatable
ipairs
load
next
pairs
pcall
rawequal
rawget
rawlen
rawset
select
setmetatable
tonumber
tostring
type
xpcall

bit32.arshift
bit32.band
bit32.bnot
bit32.bor
bit32.btest
bit32.bxor
bit32.extract
bit32.lrotate
bit32.lshift
bit32.replace
bit32.rrotate
bit32.rshift

coroutine.create
coroutine.resume
coroutine.running
coroutine.status
coroutine.wrap
coroutine.yield

debug.getinfo
debug.traceback
debug.getlocal
debug.getupvalue

math.abs
math.acos
math.asin
math.atan
math.atan2
math.ceil
math.cos
math.cosh
math.deg
math.exp
math.floor
math.fmod
math.frexp
math.huge
math.ldexp
math.log
math.max
math.min
math.modf
math.pi
math.pow
math.rad
math.random
math.randomseed
math.sin
math.sinh
math.sqrt
math.tan
math.tanh

os.clock
os.date
os.difftime
os.time

string.byte
string.char
string.dump
string.find
string.format
string.gmatch
string.gsub
string.len
string.lower
string.match
string.rep
string.reverse
string.sub
string.upper

table.concat
table.insert
table.pack
table.remove
table.sort
table.unpack

checkArg

component.doc
component.fields
component.invoke
component.list
component.methods
component.proxy
component.slot
component.type

computer.address
computer.addUser
computer.beep
computer.energy
computer.freeMemory
computer.getArchitectures
computer.getArchitecture
computer.getBootAddress
computer.getDeviceInfo
computer.getProgramLocations
computer.isRobot
computer.maxEnergy
computer.pullSignal
computer.pushSignal
computer.removeUser
computer.setArchitecture
computer.setBootAddress
computer.shutdown
computer.tmpAddress
computer.totalMemory
computer.uptime
computer.users

unicode.char
unicode.charWidth
unicode.isWide
unicode.len
unicode.lower
unicode.reverse
unicode.sub
unicode.upper
unicode.wlen
unicode.wtrunc

-- Lua 5.3 only:
coroutine.isyieldable

string.pack
string.unpack
string.packsize

table.move

math.maxinteger
math.mininteger
math.tointeger
math.type
math.ult

utf8.char
utf8.charpattern
utf8.codes
utf8.codepoint
utf8.len
utf8.offset
```

## Accessing components in BIOS

Unlike in OpenOS you don't have the primary system for components in BIOS. That means you cannot just write `component.redstone.setOutput`, you have to manually create your proxy for the component first. For several reasons the proxy system is provided via the machine itself, so you can still use that. To get a proxy, use the `component.proxy` method. It expects the address of the component to wrap. You can either write that down manually, or get the list of components using `component.list` and go from there.

For example, to get the first best redstone component, you can do the following:

```lua
local r = component.proxy(component.list("redstone")())
```

This works because `component.list` returns a Lua iterator: a function that can be called repeatedly to get the next element in whatever it iterates over, returning `nil` once there are no more elements.

## A few more things
When an init script returns, the computer powers down, so you'll want to have a "main loop" in there, regardless of how you structure your OS otherwise. Signals must be processed using `computer.pullSignal`, you're free to use any model to provide this to programs running in your OS you please - this is what OpenOS' `event.pull` does, for example.

You'll also want to take care of setting up attached components during your OS' boot routine, such as binding GPUs to screens.

Aside from that, go crazy, be creative!