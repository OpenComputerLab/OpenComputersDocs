# Component: Hologram

This component is provided by the [Hologram
Projector](/block/hologram_projector). These can be used to create
holographic projections in a resolution of 48x32x48, over a maximum area
of 9x6x9 blocks. Tier two holograms do not provide a higher resolution,
instead they allow using up to three colors in the displayed hologram
(as opposed to just one for the tier one hologram).

Component name: `hologram`. Callbacks:

- `clear()`

      Clears the hologram.

- `get(x:number, y:number, z:number):number`

      Returns the value at the specified position.

- `set(x:number, y:number, z:number, value:number or boolean)`

      Set the value for the specified position.

- `fill(x:number, z:number[, minY:number], maxY:number,
value:number)`

      Fills an interval in the specified column column with the specified
      value. Will overwrite only the voxels in the interval. If `minY` is
      omitted it defaults to 1. The two interval ends are inclusive.
      //Note:// Before 1.3.3 there was no `minY` argument and all voxels
      below and including the specified height would be set, all voxels
      above would be unset.

- `copy(x:number, z:number, sx:number, sz:number, tx:number,
tz:number)`

      Copies an area of columns by the specified translation.

- `getScale():number`

      Returns the current render scale of the hologram.

- `setScale(value:number)`

      Set the render scale. A larger scale consumes more energy. The
      minimum scale is 0.33, where the hologram will fit in a single block
      space, the maximum scale is 3, where the hologram will take up a
      9x6x9 block space.

- `getTranslation:number, number, number` Return the current

      translation offset.

- `setTranslation(x:number, y:number, z:number)` Set the translation

      vector. The hologram display will be offset by this vector from its
      normal location. The maximum allowable translation is a function of
      tier. Units are the hologram's size, so the distance translated
      increases and decreases with scale as well.

- `maxDepth():number`

      The color depth supported by the hologram.

- `getPaletteColor(index:number):number`

      Get the hex color defined for the specified value.

- `setPaletteColor(index:number, value:number):number`

      Set the hex color defined for the specified value.

Simple example program that allows setting individual voxels:

``` local component = require("component") local hologram =
component.hologram local args = {...} hologram.set(tonumber(args[1]),
tonumber(args[2]), tonumber(args[3]), args[4] == "true" or
args[4] == "on") ```

Example use (assuming it's saved as `holo-set.lua`): `# holo-set 16
8 20 true`

Further examples:

- [Holo

      Flow](https://github.com/OpenPrograms/Sangar-Programs/blob/master/holo-flow.lua)
      This program generates a heightmap and 'moves' across it over
      time, creating the effect of a flowing terrain.

- [Holo

      Text](https://github.com/OpenPrograms/Sangar-Programs/blob/master/holo-text.lua)
      This program generates a random heightmap and displays scrolling
      text above it.

Note, the second example is quite a bit more advanced then the first.
**Important**: both scripts also need the
[noise.lua](<https://github.com/OpenPrograms/Sangar-Programs/blob/master/noise.lua>)
script to be in the same folder.

------------------------------------------------------------------------

# Component: Hologram

This component is provided by the [Hologram
Projector](/block/hologram_projector). These can be used to create
holographic projections in a resolution of 48x32x48, over a maximum area
of 9x6x9 blocks. Tier two holograms do not provide a higher resolution,
instead they allow using up to three colors in the displayed hologram
(as opposed to just one for the tier one hologram).

Component name: `hologram`. Callbacks:

- `clear()`

      Clears the hologram.

- `get(x:number, y:number, z:number):number`

      Returns the value at the specified position.

- `set(x:number, y:number, z:number, value:number or boolean)`

      Set the value for the specified position.

- `fill(x:number, z:number[, minY:number], maxY:number,
value:number)`

      Fills an interval in the specified column column with the specified
      value. Will overwrite only the voxels in the interval. If `minY` is
      omitted it defaults to 1. The two interval ends are inclusive.
      //Note:// Before 1.3.3 there was no `minY` argument and all voxels
      below and including the specified height would be set, all voxels
      above would be unset.

- `copy(x:number, z:number, sx:number, sz:number, tx:number,
tz:number)`

      Copies an area of columns by the specified translation.

- `getScale():number`

      Returns the current render scale of the hologram.

- `setScale(value:number)`

      Set the render scale. A larger scale consumes more energy. The
      minimum scale is 0.33, where the hologram will fit in a single block
      space, the maximum scale is 3, where the hologram will take up a
      9x6x9 block space.

- `getTranslation:number, number, number` Return the current

      translation offset.

- `setTranslation(x:number, y:number, z:number)` Set the translation

      vector. The hologram display will be offset by this vector from its
      normal location. The maximum allowable translation is a function of
      tier. Units are the hologram's size, so the distance translated
      increases and decreases with scale as well.

- `maxDepth():number`

      The color depth supported by the hologram.

- `getPaletteColor(index:number):number`

      Get the hex color defined for the specified value.

- `setPaletteColor(index:number, value:number):number`

      Set the hex color defined for the specified value.

Simple example program that allows setting individual voxels:

``` local component = require("component") local hologram =
component.hologram local args = {...} hologram.set(tonumber(args[1]),
tonumber(args[2]), tonumber(args[3]), args[4] == "true" or
args[4] == "on") ```

Example use (assuming it's saved as `holo-set.lua`): `# holo-set 16
8 20 true`

Further examples:

- [Holo

      Flow](https://github.com/OpenPrograms/Sangar-Programs/blob/master/holo-flow.lua)
      This program generates a heightmap and 'moves' across it over
      time, creating the effect of a flowing terrain.

- [Holo

      Text](https://github.com/OpenPrograms/Sangar-Programs/blob/master/holo-text.lua)
      This program generates a random heightmap and displays scrolling
      text above it.

Note, the second example is quite a bit more advanced then the first.
**Important**: both scripts also need the
[noise.lua](<https://github.com/OpenPrograms/Sangar-Programs/blob/master/noise.lua>)
script to be in the same folder.

------------------------------------------------------------------------
