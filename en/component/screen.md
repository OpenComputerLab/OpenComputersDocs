# Component: Screen

This component is provided by [screen blocks](/block/screen) (either
when placed in the world or when installed in a robot).

Component name: `screen`. Callbacks:

- `isOn():boolean`

      Returns whether the screen is currently on.

- `turnOn():boolean`

      Turns the screen on. Returns true if it was off.

- `turnOff():boolean`

      Turns off the screen. Returns true if it was on.

- `getAspectRatio():number, number`

      The aspect ratio of the screen. For multi-block screens this is the
      number of blocks, horizontal and vertical.

- `getKeyboards():table`

      The list of keyboards attached to the screen.

- `setPrecise(enabled:boolean):boolean` Set whether to use

      high-precision mode (sub-pixel mouse event position).
      //Requires Screen (Tier 3).//

- `isPrecise():boolean`

      Check whether high-precision mode is enabled (sub-pixel mouse event
      position).
      //Requires Screen (Tier 3).//

- `setTouchModeInverted(enabled:boolean):boolean`

      Sets Inverted Touch mode (Sneak-activate opens GUI if set to true).

- `isTouchModeInverted():boolean`

      Check to see if Inverted Touch mode is enabled (Sneak-activate opens
      GUI is set to true).

------------------------------------------------------------------------

# Component: Screen

This component is provided by [screen blocks](/block/screen) (either
when placed in the world or when installed in a robot).

Component name: `screen`. Callbacks:

- `isOn():boolean`

      Returns whether the screen is currently on.

- `turnOn():boolean`

      Turns the screen on. Returns true if it was off.

- `turnOff():boolean`

      Turns off the screen. Returns true if it was on.

- `getAspectRatio():number, number`

      The aspect ratio of the screen. For multi-block screens this is the
      number of blocks, horizontal and vertical.

- `getKeyboards():table`

      The list of keyboards attached to the screen.

- `setPrecise(enabled:boolean):boolean` Set whether to use

      high-precision mode (sub-pixel mouse event position).
      //Requires Screen (Tier 3).//

- `isPrecise():boolean`

      Check whether high-precision mode is enabled (sub-pixel mouse event
      position).
      //Requires Screen (Tier 3).//

- `setTouchModeInverted(enabled:boolean):boolean`

      Sets Inverted Touch mode (Sneak-activate opens GUI if set to true).

- `isTouchModeInverted():boolean`

      Check to see if Inverted Touch mode is enabled (Sneak-activate opens
      GUI is set to true).

------------------------------------------------------------------------
