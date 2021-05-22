# Sides API

This "API" provides a global table to allow you to refer to sides /
directions by name, as opposed to their numbers. The underlying number
values are identical to Minecraft's internal numbering (as well as the
`ForgeDirection` Enum). This table serves as a two-directional
look-up, so you can resolve names to numbers, but also numbers back to a
human readable name. For example, `sides.top` has the value `1`,
whereas `sides[1]` has the string value `top`. A couple of aliases
for the side names are available, so it's less likely to accidentally
pick the wrong one. These are the basic values:

- Bottom (`bottom`), Number: 0 - Top (`top`), Number: 1 - Back
(`back`), Number: 2 - Front (`front`), Number: 3 - Right
(`right`), Number: 4 - Left (`left`), Number: 5

The following aliases are defined per default:

- Bottom: `down`, `negy` - Top: `up`, `posy` - Back: `north`,
`negz` - Front: `south`, `posz`, `forward` - Right: `west`,
`negx` - Left: `east`, `posx`

Useful for setting or getting redstone outputs or inputs, for example:

``` local component = require("component") local sides =
require("sides") local rs = component.redstone
rs.setOutput(sides.back, rs.getInput(sides.left)) ```

## Contents

# Sides API

This "API" provides a global table to allow you to refer to sides /
directions by name, as opposed to their numbers. The underlying number
values are identical to Minecraft's internal numbering (as well as the
`ForgeDirection` Enum). This table serves as a two-directional
look-up, so you can resolve names to numbers, but also numbers back to a
human readable name. For example, `sides.top` has the value `1`,
whereas `sides[1]` has the string value `top`. A couple of aliases
for the side names are available, so it's less likely to accidentally
pick the wrong one. These are the basic values:

- Bottom (`bottom`), Number: 0 - Top (`top`), Number: 1 - Back
(`back`), Number: 2 - Front (`front`), Number: 3 - Right
(`right`), Number: 4 - Left (`left`), Number: 5

The following aliases are defined per default:

- Bottom: `down`, `negy` - Top: `up`, `posy` - Back: `north`,
`negz` - Front: `south`, `posz`, `forward` - Right: `west`,
`negx` - Left: `east`, `posx`

Useful for setting or getting redstone outputs or inputs, for example:

``` local component = require("component") local sides =
require("sides") local rs = component.redstone
rs.setOutput(sides.back, rs.getInput(sides.left)) ```

## Contents
