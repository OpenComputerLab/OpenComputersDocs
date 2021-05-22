# Component: Drone

Provided by [Drones](/item/drone).

Drones are mobile open computer machines, similar to
[robots](/block/robot), yet more mobile yet more limited. For example,
they lack an option for a screen or harddrive.

Component name: `drone`.

## Base Methods

- `getStatusText():string`

    Get the status text currently being displayed in the GUI.

- `setStatusText(value:string):string`

    Set the status text to display in the GUI, returns new value.

- `move(dx:number, dy:number, dz:number)`

    Change the target position by the specified offset.

- `getOffset():number`

    Get the current distance to the target position.

- `getVelocity():number`

    Get the current velocity in m/s.

- `getMaxVelocity():number`

    Get the maximum velocity, in m/s.

- `getAcceleration():number`

    Get the currently set acceleration.

- `setAcceleration(value:number):number`

    Try to set the acceleration to the specified value and return the new acceleration.

- `tankCount():number`

    Returns the number of tanks installed in the robot. 

- `selectTank(tank:number)`

    Selects the specified tank (if robot contains more than one [[item:tank_upgrade|Tank upgrade]]). Any tank operations will use this tank. 

- `tankLevel([tank:number]):number`

    Returns the fluid level in the specified tank. If no tank specified, returns the fluid level in the selected tank (using `selectTank()`).

- `tankSpace([tank:number]):number`

    Returns the remaining fluid capacity (empty space) in the specified tank. If not tank specified, returns the  remaining capacity in the selected tank. 

- `compareFluidTo(tank:number):boolean`

    Tests whether the fluid in the selected tank (in the robot inventory) is the same as in the specified tank (requires [[item:tank_upgrade|Tank upgrade]]).

- `transferFluidTo(tank:number[, count:number]):boolean`

    Transfer the specified amount of fluid in the selected tank into the specified tank. If no volume is specified, the  robot will attempt to transfer 1000mB.

## Internal Inventory Methods

- `inventorySize():number`

    Returns the size of the device's internal inventory.

- `select([slot:number]):number`

    Get the currently selected slot; set the selected slot if specified.

- `count([slot:number]):number`

    Get the number of items in the specified slot, otherwise in the
    selected slot.

- `space([slot:number]):number`

    Get the remaining space in the specified slot, otherwise in the
    selected slot.

- `compareTo(otherSlot:number):boolean`

    Compare the contents of the selected slot (in the robot inventory)
    to the contents of the specified slot (also in the robot inventory).

- `transferTo(toSlot:number[, amount:number]):boolean`

    Move the specified amount of items from the selected slot into the
    specified slot. If no amount is specified, the entire stack is moved
    to the target slot.

- `tankCount():number`

    Returns the number of tanks installed in the robot. 

- `selectTank(tank:number)`

    Selects the specified tank (if robot contains more than one [[item:tank_upgrade|Tank upgrade]]). Any tank operations will use this tank. 

- `tankLevel([tank:number]):number`

    Returns the fluid level in the specified tank. If no tank specified, returns the fluid level in the selected tank (using `selectTank()`).

- `tankSpace([tank:number]):number`

    Returns the remaining fluid capacity (empty space) in the specified tank. If not tank specified, returns the  remaining capacity in the selected tank. 

- `compareFluidTo(tank:number):boolean`

    Tests whether the fluid in the selected tank (in the robot inventory) is the same as in the specified tank (requires [[item:tank_upgrade|Tank upgrade]]).

- `transferFluidTo(tank:number[, count:number]):boolean`

    Transfer the specified amount of fluid in the selected tank into the specified tank. If no volume is specified, the  robot will attempt to transfer 1000mB.

## External Inventory Methods

- `detect(side:number):boolean`

    Detects the block on the given side, relative to the robot, and
    returns whether or not the robot can move into the block, as well as
    a general description of the block. Returns `true` if the block will
    prevent the robot from moving forward, `false` otherwise. Drones
    return `true` even if the block is passable.

    **side** - See the [Sides API](/api/sides) for a list of possible sides.

- `compareFluid(side:number):boolean`

    Compares fluid in the selected
    tank (requires a [[item:tank_upgrade|Tank upgrade]]) to fluid
    in the world or in an external tank on the specified side of the
    robot.

- `drain(side:number[, count:number]):boolean`

    Extracts the specified amount of fluid from the world or a tank on
    the specified side of the robot. If no amount is specified, the
    robot will try to drain 1000mB. If the tank is unable to store the
    specified amount of fluid, the operation will fail (no fluid is lost
    in the process).

- `fill(side:number[, count:number]):boolean`

    Fills the specified amount of fluid from the selected tank (requires
    a [[item:tank_upgrade|Tank upgrade]]) into the world or a tank
    in front of the robot. If no amount is specified, the robot will try
    to fill the target tank with 1000mB of fluid. If there is not enough
    fluid to fill a block, or not enough space in the target tank, the
    operation will fail with no fluids lost.
    
- `compare(side:number[, fuzzy:boolean=false]):boolean`

    Compares the block on the specified side of the robot with the item in the currently selected slot and returns whether they are the same or not. Blocks are considered identical if the type and metadata match; additional ItemStack information is not checked. Empty blocks are considered as air blocks, which cannot be compared to an empty inventory slot; the `detect()` function can be used to determine if there is a block in front of the robot. For blocks that drop a different item, the `compare()` method won't work (eg: Diamond block dropping diamond items); for these cases, use silk-touch to obtain a block for comparison. 

- `drop(side:number[, count:number]):boolean`

    Drops the specified number of items from the currently selected slot. Returns `true` if at least one item is dropped, `false` otherwise. If the block in front of the robot is an inventory, the robot will try to place the item into the inventory. If the inventory doesn't accept the item, the item is not dropped into the world (the operation will fail and return `false`). Robots themselves are considered blocks with an inventory, and items can be moved into them using the `drop()` function. The `drop()` function will not work on non-item inventories, such as fluid tanks (the `use()` function works for these cases). 

- `suck(side:number[, count:number]):boolean`

    Tries to pick up the specified number of items and place it in the selected slot. If the selected slot is occupied, items will be placed in the first available slot. Returns the number of items sucked else false.