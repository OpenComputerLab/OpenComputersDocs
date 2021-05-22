# Component: Generator

This component is provided by the [generator upgrade](/item/generator_upgrade)
for robots. Generators have an internal inventory that can store one item
stack of fuel items. This API allows interaction with that inventory.

Component name: `generator`. Callbacks:

- `count(): number`

    The current number of fuel items still in the generator.

- `insert([count: number]): boolean[, string]`

    Inserts up to the specified number of fuel items from the currently
    selected inventory slot into the generator's inventory. Returns
    `true` if at least one item was moved to the generator's inventory.
    Returns `false` and an error message otherwise.
    Possible error messages are:
    *"selected slot does not contain fuel"* if the selected slot has
    no item which can be burnt
    *"different fuel type already queued"* if there is already another
    type of item in the generator
    *"queue is full"* if there already are 64 items of that type in
    the generator

- `remove([count: number]): boolean`

    Removes up to the specified number of fuel items from the generator
    and places them into the currently selected slot or the first free
    slot after it. Returns `true` if at least one item was removed from
    the generator's inventory, `false` otherwise.

Example use:

``` lua
local component = require("component")
-- Assuming the generator was just added to a robot and
-- the selected slot contains one stack of coal:
local g = component.generator -- get primary generator component
print(g.count()) -- 0
g.insert(1) -- true
print(g.count()) -- 0 because the item was immediately consumed, generator is running now
g.insert(5)
print(g.count()) -- 5
g.remove() -- remove everything from the generator
print(g.count()) -- 0
g.insert() -- insert everything into the generator
print(g.count()) -- 63 (minus the one consumed in the beginning)
```