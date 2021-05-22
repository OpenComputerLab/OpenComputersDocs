# Event API

The Event API provides a basic event system to allow your code to react
to [signals](/component/signals) sent by the OS or other
programs/libraries.

For example, this can be used to capture keys pressed, react if an
external screen is attached or removed, or handle incoming network
messages.

## Overview

There are two main use cases for the event API:

- Have your program react on events while running in the background

      (driver mode).

- Have your program handle events while being the foreground program

      executed (primary mode).

In driver mode your program needs to register callbacks for events
(using `event.listen()`) then it should exit to return execution to
the primary program (usually the shell). In primary mode your program
does not need to register events, it can handle them directly using
`event.pull()`.

*Note:* While it is technically possible to do both at the same time it
is not recommended to do so. To make sure that events are received by
all registered functions, they are consumed only after all functions
have been called. So if you register your handler and pull at the same
time, you would receive events twice.

## Functions

- `event.listen(event: string, callback: function): boolean`

Register a new event listener that should be called for events with
the specified name.
- **event:** name of the signal to listen to.
- **callback:** the function to call if this signal is received. The function will
receive the event name it was registered for as first parameter,
then all remaining parameters as defined by the[signal](/component/signals)
that caused the event.
- **Returns:** `number`, the event id which can be canceled via
`event.cancel`, if the event was successfully registered, `false` if
this function was already registered for this event type.

- `event.ignore(event: string, callback: function): boolean`
- Unregister a previously registered event listener.
- **event:** name of the signal to unregister.
- **callback:** the function that was used to register for this event. 
- **Returns:** `true` if the event was successfully unregistered, `false` if this
function was not registered for this event type. 

//Note:// An event listeners may return `false` to unregister themselves, which
is equivalent to calling `event.ignore` and passing the listener
with the event name it was registered for.

- `event.timer(interval: number, callback: function[, times:
number]): number`

      Starts a new timer that will be called after the time specified in
      `interval`.
      **interval** - time in seconds between each invocation of the
      callback function. Can be a fraction like 0.05. **callback** - the
      function to call. **times** - how many times the function will be
      called. If omitted the function will be called once. Pass
      `math.huge` for infinite repeat. **Returns:** a timer ID that can
      be used to cancel the timer at any time. //Note//: the timer
      resolution can vary. If the computer is idle and enters sleep mode,
      it will only be woken in a game tick, so the time the callback is
      called may be up to 0.05 seconds off.

- `event.cancel(timerId: number): boolean`

      Cancels a timer previously created with `event.timer`.
      **timerId** - a timer ID as returned by `event.timer`.
      **Returns:** `true` if the timer was stopped, `false` if there was
      no timer with the specified ID.

- `event.pull([timeout: number], [name: string], ...): string,
...`

      Pulls and returns the next available event from the queue, or waits
      until one becomes available.
      **timeout** - if passed the function will wait for a new event for
      this many seconds at maximum then returns `nil` if no event was
      queued during that time. **name** - an event pattern that will act
      as a filter. If given then only events that match this pattern will
      be returned. Can be `nil` in which case the event names will not be
      filtered. See `string.match` on how to use patterns. **...** -
      any number of parameters in the same order as defined by the
      [[component:signals|signal]] that is expected. Those arguments
      will act as filters for the additional arguments returned by the
      signal. Direct equality is used to determine if the argument is
      equal to the given filter. Can be `nil` in which case this
      particular argument will not be filtered. Filter example:
      The `touch` signal (when a player clicks on a tier two or three
      screen) has the signature
      ` screenX: number, screenY: number, playerName: string`
      To only pull clicks by player "Steve" you'd do:
      `local _, x, y = event.pull("touch", nil, nil, "Steve")`

- `event.pullFiltered([timeout: number], [filter: function]):
string, ...`

      (Since 1.5.9) Pulls and returns the next available event from the
      queue, or waits until one becomes available but allows filtering by
      specifying filter function. **timeout** - if passed the function
      will wait for a new event for this many seconds at maximum then
      returns `nil` if no event was queued during that time.
      **filter** - if passed the function will use it as a filtering
      function of events. Allows for advanced filtering.

      Example:

