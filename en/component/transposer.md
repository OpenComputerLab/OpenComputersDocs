# Component: Transposer

This component is provided by the [Transposer](/block/transposer).

Component name: `transposer`.

Callbacks:

- `transferFluid(sourceSide:number, sinkSide:number,
count:number):boolean, number`

      Transfer some fluids between two fluid handlers (pipes or tanks,
      etc). `sourceSide` is the side pulled from and `sinkSide` is the
      side transferred to. The side value is a integral value representing
      the cardinal directions (east, west, south, north), up, and down.
      The `sides` library has these values for convenience. `count` is the
      number of millibuckets to transfers. Returns true and the number of
      millibuckets transfered on success, or false and an error message on
      failure.

- `store(side:number, slot:number, dbAddress:string,
dbSlot:number):boolean`

      Store an item stack description in the specified slot of the
      database with the specified address.

- `compareStackToDatabase(side:number, slot:number, dbAddress:string,
dbSlot:number, checkNBT:boolean=false):boolean`

      Compare an item in the specified slot in the inventory on the
      specified side with one in the database with the specified address.

- `getSlotStackSize(side:number, slot:number):number`

      Get number of items in the specified slot of the inventory on the
      specified side of the device.

- `getSlotMaxStackSize(side:number, slot:number):number`

      Get the maximum number of items in the specified slot of the
      inventory on the specified side of the device.

- `getInventoryName(side:number):string`

      Get the the name of the inventory on the specified side of the
      device.

- `getInventorySize(side:number):number`

      Get the number of slots in the inventory on the specified side of
      the device.

- `getFluidInTank(side:number , tank:number):table`

      Get a description of the fluid in the the specified tank on the
      specified side.

- `getTankLevel(side:number , tank:number):number`

      Get the amount of fluid in the specified tank on the specified side.

- `transferItem(sourceSide:number, sinkSide:number, count:number,
sourceSlot:number, sinkSlot:number):number`

      Transfer some items between two inventories.

- `compareStacks(side:number, slotA:number, slotB:number,
checkNBT:boolean=false):boolean`

      Get whether the items in the two specified slots of the inventory on
      the specified side of the device are of the same type.

- `areStacksEquivalent(side:number, slotA:number,
slotB:number):boolean`

      Get whether the items in the two specified slots of the inventory on
      the specified side of the device are equivalent (have shared
      OreDictionary IDs).

- `getTankCount(side:number):number`

      Get the number of tanks available on the specified side.

- `getStackInSlot(side:number, slot:number):table`

      Get a description of the stack in the inventory on the specified
      side of the device.

- `getTankCapacity(side:number , tank:number):number`

      Get the capacity of the specified tank on the specified side.

- `getAllStacks(side:number):userdata`

      Get a description of all stacks in the inventory on the specified
      side of the device.
      The return value is callable. Calling it will return a table
      describing the stack in the inventory or nothing if the iterator
      reaches end.
      The return value provides the followings callbacks:
      `getAll():table`
      Returns ALL the stack in the this.array. Memory intensive.
      `count():number`
      Returns the number of elements in the this.array.
      `reset()`
      Reset the iterator index so that the next call will return the first
      element.

------------------------------------------------------------------------

# Component: Transposer

This component is provided by the [Transposer](/block/transposer).

Component name: `transposer`.

Callbacks:

- `transferFluid(sourceSide:number, sinkSide:number,
count:number):boolean, number`

      Transfer some fluids between two fluid handlers (pipes or tanks,
      etc). `sourceSide` is the side pulled from and `sinkSide` is the
      side transferred to. The side value is a integral value representing
      the cardinal directions (east, west, south, north), up, and down.
      The `sides` library has these values for convenience. `count` is the
      number of millibuckets to transfers. Returns true and the number of
      millibuckets transfered on success, or false and an error message on
      failure.

- `store(side:number, slot:number, dbAddress:string,
dbSlot:number):boolean`

      Store an item stack description in the specified slot of the
      database with the specified address.

- `compareStackToDatabase(side:number, slot:number, dbAddress:string,
dbSlot:number, checkNBT:boolean=false):boolean`

      Compare an item in the specified slot in the inventory on the
      specified side with one in the database with the specified address.

- `getSlotStackSize(side:number, slot:number):number`

      Get number of items in the specified slot of the inventory on the
      specified side of the device.

- `getSlotMaxStackSize(side:number, slot:number):number`

      Get the maximum number of items in the specified slot of the
      inventory on the specified side of the device.

- `getInventoryName(side:number):string`

      Get the the name of the inventory on the specified side of the
      device.

- `getInventorySize(side:number):number`

      Get the number of slots in the inventory on the specified side of
      the device.

- `getFluidInTank(side:number , tank:number):table`

      Get a description of the fluid in the the specified tank on the
      specified side.

- `getTankLevel(side:number , tank:number):number`

      Get the amount of fluid in the specified tank on the specified side.

- `transferItem(sourceSide:number, sinkSide:number, count:number,
sourceSlot:number, sinkSlot:number):number`

      Transfer some items between two inventories.

- `compareStacks(side:number, slotA:number, slotB:number,
checkNBT:boolean=false):boolean`

      Get whether the items in the two specified slots of the inventory on
      the specified side of the device are of the same type.

- `areStacksEquivalent(side:number, slotA:number,
slotB:number):boolean`

      Get whether the items in the two specified slots of the inventory on
      the specified side of the device are equivalent (have shared
      OreDictionary IDs).

- `getTankCount(side:number):number`

      Get the number of tanks available on the specified side.

- `getStackInSlot(side:number, slot:number):table`

      Get a description of the stack in the inventory on the specified
      side of the device.

- `getTankCapacity(side:number , tank:number):number`

      Get the capacity of the specified tank on the specified side.

- `getAllStacks(side:number):userdata`

      Get a description of all stacks in the inventory on the specified
      side of the device.
      The return value is callable. Calling it will return a table
      describing the stack in the inventory or nothing if the iterator
      reaches end.
      The return value provides the followings callbacks:
      `getAll():table`
      Returns ALL the stack in the this.array. Memory intensive.
      `count():number`
      Returns the number of elements in the this.array.
      `reset()`
      Reset the iterator index so that the next call will return the first
      element.

------------------------------------------------------------------------
