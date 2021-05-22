# Component: Crafting

This component allows a robot to craft items and is provided by the
[crafting upgrade](/item/crafting_upgrade). The component can be
accessed via `component.crafting`.

When activated the robot considers the top-left area the crafting area
and will attempt to craft any layed-out crafting recipe in that area.
The requirements for a successful crafting attempt are exactly the same
as if you would attempt to craft the item in a crafting table.

![Crafting area](/component/crafting_area.png) *(free slots are the
crafting area)*

It is recommended (but not required) to use this upgrade in combination
with an [Inventory Controller
Upgrade](/item/inventory_controller_upgrade). It allows to read the
names and types of items and therefore makes it a lot easier to find the
required crafting resources.

## Functions

`craft([count: number]): boolean ` 
    Crafts up to count numbers or a full stack.

**count** - How many items to craft. I f omitted then the robot will
craft as many items as possible. In any case the robot will never craft
more than one full stack of crafting result items at once. **Returns:**
`true` if at least one item was crafted, `false` otherwise.

Note that if you specify an amount of items to be crafted that is lower
than the minimum resulting stack size (i.E. order to craft 1 stick, but
minimum result stack size is 4), then nothing will be crafted, however
this will still return true.

If successful the crafting result will be placed in the currently
selected slot, or (if occupied by something else) will be placed into
the next slot containing similar items or in the next free slot. This
can be one of the slots of the crafting area, which would make it
impossible to craft the same item again until that area is cleared.

### Example

``` lua
local component = require("component") local c =
component.crafting -- get primary crafting component c.craft(10) --
craft up to 10 items
```