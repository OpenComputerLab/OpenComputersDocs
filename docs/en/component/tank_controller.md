# Component: Tank Controller

**Component name:** `tank_controller`

This component is provided by the [tank controller
upgrade](/item/tank_controller_upgrade).

With this API the robot can store fluids, "suck" fluids, and "drop"
fluids to and from tanks and the world. It also allows the robot to
receive additional information about fluid containers in the robot's
inventory, as well as inspecting fluid stacks.

Callbacks:

- `getTankCapacity(side:number):number or nil[, string]`

    Get the capacity of the tank on the specified side of the robot.
    Back refers to the robot's own selected tank.

- `getTankLevel(side:number):number or nil[,string]`

    Gets amount of fluid in tank on specified side.

- `getFluidInTank(side:number):table`

    Get a description of the fluid in the the tank on the specified side
    of the robot.
    
    **Note:** sides.back deprecated, use `getFluidInInternalTank()`

- `getFluidInInternalTank(slot):table` Get a description of fluid in

    the specified or selected slot of robot inventory.

- `drain([amount:number]):boolean`

    Transfers fluid from a tank in the selected inventory slot to the
    selected tank. If the amount of fluid that would be generated from
    the item is too large to fit into the tank (for example buckets will
    usually generate 1000) nothing will happen, that is no fluid is
    lost.

- `fill([amount:number]):boolean`

    Transfers fluid from the selected tank to a tank in the selected
    inventory slot. If the specified amount is too low (for example for
    buckets the minimum amount will usually be 1000) nothing will
    happen, that is no fluid is lost.

- `getTankCapacityInSlot(slot:number):number`

    Gets capacity of tank in specified or selected slot of the robot
    inventory.

- `getTankLevelInSlot(slot:number):number`

    Gets amount of fluid tank item in specified or selected slot of the
    robot inventory.

- `getFluidInTankInSlot(slot:number):table`

    Gets description of fluid in tank item in the specified or selected
    slot of the robot inventory.