# Signals

Signals are messages sent to a computer from some external source and
can be used for many purposes. They always have at least a name, and may
have any number of (simple) parameters. Note that computers may also
queue signals on themselves.

Signals can be consumed using [computer.pullSignal()](/api/computer) or
its convenience wrapper, [event.pull()](/api/event).

The following lists all signals triggered by components and the built-in
libraries. They are listed in the following format: `name(arg: type,
...)`, meaning you would pull them like `local name, arg, ... =
event.pull()`. For example, to pull a modem message:

``` local event = require("event") local _, localNetworkCard,
remoteAddress, port, distance, payload = event.pull("modem_message")
print("Received data '" .. tostring(payload) .. "' from address "
.. remoteAddress ..

        " on network card " .. localNetworkCard .. " on port " .. port .. ".")

if distance > 0 then

    print("Message was sent from " .. distance .. " blocks away.")

end ```

## Computer

- `component_added(address: string, componentType: string)`

      This signal is queued by the [[block:case|computer]] or
      [[block:robot|robot]] when a new component is attached to it.
      The address is the address of the added component, `componentType`
      is the type of the component (e.g. `redstone` or `gpu`).
      Note: do not use this directly when possible, but use
      `component_available` instead, which is queued by the
      [[api:component|component library]] when a *primary* component
      was added / the primary component changed.

- `component_removed(address: string, componentType: string)`

      This signal is queued by the [[block:case|computer]] or
      [[block:robot|robot]] when a component is removed from it. The
      address is the address of the removed component, `componentType` is
      the type of the component (e.g. `redstone` or `gpu`).
      Note: do not use this directly when possible, but use
      `component_unavailable` instead, which is queued by the
      [[api:component|component library]] when a *primary* component
      is removed.

- `component_available(componentType: string)`

      This signal is queued by the [[api:component|component
      library]] when a *primary* component was added / the primary
      component changed. It is generally preferred to use this over
      `component_added`, to avoid conflicts with the component library.

- `component_unavailable(componentType: string)`

      This signal is queued by the [[api:component|component
      library]] when a *primary* component is removed. It is generally
      preferred to use this over `component_removed`, to avoid conflicts
      with the component library.

- `term_available()`

      This signal is queued by the [[api:term|term library]] when
      both a [[item:graphics_card|GPU]] *and*
      [[block:screen|screen]] become available in a computer. This is
      useful to determine whether it is now possible to print text to an
      attached screen.

- `term_unavailable()`

      This signal is queued by the [[api:term|term library]] when
      either the primary [[item:graphics_card|GPU]] or
      [[block:screen|screen]] becomes unavailable in a computer. This
      is useful to determine when it becomes impossible to print text to
      an attached screen.

## Screen

- `screen_resized(screenAddress: string, newWidth: number, newHeight:
number)`

      This signal is queued by [[block:screen|screens]] when their
      resolution changes, for example because it was manually set via a
      [[component:gpu|GPU]]. The address is the address of the screen
      that queued the signal.

- `touch(screenAddress: string, x: number, y: number, button: number,
playerName: string)`

      This signal is queued by screens of tier two and tier three when
      they are clicked. This includes left clicks in the GUI (i.e. when a
      keyboard is attached) or when right-clicking/activating them in the
      world directly (i.e. when no keyboard is attached or when
      sneak-activating). The address is the address of the screen the
      queued the signal. The x and y coordinates are in "letters"
      (meaning they map directly to `term.setCursor` or `gpu.set`, for
      example). The player name is the user name of the player that
      triggered the event.
      Note on the player name: I'll probably add an option to disable
      this argument in the future, for those who think it's too...
      unrealistic. It's just quite handy for multi-user programs, so I
      left it in for now.
      //Important//: this signal is *checked*, i.e. it is only queued on a
      computer if the player that caused it is
      [[:computer_users|registered as a user]] on the computer (or
      there are no users registered on the computer).

- `drag(screenAddress: string, x: number, y: number, button: number,
playerName: string)`

      This signal is almost equivalent to the `touch` signal. The only
      difference is the implicit meaning: when this signal is fired, it
      "belongs" to a `touch` signal that was fired earlier. This can
      only be triggered by dragging in the GUI.

