# Component: Geolyzer

This component is provided by the [geolyzer block](/block/geolyzer).

Component name: `geolyzer`. Callbacks:

- `scan(x:number, z:number[, y:number, w:number, d:number,
h:number][, ignoreReplaceable:boolean|options:table]):table`

      Analyzes the density of an area at the specified relative
      coordinates `x`, `z` and `y`. This will return a list of hardness
      values for the blocks in the specified range. The coordinates are
      relative to the location of the geolyzer. Size of the analyzed area
      can be optionally given with parameters `w`, `d` and `h` which stand
      for width, depth and height, otherwise the area is assumed to be a
      single block at the specified offset.

      Hardness values for blocks further away from the geolyzer are more
      noisy than those for blocks nearby. The exact formula for
      calculating how much a single value can deviate from the real
      hardness value of a specific block is:
      `euclidean distance to block * 1/33 * geolyzerNoise` where
      `geolyzerNoise` is a mod config option with a default value of `2`.

      Table with multiple results is linear, but results represent an area
      in a 3D world. Area starts at a block defined by offset from the
      geolyzer block (`x`, `z` and `y`), and size (`w`, `d` and `h`)
      defines how many blocks it extends towards respectively: positive x,
      positive z and positive y coordinates. To figure out what elements
      in results table correspond to which coordinates, it should be
      interpreted as follows: first, values go towards positive x, then
      towards positive z, then towards positive y. In other words, if the
      result was a 3D nested table which got converted to a linear table,
      innermost table would contain values going in the positive x
      direction, middle table going in the positive z direction, and the
      outermost going in the positive y direction. See the code snippet at
      the bottom for an example.

**Note** that the offset is always absolute in terms of facing
direction. In other words if the geolyzer is installed in a robot,
offset won't be affected by the robot's facing.

**Note** that the amount of values returned is always 64, even if the
scan volume is only part of that. If 10 blocks are scanned, the first 10
values in the result represent those blocks scanned. The remaining
values in the result should be ignored.

- `analyze(side:number[, options:table]):table`

      Get some information on a directly adjacent block. By default the
      returned table returns the string ID of the block (e.g.
      `minecraft:dirt`, metadata, hardness and some more information).
      Note that a single call to this consumes the same amount of energy a
      call to `scan` does!
      This method can be disabled with the `misc.allowItemStackInspection`
      setting in the config.

- `store(side:number, dbAddress:string, dbSlot:number):boolean`

      Stores an item stack representation of the block on the specified
      side of the geolyzer to the specified slot of a
      [[component:database|database component]] with the specified
      address. Do not expect this to work (well) for every block in
      existence, in particular not for mod's blocks that are
      differentiated by NBT data (such as robots).

- `detect(side:number):boolean, string`

      Same as `robot.detect` (from the robot component). Detects the block
      on the given side, relative to the robot, and returns whether or not
      the robot can move into the block, as well as a general description
      of the block.
      **Returns:** `true` if the robot if whatever is in front of the
      robot would prevent him from moving forward (a block or an entity)
      (Note: Drones return `true` even if the block is `passable`),
      `false` otherwise. The second parameter describes what is in front
      in general and is one of either `entity`, `solid`, `replaceable`,
      `liquid`, `passable` or `air`.

- `canSeeSky():boolean` Returns whether there is a clear line of
sight

      to the sky directly above. Transparent blocks, e.g. glass don't
      affect the line of sight.

- `isSunVisible():boolean` Returns whether the sun is currently

      visible directly above. The result is affected by possible blocks
      blocking the line of sight directly above (which can be checked with
      `canSeeSky()`) and whether it's night or day.

Following code snippet can be used to get a grasp of how the `scan`
function works in practice. It scans an area of specified size at a
specified offset, saves the returned data along with correct offsets
from the geolyzer block (or robot) and prints those.

```{=html}

```` {.Lua}
local component = require("component")
local geolyzer = component.geolyzer
```
local offsetx = 4 local offsetz = -3 local offsety = -5

local sizex = 3 local sizez = 4 local sizey = 5

local map = {} local scanData = geolyzer.scan(offsetx, offsetz, offsety,
sizex, sizez, sizey) local i = 1 for y = 0, sizey - 1 do for z = 0,
sizez - 1 do for x = 0, sizex - 1 do -- alternatively when thinking in
terms of 3-dimensional table: map[offsety + y][offsetz + z][offsetx
+ x] = scanData[i] map[i] = {posx = offsetx + x, posy = offsety +
y, posz = offsetz + z, hardness = scanData[i]} i = i + 1 end end end

for i = 1, sizex*sizez*sizey do print(map[i].posx, map[i].posy,
map[i].posz, map[i].hardness) end `
````

`{=html}

------------------------------------------------------------------------