``` local allowedPlayers = {"Kubuxu", "Sangar", "Magik6k",
"Vexatos"} local function filter(name, ...)

    if name ~= "key_up" and name ~= "key_down" and name ~= "touch" then
      return false
    end
    local nick
    if name == "touch" then
      nick = select(3, ...)
    else
      nick = select(4, ...)
    end
    for _, allowed in ipairs(allowedPlayers) do
      if nick == allowed then
        return true
      end
    end
    return false

end

local e = {event.pullFiltered(filter)} -- We are pulling key_up,
key_down and click events for unlimited amount of time. The filter will
ensure that only events caused by players in allowedPlayers are pulled.
```

- `event.pullMultiple(...): ...` (Since 1.5.9) As its arguments

      `pullMultiple` accepts multiple event names to be pulled, allowing
      basic filtering of multiple events at once.

- `event.onError(message: any)`

      Global event callback error handler. If an event listener throws an
      error, we handle it in this function to avoid it bubbling into
      unrelated code (that only triggered the execution by calling
      `event.pull`). Per default, this logs errors into a file on the
      temporary file system.
      You can replace this function with your own if you want to handle
      event errors in a different way.

- `event.push(name: string[, ...])`

      This is only an alias to [[api:computer|computer.pushSignal]].
      This does not modify the arguments in any way. It seemed logical to
      add the alias to the event library because there is also an
      `event.pull` for signals.

## Interrupts

Starting In OpenOS 1.6.4 and later, interrupts have been cleaned up. The
following two methods are now obsolete

- `event.shouldSoftInterrupt(): boolean` (Since 1.5.9 and removed in

      1.6.4)

- `event.shouldInterrupt(): boolean` (Since 1.5.9 and removed in

      1.6.4)

Interrupts are a type of messaging intended to close or stop a process.
In OpenOS the `computer.pullSignal()`, and thus any wrapper, generates
2 types of events.

They are especially useful when `event.pull*()` is called without
time limit and with a filter. In some cases this means that
`event.pull*()` could be waiting indefinitely.

- Soft interrupts are an event signal generated by pressing `Ctrl+C`.

      The signal returns two fields, the event name `"interrupted"` and
      the computer uptime

- Hard interrupts are generated by pressing `Ctrl-Alt-C`. It forcibly

      exits the `event.pull*()` method by throwing a `"interrupted"`
      error.

## Basic event example

Typically user scripts care about one or two events, and don't care to
handle the rest. It is good to handle "interrupted" for soft
interrupts.

``` while true do

    local id, _, x, y = event.pullMultiple("touch", "interrupted")
    if id == "interrupted" then
      print("soft interrupt, closing")
      break
    elseif id == "touch" then
      print("user clicked", x, y)
    end

end ```

## General purpose event handler

Here is a clever solution for providing a general purpose event handler.
In this example the primary functionality uses the event id returned by
`event.pull()` as a key for a table of callbacks, using metamethods to
handle undefined events. Note that `event.pull` puts the program on
hold until there is an event available.

``` local event = require "event" -- load event table and store
the pointer to it in event

local char_space = string.byte(" ") -- numerical representation of
the space char local running = true -- state variable so the loop can
terminate

function unknownEvent()

    -- do nothing if the event wasn't relevant

end

-- table that holds all event handlers -- in case no match can be
found returns the dummy function unknownEvent local myEventHandlers =
setmetatable({}, { __index = function() return unknownEvent end })

-- Example key-handler that simply sets running to false if the user
hits space function myEventHandlers.key_up(adress, char, code,
playerName)

    if (char == char_space) then
      running = false
    end

end

-- The main event handler as function to separate eventID from the
remaining arguments function handleEvent(eventID, ...)

    if (eventID) then -- can be nil if no event was pulled for some time
      myEventHandlers[eventID](...) -- call the appropriate event handler with all remaining arguments
    end

end

-- main event loop which processes all events, or sleeps if there is
nothing to do while running do

    handleEvent(event.pull()) -- sleeps until an event is available, then process it

end ```

If you work in driver mode, you need to register the events instead, by
either registering a global event handler like the one in the example
above, or by registering each individual handler on its own. If you
would write the example above to work in the background, the `while
running do` loop would be replaced like this:

``` event.listen("key_up", handleEvent) -- register handleEvent to
be called on key_up then end the program ```

It would also be possible to register `myEventHandlers.key_up`
directly, in which case it would receive an additional parameter (the
event name) as the first parameter.