- `drop(screenAddress: string, x: number, y: number, button: number,
playerName: string)`

      This signal is triggered when the player releases the mouse button
      after a `touch` signal. Despite the name, it does not necessarily
      follow a `drag` signal.

- `scroll(screenAddress: string, x: number, y: number, direction:
number, playerName: string)`

      This signal is queued by screens of tier two and tier three when the
      player uses the mouse wheel in the GUI. The x and y coordinates are
      the cursor location when the scroll occurred and are, like the
      `touch` signal, in "letters". The `direction` indicates which way
      to scroll, where a positive value usually means "up", whereas a
      negative value means "down". Note that this may differ based on
      the client's operating system and/or driver configuration. The
      player name is the user name of the player that triggered the
      event.
      The same considerations apply to the player name parameter as in
      `touch`.

- `walk(screenAddress: string, x: number, y: number[, playerName:
string])`

      This signal is queued by screens of tier two and tier three when a
      player or other entity walks on them. The address is the address of
      the screen the queued the signal. The x and y coordinates are *the
      coordinates of the sub-block* of the multi-block screen that queued
      the event. Use [[component:gpu|gpu.getSize()]] to figure out
      which area of the display that actually represents.
      Unlike clicks, this can be triggered for regions of the screen where
      nothing is displayed based on the current resolution, so keep that
      in mind.
      The same considerations apply to the player name parameter as in
      `touch`.

## Keyboard

- `key_down(keyboardAddress: string, char: number, code: number,
playerName: string)`

      This signal is queued by [[block:keyboard|keyboards]] when a
      user inputs something on the screen it's attached to, more
      specifically when the user *presses* a key. This event may be
      repeated if the user keeps pressing the key.
      //Important//: this signal is *checked*, i.e. it is only queued on a
      computer if the player that caused it is
      [[:computer_users|registered as a user]] on the computer (or
      there are no users registered on the computer).

- `key_up(keyboardAddress: string, char: number, code: number,
playerName: string)`

      This signal is queued by [[block:keyboard|keyboards]] when a
      user inputs something on the screen it's attached to, more
      specifically when the user *releases* a key.
      Note that although most cases where a player can be "removed" from
      a screen without releasing the key before-hand *should* be handled
      (I think) there may still be cases where this fails. Meaning this
      feature is more or less in an... observation stage, and may be
      removed at a later point if it proves infeasible.
      //Important//: this signal is *checked*, i.e. it is only queued on a
      computer if the player that caused it is
      [[:computer_users|registered as a user]] on the computer (or
      there are no users registered on the computer).

- `clipboard(keyboardAddress: string, value: string, playerName:
string)`

      This signal is queued by [[block:keyboard|keyboards]] when a
      user pastes text from the clipboard (Shift+Ins or middle mouse
      button). Note that the maximum length of the text that can be pasted
      is limited (can be changed in the config). //Important//: this
      signal is *checked*, i.e. it is only queued on a computer if the
      player that caused it is [[:computer_users|registered as a
      user]] on the computer (or there are no users registered on the
      computer).

## Redstone Cards and I/O Block

- `redstone_changed(address: string, side: number, oldValue: number,
newValue: number[, color: number])`

      This signal is queued by [[component:redstone|redstone
      components]] when an incoming signal changes. The address is of
      the [[block:redstone_io|Redstone I/O block]] or that of the
      [[item:redstone_card|redstone card]] installed in the machine
      where the redstone signal was detected. The side is one of the
      [[api:sides|sides]] constants and indicates on which side the
      signal changed. This is relative to the container of the component,
      so for computers and robots this depends on which way they are
      facing. For Redstone I/O blocks this is always the absolute side.
      The color is only included with bundled inputs, referring to which
      color of input changed.

## Motion Sensor Block

- `motion(address:string, relativeX:number, relativeY:number,
relativeZ:number[, entityName:string])`

      Fired by the [[block:motion_sensor|motion sensor]] when a
      living entity in its line of sight moves faster than the configured
      sensitivity.

## Network Cards