# Component: Geolyzer

This component is provided by the [geolyzer block](/block/geolyzer).

Component name: `geolyzer`. Callbacks:

- `scan(x:number, z:number[, y:number, w:number, d:number,
h:number][, ignoreReplaceable:boolean|options:table]):table`

      Analyzes the density of an area at the specified relative
      coordinates `x`, `z` and `y`. This will return a list of hardness
      values for the blocks in the specified range. The coordinates are
      relative to the location of the geolyzer. Size of the analyzed area
      can be optionally given with parameters `w`, `d` and `h` which stand
      for width, depth and height, otherwise the area is assumed to be a
      single block at the specified offset.

      Hardness values for blocks further away from the geolyzer are more
      noisy than those for blocks nearby. The exact formula for
      calculating how much a single value can deviate from the real
      hardness value of a specific block is:
      `euclidean distance to block * 1/33 * geolyzerNoise` where
      `geolyzerNoise` is a mod config option with a default value of `2`.

      Table with multiple results is linear, but results represent an area
      in a 3D world. Area starts at a block defined by offset from the
      geolyzer block (`x`, `z` and `y`), and size (`w`, `d` and `h`)
      defines how many blocks it extends towards respectively: positive x,
      positive z and positive y coordinates. To figure out what elements
      in results table correspond to which coordinates, it should be
      interpreted as follows: first, values go towards positive x, then
      towards positive z, then towards positive y. In other words, if the
      result was a 3D nested table which got converted to a linear table,
      innermost table would contain values going in the positive x
      direction, middle table going in the positive z direction, and the
      outermost going in the positive y direction. See the code snippet at
      the bottom for an example.

**Note** that the offset is always absolute in terms of facing
direction. In other words if the geolyzer is installed in a robot,
offset won't be affected by the robot's facing.

**Note** that the amount of values returned is always 64, even if the
scan volume is only part of that. If 10 blocks are scanned, the first 10
values in the result represent those blocks scanned. The remaining
values in the result should be ignored.

- `analyze(side:number[, options:table]):table`

      Get some information on a directly adjacent block. By default the
      returned table returns the string ID of the block (e.g.
      `minecraft:dirt`, metadata, hardness and some more information).
      Note that a single call to this consumes the same amount of energy a
      call to `scan` does!
      This method can be disabled with the `misc.allowItemStackInspection`
      setting in the config.

- `store(side:number, dbAddress:string, dbSlot:number):boolean`

      Stores an item stack representation of the block on the specified
      side of the geolyzer to the specified slot of a
      [[component:database|database component]] with the specified
      address. Do not expect this to work (well) for every block in
      existence, in particular not for mod's blocks that are
      differentiated by NBT data (such as robots).

- `detect(side:number):boolean, string`

      Same as `robot.detect` (from the robot component). Detects the block
      on the given side, relative to the robot, and returns whether or not
      the robot can move into the block, as well as a general description
      of the block.
      **Returns:** `true` if the robot if whatever is in front of the
      robot would prevent him from moving forward (a block or an entity)
      (Note: Drones return `true` even if the block is `passable`),
      `false` otherwise. The second parameter describes what is in front
      in general and is one of either `entity`, `solid`, `replaceable`,
      `liquid`, `passable` or `air`.

- `canSeeSky():boolean` Returns whether there is a clear line of
sight

      to the sky directly above. Transparent blocks, e.g. glass don't
      affect the line of sight.

- `isSunVisible():boolean` Returns whether the sun is currently

      visible directly above. The result is affected by possible blocks
      blocking the line of sight directly above (which can be checked with
      `canSeeSky()`) and whether it's night or day.

Following code snippet can be used to get a grasp of how the `scan`
function works in practice. It scans an area of specified size at a
specified offset, saves the returned data along with correct offsets
from the geolyzer block (or robot) and prints those.

```{=html}

```` {.Lua}
local component = require("component")
local geolyzer = component.geolyzer
```
local offsetx = 4 local offsetz = -3 local offsety = -5

local sizex = 3 local sizez = 4 local sizey = 5

local map = {} local scanData = geolyzer.scan(offsetx, offsetz, offsety,
sizex, sizez, sizey) local i = 1 for y = 0, sizey - 1 do for z = 0,
sizez - 1 do for x = 0, sizex - 1 do -- alternatively when thinking in
terms of 3-dimensional table: map[offsety + y][offsetz + z][offsetx
+ x] = scanData[i] map[i] = {posx = offsetx + x, posy = offsety +
y, posz = offsetz + z, hardness = scanData[i]} i = i + 1 end end end

for i = 1, sizex*sizez*sizey do print(map[i].posx, map[i].posy,
map[i].posz, map[i].hardness) end `
````

`{=html}

------------------------------------------------------------------------
