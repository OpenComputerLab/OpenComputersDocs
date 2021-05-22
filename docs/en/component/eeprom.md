# Component: EEPROM

This component is provided by the [EEPROM](/item/eeprom).

Component name: `eeprom`. Callbacks:

- `get():string`

      Get the currently stored byte array.

- `set(<data:string>)`

      Overwrite the currently stored byte array.

- `getLabel():string`

      Get the label of the EEPROM.

- `setLabel(<data:string>)`

      Set the label of the EEPROM.

- `getSize():number`

      Gets the maximum storage capacity of the EEPROM.

- `getDataSize():number`

      Gets the maximum data storage capacity of the EEPROM.

- `getData():string`

      Gets currently stored byte-array (usually the component address of
      the main boot device).

- `setData(<data:string>)`

      Overwrites currently stored byte-array with specified string.

- `getChecksum():string`

      Gets Checksum of data on EEPROM.

- `makeReadonly(checksum:string):boolean`

      Makes the EEPROM Read-only if it isn't. This process cannot be
      reversed.

------------------------------------------------------------------------

# Component: EEPROM

This component is provided by the [EEPROM](/item/eeprom).

Component name: `eeprom`. Callbacks:

- `get():string`

      Get the currently stored byte array.

- `set(<data:string>)`

      Overwrite the currently stored byte array.

- `getLabel():string`

      Get the label of the EEPROM.

- `setLabel(<data:string>)`

      Set the label of the EEPROM.

- `getSize():number`

      Gets the maximum storage capacity of the EEPROM.

- `getDataSize():number`

      Gets the maximum data storage capacity of the EEPROM.

- `getData():string`

      Gets currently stored byte-array (usually the component address of
      the main boot device).

- `setData(<data:string>)`

      Overwrites currently stored byte-array with specified string.

- `getChecksum():string`

      Gets Checksum of data on EEPROM.

- `makeReadonly(checksum:string):boolean`

      Makes the EEPROM Read-only if it isn't. This process cannot be
      reversed.

------------------------------------------------------------------------