- `modem_message(receiverAddress: string, senderAddress: string, port:
number, distance: number, ...)`

      This signal is queued by [[item:lan_card|network cards]]
      (including wireless ones) when they receive a message on an open
      port. The first address is the address of the network card that
      received the message, the second the address from where the message
      was sent. Note that the sender address may differ from the card that
      originally sent the message when it passed through one or more
      [[block:switch|switches]]. The port is the port on which the
      message was received. This distance is the distance only set when
      receiving *wireless* network messages, in which case it is the
      distance to the wireless network card that sent the message. For
      normal network cards the distance will always be zero. All further
      parameters are user defined and correspond to what the sender
      specified in [[component:modem|modem.send()]] or
      `modem.broadcast()` as the message's payload.

## Robots

- `inventory_changed(slot: number)`

      This signal is queued by robots when their inventory changes. Note
      that this only includes changes to the kind of item stored in a
      slot. For example, increasing or decreasing the size of an already
      present stack does not trigger this signal. However, swapping one
      item with another (say, torches with sticks) by hand will actually
      trigger *two* signals: one for the removal of the torches, one for
      putting the sticks into the temporarily empty slot. Swapping items
      using [[api:robot|robot.transferTo()]] will even trigger *four*
      signals - the same thing, but for the two slots involved in the
      swap.
      Also, this only fires for the actually addressable inventory of the
      robot, i.e. it does not trigger for changes in equipment (tool,
      card, upgrade).

## Abstract Bus Card

- `bus_message(protocolId: number, senderAddress: number,
targetAddress: number, data: table, metadata: table)`

      -   `protocolId` is the protocol version that was used.
      -   `senderAddress` is the address of the device sending the
          message.
      -   `targetAddress` is the address of the device that the messages
          was intended for (-1 for network broadcasts).
      -   `data` is a table of the data that was sent.
      -   `metadata` is a table of data that are unique to the device that
          send the address.

## Carriage

**Important**: This component has moved to the OpenComponents addon.

- `carriage_moved(success: boolean[, reason:string[, x:number, y:
number, z: number]])`

      This signal is queued by the carriage component after a move or
      simulate command was issued. The `success` parameter indicates
      whether the move or simulation was successful, i.e. whether the
      carriage could be moved. If the move failed, `reason` is the error
      message. Depending on the error message, (`x`, `y`, `z`) is the
      world coordinate of the block that caused the move to fail.

## Contents

# Signals

Signals are messages sent to a computer from some external source and
can be used for many purposes. They always have at least a name, and may
have any number of (simple) parameters. Note that computers may also
queue signals on themselves.

Signals can be consumed using [computer.pullSignal()](/api/computer) or
its convenience wrapper, [event.pull()](/api/event).

The following lists all signals triggered by components and the built-in
libraries. They are listed in the following format: `name(arg: type,
...)`, meaning you would pull them like `local name, arg, ... =
event.pull()`. For example, to pull a modem message:

``` local event = require("event") local _, localNetworkCard,
remoteAddress, port, distance, payload = event.pull("modem_message")
print("Received data '" .. tostring(payload) .. "' from address "
.. remoteAddress ..

        " on network card " .. localNetworkCard .. " on port " .. port .. ".")

if distance > 0 then

    print("Message was sent from " .. distance .. " blocks away.")

end ```

## Computer

- `component_added(address: string, componentType: string)`

      This signal is queued by the [[block:case|computer]] or
      [[block:robot|robot]] when a new component is attached to it.
      The address is the address of the added component, `componentType`
      is the type of the component (e.g. `redstone` or `gpu`).
      Note: do not use this directly when possible, but use
      `component_available` instead, which is queued by the
      [[api:component|component library]] when a *primary* component
      was added / the primary component changed.

- `component_removed(address: string, componentType: string)`

      This signal is queued by the [[block:case|computer]] or
      [[block:robot|robot]] when a component is removed from it. The
      address is the address of the removed component, `componentType` is
      the type of the component (e.g. `redstone` or `gpu`).
      Note: do not use this directly when possible, but use
      `component_unavailable` instead, which is queued by the
      [[api:component|component library]] when a *primary* component
      is removed.

- `component_available(componentType: string)`

      This signal is queued by the [[api:component|component
      library]] when a *primary* component was added / the primary
      component changed. It is generally preferred to use this over
      `component_added`, to avoid conflicts with the component library.

- `component_unavailable(componentType: string)`

      This signal is queued by the [[api:component|component
      library]] when a *primary* component is removed. It is generally
      preferred to use this over `component_removed`, to avoid conflicts
      with the component library.