## Contents

# Event API

The Event API provides a basic event system to allow your code to react
to [signals](/component/signals) sent by the OS or other
programs/libraries.

For example, this can be used to capture keys pressed, react if an
external screen is attached or removed, or handle incoming network
messages.

## Overview

There are two main use cases for the event API:

- Have your program react on events while running in the background

      (driver mode).

- Have your program handle events while being the foreground program

      executed (primary mode).

In driver mode your program needs to register callbacks for events
(using `event.listen()`) then it should exit to return execution to
the primary program (usually the shell). In primary mode your program
does not need to register events, it can handle them directly using
`event.pull()`.

*Note:* While it is technically possible to do both at the same time it
is not recommended to do so. To make sure that events are received by
all registered functions, they are consumed only after all functions
have been called. So if you register your handler and pull at the same
time, you would receive events twice.

## Functions

- `event.listen(event: string, callback: function): boolean`

      Register a new event listener that should be called for events with
      the specified name.
      **event** - name of the signal to listen to. **callback** - the
      function to call if this signal is received. The function will
      receive the event name it was registered for as first parameter,
      then all remaining parameters as defined by the
      [[component:signals|signal]] that caused the event.
      **Returns:** `number`, the event id which can be canceled via
      `event.cancel`, if the event was successfully registered, `false` if
      this function was already registered for this event type.

- `event.ignore(event: string, callback: function): boolean`

      Unregister a previously registered event listener.
      **event** - name of the signal to unregister. **callback** - the
      function that was used to register for this event. **Returns:**
      `true` if the event was successfully unregistered, `false` if this
      function was not registered for this event type. //Note:// An
      event listeners may return `false` to unregister themselves, which
      is equivalent to calling `event.ignore` and passing the listener
      with the event name it was registered for.

- `event.timer(interval: number, callback: function[, times:
number]): number`

      Starts a new timer that will be called after the time specified in
      `interval`.
      **interval** - time in seconds between each invocation of the
      callback function. Can be a fraction like 0.05. **callback** - the
      function to call. **times** - how many times the function will be
      called. If omitted the function will be called once. Pass
      `math.huge` for infinite repeat. **Returns:** a timer ID that can
      be used to cancel the timer at any time. //Note//: the timer
      resolution can vary. If the computer is idle and enters sleep mode,
      it will only be woken in a game tick, so the time the callback is
      called may be up to 0.05 seconds off.

- `event.cancel(timerId: number): boolean`

      Cancels a timer previously created with `event.timer`.
      **timerId** - a timer ID as returned by `event.timer`.
      **Returns:** `true` if the timer was stopped, `false` if there was
      no timer with the specified ID.

- `event.pull([timeout: number], [name: string], ...): string,
...`

      Pulls and returns the next available event from the queue, or waits
      until one becomes available.
      **timeout** - if passed the function will wait for a new event for
      this many seconds at maximum then returns `nil` if no event was
      queued during that time. **name** - an event pattern that will act
      as a filter. If given then only events that match this pattern will
      be returned. Can be `nil` in which case the event names will not be
      filtered. See `string.match` on how to use patterns. **...** -
      any number of parameters in the same order as defined by the
      [[component:signals|signal]] that is expected. Those arguments
      will act as filters for the additional arguments returned by the
      signal. Direct equality is used to determine if the argument is
      equal to the given filter. Can be `nil` in which case this
      particular argument will not be filtered. Filter example:
      The `touch` signal (when a player clicks on a tier two or three
      screen) has the signature
      ` screenX: number, screenY: number, playerName: string`
      To only pull clicks by player "Steve" you'd do:
      `local _, x, y = event.pull("touch", nil, nil, "Steve")`

- `event.pullFiltered([timeout: number], [filter: function]):
string, ...`

      (Since 1.5.9) Pulls and returns the next available event from the
      queue, or waits until one becomes available but allows filtering by
      specifying filter function. **timeout** - if passed the function
      will wait for a new event for this many seconds at maximum then
      returns `nil` if no event was queued during that time.
      **filter** - if passed the function will use it as a filtering
      function of events. Allows for advanced filtering.

      Example:

``` local allowedPlayers = {"Kubuxu", "Sangar", "Magik6k",
"Vexatos"} local function filter(name, ...)

    if name ~= "key_up" and name ~= "key_down" and name ~= "touch" then
      return false
    end
    local nick
    if name == "touch" then
      nick = select(3, ...)
    else
      nick = select(4, ...)
    end
    for _, allowed in ipairs(allowedPlayers) do
      if nick == allowed then
        return true
      end
    end
    return false

end

local e = {event.pullFiltered(filter)} -- We are pulling key_up,
key_down and click events for unlimited amount of time. The filter will
ensure that only events caused by players in allowedPlayers are pulled.
```

- `event.pullMultiple(...): ...` (Since 1.5.9) As its arguments

      `pullMultiple` accepts multiple event names to be pulled, allowing
      basic filtering of multiple events at once.

- `event.onError(message: any)`

      Global event callback error handler. If an event listener throws an
      error, we handle it in this function to avoid it bubbling into
      unrelated code (that only triggered the execution by calling
      `event.pull`). Per default, this logs errors into a file on the
      temporary file system.
      You can replace this function with your own if you want to handle
      event errors in a different way.

- `event.push(name: string[, ...])`

      This is only an alias to [[api:computer|computer.pushSignal]].
      This does not modify the arguments in any way. It seemed logical to
      add the alias to the event library because there is also an
      `event.pull` for signals.

## Interrupts

Starting In OpenOS 1.6.4 and later, interrupts have been cleaned up. The
following two methods are now obsolete

- `event.shouldSoftInterrupt(): boolean` (Since 1.5.9 and removed in

      1.6.4)

- `event.shouldInterrupt(): boolean` (Since 1.5.9 and removed in

      1.6.4)

Interrupts are a type of messaging intended to close or stop a process.
In OpenOS the `computer.pullSignal()`, and thus any wrapper, generates
2 types of events.

They are especially useful when `event.pull*()` is called without
time limit and with a filter. In some cases this means that
`event.pull*()` could be waiting indefinitely.

- Soft interrupts are an event signal generated by pressing `Ctrl+C`.

      The signal returns two fields, the event name `"interrupted"` and
      the computer uptime

- Hard interrupts are generated by pressing `Ctrl-Alt-C`. It forcibly

      exits the `event.pull*()` method by throwing a `"interrupted"`
      error.

## Basic event example

Typically user scripts care about one or two events, and don't care to
handle the rest. It is good to handle "interrupted" for soft
interrupts.

``` while true do

    local id, _, x, y = event.pullMultiple("touch", "interrupted")
    if id == "interrupted" then
      print("soft interrupt, closing")
      break
    elseif id == "touch" then
      print("user clicked", x, y)
    end

end ```

## General purpose event handler

Here is a clever solution for providing a general purpose event handler.
In this example the primary functionality uses the event id returned by
`event.pull()` as a key for a table of callbacks, using metamethods to
handle undefined events. Note that `event.pull` puts the program on
hold until there is an event available.

``` local event = require "event" -- load event table and store
the pointer to it in event

local char_space = string.byte(" ") -- numerical representation of
the space char local running = true -- state variable so the loop can
terminate

function unknownEvent()

    -- do nothing if the event wasn't relevant

end

-- table that holds all event handlers -- in case no match can be
found returns the dummy function unknownEvent local myEventHandlers =
setmetatable({}, { __index = function() return unknownEvent end })

-- Example key-handler that simply sets running to false if the user
hits space function myEventHandlers.key_up(adress, char, code,
playerName)

    if (char == char_space) then
      running = false
    end

end

-- The main event handler as function to separate eventID from the
remaining arguments function handleEvent(eventID, ...)

    if (eventID) then -- can be nil if no event was pulled for some time
      myEventHandlers[eventID](...) -- call the appropriate event handler with all remaining arguments
    end

end

-- main event loop which processes all events, or sleeps if there is
nothing to do while running do

    handleEvent(event.pull()) -- sleeps until an event is available, then process it

end ```

If you work in driver mode, you need to register the events instead, by
either registering a global event handler like the one in the example
above, or by registering each individual handler on its own. If you
would write the example above to work in the background, the `while
running do` loop would be replaced like this:

``` event.listen("key_up", handleEvent) -- register handleEvent to
be called on key_up then end the program ```

It would also be possible to register `myEventHandlers.key_up`
directly, in which case it would receive an additional parameter (the
event name) as the first parameter.

## Contents
