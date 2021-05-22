# Keyboard API

This API allows you to refer to key codes by name, using the
`keyboard.keys` table. This is a two-directional table, for example,
the value of `keyboard.keys.numpad0` is `0x52`, and the value of
`keyboard.keys[0x52]` is the string `numpad0`.

Please see [the Lua file containing the API's
implementation](<https://github.com/MightyPirates/OpenComputers/blob/master-MC1.7.10/src/main/resources/assets/opencomputers/loot/openos/lib/keyboard.lua>)
for the list of available names.

Additionally it registers event listeners to keep track of the state of
individual keys. This internal state can be queried using the following
functions:

- `keyboard.isAltDown(): boolean`

      Checks if one of the Alt keys is currently being held by some user.

- `keyboard.isControl(char: number): boolean`

      Checks if the specified character (from a keyboard event for
      example) is a control character as defined by Java's `Character`
      class. Control characters are usually not printable.

- `keyboard.isControlDown(): boolean`

      Checks if one of the Control keys is currently being held by some
      user.

- `keyboard.isKeyDown(charOrCode: any): boolean`

      Checks if a specific key is currently being by some user. If a
      number is specified it is assumed it's a key code. If a string is
      specified it is assumed it's a single character, such as the ones
      passed by keyboard events.

- `keyboard.isShiftDown(): boolean`

      Checks if one of the Shift keys is currently being held by some
      user.

## Contents

# Keyboard API

This API allows you to refer to key codes by name, using the
`keyboard.keys` table. This is a two-directional table, for example,
the value of `keyboard.keys.numpad0` is `0x52`, and the value of
`keyboard.keys[0x52]` is the string `numpad0`.

Please see [the Lua file containing the API's
implementation](<https://github.com/MightyPirates/OpenComputers/blob/master-MC1.7.10/src/main/resources/assets/opencomputers/loot/openos/lib/keyboard.lua>)
for the list of available names.

Additionally it registers event listeners to keep track of the state of
individual keys. This internal state can be queried using the following
functions:

- `keyboard.isAltDown(): boolean`

      Checks if one of the Alt keys is currently being held by some user.

- `keyboard.isControl(char: number): boolean`

      Checks if the specified character (from a keyboard event for
      example) is a control character as defined by Java's `Character`
      class. Control characters are usually not printable.

- `keyboard.isControlDown(): boolean`

      Checks if one of the Control keys is currently being held by some
      user.

- `keyboard.isKeyDown(charOrCode: any): boolean`

      Checks if a specific key is currently being by some user. If a
      number is specified it is assumed it's a key code. If a string is
      specified it is assumed it's a single character, such as the ones
      passed by keyboard events.

- `keyboard.isShiftDown(): boolean`

      Checks if one of the Shift keys is currently being held by some
      user.

## Contents