- `term_available()`

      This signal is queued by the [[api:term|term library]] when
      both a [[item:graphics_card|GPU]] *and*
      [[block:screen|screen]] become available in a computer. This is
      useful to determine whether it is now possible to print text to an
      attached screen.

- `term_unavailable()`

      This signal is queued by the [[api:term|term library]] when
      either the primary [[item:graphics_card|GPU]] or
      [[block:screen|screen]] becomes unavailable in a computer. This
      is useful to determine when it becomes impossible to print text to
      an attached screen.

## Screen

- `screen_resized(screenAddress: string, newWidth: number, newHeight:
number)`

      This signal is queued by [[block:screen|screens]] when their
      resolution changes, for example because it was manually set via a
      [[component:gpu|GPU]]. The address is the address of the screen
      that queued the signal.

- `touch(screenAddress: string, x: number, y: number, button: number,
playerName: string)`

      This signal is queued by screens of tier two and tier three when
      they are clicked. This includes left clicks in the GUI (i.e. when a
      keyboard is attached) or when right-clicking/activating them in the
      world directly (i.e. when no keyboard is attached or when
      sneak-activating). The address is the address of the screen the
      queued the signal. The x and y coordinates are in "letters"
      (meaning they map directly to `term.setCursor` or `gpu.set`, for
      example). The player name is the user name of the player that
      triggered the event.
      Note on the player name: I'll probably add an option to disable
      this argument in the future, for those who think it's too...
      unrealistic. It's just quite handy for multi-user programs, so I
      left it in for now.
      //Important//: this signal is *checked*, i.e. it is only queued on a
      computer if the player that caused it is
      [[:computer_users|registered as a user]] on the computer (or
      there are no users registered on the computer).

- `drag(screenAddress: string, x: number, y: number, button: number,
playerName: string)`

      This signal is almost equivalent to the `touch` signal. The only
      difference is the implicit meaning: when this signal is fired, it
      "belongs" to a `touch` signal that was fired earlier. This can
      only be triggered by dragging in the GUI.

- `drop(screenAddress: string, x: number, y: number, button: number,
playerName: string)`

      This signal is triggered when the player releases the mouse button
      after a `touch` signal. Despite the name, it does not necessarily
      follow a `drag` signal.

- `scroll(screenAddress: string, x: number, y: number, direction:
number, playerName: string)`

      This signal is queued by screens of tier two and tier three when the
      player uses the mouse wheel in the GUI. The x and y coordinates are
      the cursor location when the scroll occurred and are, like the
      `touch` signal, in "letters". The `direction` indicates which way
      to scroll, where a positive value usually means "up", whereas a
      negative value means "down". Note that this may differ based on
      the client's operating system and/or driver configuration. The
      player name is the user name of the player that triggered the
      event.
      The same considerations apply to the player name parameter as in
      `touch`.

- `walk(screenAddress: string, x: number, y: number[, playerName:
string])`

      This signal is queued by screens of tier two and tier three when a
      player or other entity walks on them. The address is the address of
      the screen the queued the signal. The x and y coordinates are *the
      coordinates of the sub-block* of the multi-block screen that queued
      the event. Use [[component:gpu|gpu.getSize()]] to figure out
      which area of the display that actually represents.
      Unlike clicks, this can be triggered for regions of the screen where
      nothing is displayed based on the current resolution, so keep that
      in mind.
      The same considerations apply to the player name parameter as in
      `touch`.

## Keyboard

- `key_down(keyboardAddress: string, char: number, code: number,
playerName: string)`

      This signal is queued by [[block:keyboard|keyboards]] when a
      user inputs something on the screen it's attached to, more
      specifically when the user *presses* a key. This event may be
      repeated if the user keeps pressing the key.
      //Important//: this signal is *checked*, i.e. it is only queued on a
      computer if the player that caused it is
      [[:computer_users|registered as a user]] on the computer (or
      there are no users registered on the computer).

