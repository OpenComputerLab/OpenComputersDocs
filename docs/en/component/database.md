# Component: Database

This component is provided by the [database upgrade](/item/database_upgrade).

Component name: `database`.

The database component is primarily useful to work with "full" item
stacks, including NBT tags, which are (by default) not available to Lua
scripts (to avoid exploits / breaking of other mods' gameplay). Some
components allow specifying item stacks by instead specifying the
address of a database component, and slot the item stack is in that
database - for example, the Export Bus driver for Applied Energistics 2
makes use of this functionality.

Callbacks:

- `get(slot:number):table`

    Get the representation of the item stack stored in the specified
    slot.

- `computeHash(slot:number):string`

    Computes a hash value for the item stack in the specified slot. This
    value is guaranteed to be the same for identical item stacks,
    allowing comparison of item stacks across a network (by comparing
    the hash values).

- `indexOf(hash:string):number`

    Get the index of an item stack with the specified hash. Returns a
    negative value if no such stack was found.

- `clear(slot:number):boolean`

    Clears the specified slot. Returns true if there was something in
    the slot before.

- `copy(fromSlot:number, toSlot:number[, address:string]):boolean`

    Copies an entry to another slot, optionally to another database.
    Returns true if something was overwritten.

- `clone(address:string):number`

    Copies the data stored in this database to another database with the
    specified address.

Example Use:

``` lua
local component = require("component")
local sides = require("sides")
 
local db = component.database -- primary database component
local invcontrol = component.inventory_controller -- primary inventory controller
 
-- define slot numbers
dbSlot = 1
invSlot = 1
 
-- compare item inside remote inventory to item in first slot of database
if db.get(dbSlot).label == invcontrol.getStackInSlot(sides.north, invSlot).label then
	-- items match, do stuff with it. 
else
	-- items don't match, do nothing, or do something else.
end
```