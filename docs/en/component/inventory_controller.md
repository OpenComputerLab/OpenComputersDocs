# Component: Inventory Controller

**Component name:** `inventory_controller`

This component is provided by the [inventory controller
upgrade](/item/inventory_controller_upgrade).

With this API the robot can receive additional information about items
or inventories and is able to put items into and take them from specific
slots.

Sides required for most operations are specified in the [Sides
API](/api/sides). If no or an invalid side is provided functions will
usually throw an error. To interact with the robot's own inventory you
need to use the side `back`, which however makes it impossible to
interact with inventories behind the robot. Robots cannot access their
left or right sides. You can interact with external inventories in front
of, above, or below the robot.

Callbacks:

- `getInventorySize(side: number): number or nil[, string]`

      Returns the size of the inventory at the specified side. **side** -
      must be a valid side.
      **Returns:** the size of the inventory, or `nil` followed by a
      description why this function failed (usually `no inventory`).

- `getStackInSlot(side:number, slot:number):table`

Returns a table describing the item in the specified slot or nil.
Deprecated for getting info about robot's own inventory, see
`getStackInInternalSlot`. **side** - must be a valid side. **slot** -
the slot to analyze. This does not check the inventory size and will
consider slots outside the inventory bounds to be empty. **Returns:**
`nil` if the slot was empty (or outside the inventory's bounds), a
table otherwise with the following information about the item in that
slot:

- **damage**:number - the current damage value of the item. -
**maxDamage**:number - the maximum damage this item can have before

      it breaks.

- **size**:number - the current stack size of the item. -
**maxSize**:number - the maximum stack size of this item. -
**id**:number - the Minecraft id of the item. Note that this field

      is only included if `insertIdsInConverters=true` in the configs, and
      can vary between servers!

- **name**:string - the **untranslated** item name, which is an

      internal Minecraft value like `oc:item.FloppyDisk`

- **label**:string - the **translated** item name - **hasTag**:boolean
- whether or not the item has an NBT tag

      associated with it.

- `getStackInInternalSlot(slot:number):table`

      Gets Itemstack description of item in specified or selected slot (if
      no input provided) of robot inventory.

- `dropIntoSlot(side:number, slot:number[, count:number]):boolean[,
string]`

      Puts up to count items from the currently selected slot into the
      specified slot of the inventory at the specified side.
      **side** - a valid side.
      **slot** - the slot to drop the item into.
      **count** - how many items to transfer.
      **Returns:** `true` if at least one item was moved, `false` and a
      secondary result that describes the error otherwise.
      Note that the robot cannot drop items into it's own inventory,
      attempting to do so will cause this to throw an error. You need to
      use `robot.transferTo` from the [[api:robot|Robot API]] to do
      so.

- `suckFromSlot(side:number, slot:number[, count:number]):boolean`

      Takes up to count items from the specified slot of the inventory at
      the specified side and puts them into the currently selected slot.
      **side** - a valid side.
      **slot** - the slot to take the item from.
      **count** - how many items to transfer.
      **Returns:** `true` if at least one item was moved, `false`
      otherwise.
      If the currently selected slot is occupied, then the items will be
      stacked with similar items in the robot's inventory or moved to the
      next free slot if available. If no slot is available this operation
      will fail.
      Note that the robot cannot suck items from it's own inventory,
      attempting to do so will cause this to throw an error. You need to
      use `robot.transferTo` from the [[api:robot|Robot API]] to do
      so.

- `equip():boolean`

      Swaps the content of the robot's tool slot with the content of the
      currently selected inventory slot.
      **Returns:** `true` if the items were swapped, `false` otherwise.
      This operation usually succeeds.
      Note that you can put any kind of item into the robot's tool slot,
      not only tools, even items that the robot cannot use at all.

- `store(side:number, slot:number, dbAddress:string,
dbSlot:number):boolean`

      Stores the Itemstack description of the item from the specified slot
      in an inventory on the specified side, into a specified database
      slot with the specified address.

- `storeInternal(slot:number, dbAddress:string,
dBslot:number):boolean`

      Stores Itemstack description of item in specified robot inventory
      slot into specified database slot with the specified database
      address.

- `compareToDatabase(slot:number, dBaddress:string,
dBslot:number):boolean`

      Compare Itemstack description in specified slot with one in
      specified slot of a database with specified address. Returns
      **true** if items match.

- `compareStacks(side:number, slotA:number, slotB:number):boolean`

      Checks to see if Itemstack descriptions in specified slotA and slotB
      of inventory on specified side match. Returns **true** if identical.

- `getSlotMaxStackSize(side:number, slot:number):number`

      Gets maximum number of items in specified slot in inventory on the
      specified side.

- `getSlotStackSize(side:number, slot:number):number`

      Gets number of items in specified slot in inventory on the specified
      side.

Example:

Print meta-info about the item in the position indicated by
[slot](http://ocdoc.cil.li/api:robot)

``` local component = require("component") local sides =
require("sides")

local slot = 1 local item =
component.inventory_controller.getStackInInternalSlot(slot)

if item then

      print("Item name: ", item.name)
      print("Item count: ", item.size)
      print("Item damage: ", item.damage)

else

      print("Slot " .. slot .. " is empty")

end ```

# Component: Inventory Controller

**Component name:** `inventory_controller`

This component is provided by the [inventory controller
upgrade](/item/inventory_controller_upgrade).

With this API the robot can receive additional information about items
or inventories and is able to put items into and take them from specific
slots.

Sides required for most operations are specified in the [Sides
API](/api/sides). If no or an invalid side is provided functions will
usually throw an error. To interact with the robot's own inventory you
need to use the side `back`, which however makes it impossible to
interact with inventories behind the robot. Robots cannot access their
left or right sides. You can interact with external inventories in front
of, above, or below the robot.

Callbacks:

- `getInventorySize(side: number): number or nil[, string]`

      Returns the size of the inventory at the specified side. **side** -
      must be a valid side.
      **Returns:** the size of the inventory, or `nil` followed by a
      description why this function failed (usually `no inventory`).

- `getStackInSlot(side:number, slot:number):table`

Returns a table describing the item in the specified slot or nil.
Deprecated for getting info about robot's own inventory, see
`getStackInInternalSlot`. **side** - must be a valid side. **slot** -
the slot to analyze. This does not check the inventory size and will
consider slots outside the inventory bounds to be empty. **Returns:**
`nil` if the slot was empty (or outside the inventory's bounds), a
table otherwise with the following information about the item in that
slot:

- **damage**:number - the current damage value of the item. -
**maxDamage**:number - the maximum damage this item can have before

      it breaks.

- **size**:number - the current stack size of the item. -
**maxSize**:number - the maximum stack size of this item. -
**id**:number - the Minecraft id of the item. Note that this field

      is only included if `insertIdsInConverters=true` in the configs, and
      can vary between servers!

- **name**:string - the **untranslated** item name, which is an

      internal Minecraft value like `oc:item.FloppyDisk`

- **label**:string - the **translated** item name - **hasTag**:boolean
- whether or not the item has an NBT tag

      associated with it.

- `getStackInInternalSlot(slot:number):table`

      Gets Itemstack description of item in specified or selected slot (if
      no input provided) of robot inventory.

- `dropIntoSlot(side:number, slot:number[, count:number]):boolean[,
string]`

      Puts up to count items from the currently selected slot into the
      specified slot of the inventory at the specified side.
      **side** - a valid side.
      **slot** - the slot to drop the item into.
      **count** - how many items to transfer.
      **Returns:** `true` if at least one item was moved, `false` and a
      secondary result that describes the error otherwise.
      Note that the robot cannot drop items into it's own inventory,
      attempting to do so will cause this to throw an error. You need to
      use `robot.transferTo` from the [[api:robot|Robot API]] to do
      so.

- `suckFromSlot(side:number, slot:number[, count:number]):boolean`

      Takes up to count items from the specified slot of the inventory at
      the specified side and puts them into the currently selected slot.
      **side** - a valid side.
      **slot** - the slot to take the item from.
      **count** - how many items to transfer.
      **Returns:** `true` if at least one item was moved, `false`
      otherwise.
      If the currently selected slot is occupied, then the items will be
      stacked with similar items in the robot's inventory or moved to the
      next free slot if available. If no slot is available this operation
      will fail.
      Note that the robot cannot suck items from it's own inventory,
      attempting to do so will cause this to throw an error. You need to
      use `robot.transferTo` from the [[api:robot|Robot API]] to do
      so.

- `equip():boolean`

      Swaps the content of the robot's tool slot with the content of the
      currently selected inventory slot.
      **Returns:** `true` if the items were swapped, `false` otherwise.
      This operation usually succeeds.
      Note that you can put any kind of item into the robot's tool slot,
      not only tools, even items that the robot cannot use at all.

- `store(side:number, slot:number, dbAddress:string,
dbSlot:number):boolean`

      Stores the Itemstack description of the item from the specified slot
      in an inventory on the specified side, into a specified database
      slot with the specified address.

- `storeInternal(slot:number, dbAddress:string,
dBslot:number):boolean`

      Stores Itemstack description of item in specified robot inventory
      slot into specified database slot with the specified database
      address.

- `compareToDatabase(slot:number, dBaddress:string,
dBslot:number):boolean`

      Compare Itemstack description in specified slot with one in
      specified slot of a database with specified address. Returns
      **true** if items match.

- `compareStacks(side:number, slotA:number, slotB:number):boolean`

      Checks to see if Itemstack descriptions in specified slotA and slotB
      of inventory on specified side match. Returns **true** if identical.

- `getSlotMaxStackSize(side:number, slot:number):number`

      Gets maximum number of items in specified slot in inventory on the
      specified side.

- `getSlotStackSize(side:number, slot:number):number`

      Gets number of items in specified slot in inventory on the specified
      side.

Example:

Print meta-info about the item in the position indicated by
[slot](http://ocdoc.cil.li/api:robot)

``` local component = require("component") local sides =
require("sides")

local slot = 1 local item =
component.inventory_controller.getStackInInternalSlot(slot)

if item then

      print("Item name: ", item.name)
      print("Item count: ", item.size)
      print("Item damage: ", item.damage)

else

      print("Slot " .. slot .. " is empty")

end ```
