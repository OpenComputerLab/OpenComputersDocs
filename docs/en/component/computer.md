# Component: Computer

Computers provide a couple of API callbacks. Note that these can only be
called by the computer itself, or its direct neighbors (i.e. other
computers that share a face with that computer). Also note that since
robots cannot interact with external components they cannot
start/stop/query computers, but computers can interact with robots
sitting next to them.

Component name: `computer`. Callbacks:

- `start(): boolean`

      Tries to start the computer. Returns `true` on success, `false`
      otherwise. Note that this will also return `false` if the computer
      was already running. If the computer is currently shutting down,
      this will cause the computer to reboot instead.

- `stop(): boolean`

      Tries to stop the computer. Returns `true` on success, `false`
      otherwise. Also returns `false` if the computer is already stopped.

- `isRunning(): boolean`

      Returns whether the computer is currently running.

- `beep([frequency:number[, duration:number]])`

      Plays a tone, useful to alert users via audible feedback. Supports
      frequencies from 20 to 2000Hz, with a duration of up to 5 seconds.

- `getDeviceInfo(): table`

      Returns a table of device information. Note that this is
      architecture-specific and some may not implement it at all.

- `crash(reason: string)`

      Attempts to crash the computer for the specified reason.

- `getArchitecture(): string`

      Returns the computer's current architecture.

- `isRobot(): boolean`

      Returns whether or not the computer is, in fact, a robot.

Example use:

``` lua
local component = require("component") local c =
component.computer -- get primary computer, e.g. self
print(c.isRunning()) -- definitely true if it's this computer c.stop()
-- basically like computer.shutdown() if it's this computer
```