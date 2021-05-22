# Colors API

This "API" serves a global table that allows you to refer
to colors by their name, instead of their associated ID/number.
The table serves as a look-up in both directions, so for
example `colors.blue` has the value `11`, whereas `colors[11]`
has the string value `blue`. These are the defined colors:

- White (`white`), Number: 0
- Orange (`orange`), Number: 1
- Magenta (`magenta`), Number: 2
- Light Blue (`lightblue`), Number: 3
- Yellow (`yellow`), Number: 4
- Lime (`lime`), Number: 5
- Pink (`pink`), Number: 6
- Gray (`gray`), Number: 7
- Silver (`silver`), Number: 8
- Cyan (`cyan`), Number: 9 
- Purple (`purple`), Number: 10
- Blue (`blue`), Number: 11
- Brown (`brown`), Number: 12
- Green (`green`), Number: 13
- Red (`red`), Number: 14
- Black (`black`), Number: 15

Note that the indexing starts at zero, not one.

Useful for setting or getting bundled redstone output or input, for
example:

``` lua
local component = require("component") local colors =
require("colors") local rs = component.redstone
rs.setBundledOutput(sides.back, colors.green,
rs.getBundledInput(sides.front, colors.blue))
```

would output the back signal strength to the front.

## Contents

# Colors API

This "API" serves a global table that allows you to refer to colors by
their name, instead of their associated ID/number. The table serves as a
look-up in both directions, so for example `colors.blue` has the value
`11`, whereas `colors[11]` has the string value `blue`. These
are the defined colors:

- White (`white`), Number: 0
- Orange (`orange`), Number: 1
- Magenta (`magenta`), Number: 2
- Light Blue (`lightblue`), Number: 3
- Yellow (`yellow`), Number: 4
- Lime (`lime`), Number: 5
- Pink (`pink`), Number: 6
- Gray (`gray`), Number: 7
- Silver (`silver`), Number: 8
- Cyan (`cyan`), Number: 9 
- Purple (`purple`), Number: 10
- Blue (`blue`), Number: 11
- Brown (`brown`), Number: 12
- Green (`green`), Number: 13
- Red (`red`), Number: 14
- Black (`black`), Number: 15

Note that the indexing starts at zero, not one.

Useful for setting or getting bundled redstone output or input, for
example:

``` lua
local component = require("component") local colors =
require("colors") local rs = component.redstone
rs.setBundledOutput(sides.back, colors.green,
rs.getBundledInput(sides.front, colors.blue))
```

would output the back signal strength to the front.