- `key_up(keyboardAddress: string, char: number, code: number,
playerName: string)`

      This signal is queued by [[block:keyboard|keyboards]] when a
      user inputs something on the screen it's attached to, more
      specifically when the user *releases* a key.
      Note that although most cases where a player can be "removed" from
      a screen without releasing the key before-hand *should* be handled
      (I think) there may still be cases where this fails. Meaning this
      feature is more or less in an... observation stage, and may be
      removed at a later point if it proves infeasible.
      //Important//: this signal is *checked*, i.e. it is only queued on a
      computer if the player that caused it is
      [[:computer_users|registered as a user]] on the computer (or
      there are no users registered on the computer).

- `clipboard(keyboardAddress: string, value: string, playerName:
string)`

      This signal is queued by [[block:keyboard|keyboards]] when a
      user pastes text from the clipboard (Shift+Ins or middle mouse
      button). Note that the maximum length of the text that can be pasted
      is limited (can be changed in the config). //Important//: this
      signal is *checked*, i.e. it is only queued on a computer if the
      player that caused it is [[:computer_users|registered as a
      user]] on the computer (or there are no users registered on the
      computer).

## Redstone Cards and I/O Block

- `redstone_changed(address: string, side: number, oldValue: number,
newValue: number[, color: number])`

      This signal is queued by [[component:redstone|redstone
      components]] when an incoming signal changes. The address is of
      the [[block:redstone_io|Redstone I/O block]] or that of the
      [[item:redstone_card|redstone card]] installed in the machine
      where the redstone signal was detected. The side is one of the
      [[api:sides|sides]] constants and indicates on which side the
      signal changed. This is relative to the container of the component,
      so for computers and robots this depends on which way they are
      facing. For Redstone I/O blocks this is always the absolute side.
      The color is only included with bundled inputs, referring to which
      color of input changed.

## Motion Sensor Block

- `motion(address:string, relativeX:number, relativeY:number,
relativeZ:number[, entityName:string])`

      Fired by the [[block:motion_sensor|motion sensor]] when a
      living entity in its line of sight moves faster than the configured
      sensitivity.

## Network Cards

- `modem_message(receiverAddress: string, senderAddress: string, port:
number, distance: number, ...)`

      This signal is queued by [[item:lan_card|network cards]]
      (including wireless ones) when they receive a message on an open
      port. The first address is the address of the network card that
      received the message, the second the address from where the message
      was sent. Note that the sender address may differ from the card that
      originally sent the message when it passed through one or more
      [[block:switch|switches]]. The port is the port on which the
      message was received. This distance is the distance only set when
      receiving *wireless* network messages, in which case it is the
      distance to the wireless network card that sent the message. For
      normal network cards the distance will always be zero. All further
      parameters are user defined and correspond to what the sender
      specified in [[component:modem|modem.send()]] or
      `modem.broadcast()` as the message's payload.

## Robots

- `inventory_changed(slot: number)`

      This signal is queued by robots when their inventory changes. Note
      that this only includes changes to the kind of item stored in a
      slot. For example, increasing or decreasing the size of an already
      present stack does not trigger this signal. However, swapping one
      item with another (say, torches with sticks) by hand will actually
      trigger *two* signals: one for the removal of the torches, one for
      putting the sticks into the temporarily empty slot. Swapping items
      using [[api:robot|robot.transferTo()]] will even trigger *four*
      signals - the same thing, but for the two slots involved in the
      swap.
      Also, this only fires for the actually addressable inventory of the
      robot, i.e. it does not trigger for changes in equipment (tool,
      card, upgrade).

## Abstract Bus Card

- `bus_message(protocolId: number, senderAddress: number,
targetAddress: number, data: table, metadata: table)`

      -   `protocolId` is the protocol version that was used.
      -   `senderAddress` is the address of the device sending the
          message.
      -   `targetAddress` is the address of the device that the messages
          was intended for (-1 for network broadcasts).
      -   `data` is a table of the data that was sent.
      -   `metadata` is a table of data that are unique to the device that
          send the address.

## Carriage

**Important**: This component has moved to the OpenComponents addon.

- `carriage_moved(success: boolean[, reason:string[, x:number, y:
number, z: number]])`

      This signal is queued by the carriage component after a move or
      simulate command was issued. The `success` parameter indicates
      whether the move or simulation was successful, i.e. whether the
      carriage could be moved. If the move failed, `reason` is the error
      message. Depending on the error message, (`x`, `y`, `z`) is the
      world coordinate of the block that caused the move to fail.

## Contents
