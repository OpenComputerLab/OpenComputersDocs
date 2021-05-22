# Component: Elevator

This component can be accessed by connecting an Elevator Control to a
Computer.

Component name: `elevator`. Callbacks:

- `call(floor:number):boolean`

Tries to call the elevator to a certain floor. Returns `true` on
success, `false` and an error message otherwise.

- `isReady():boolean`

Returns `true` if the elevator can be called, `false` if it can not
(because it is already moving).

- `getLocalFloor():number`

Returns the number of the floor the currently accessed Elevator
Control is set to.

- `getElevatorFloor():number`

Returns the number of the floor the elevator is currently at. If the
elevator is moving, the function returns the destination floor as
its second argument.

- `doesFloorExist(floor:number):boolean`

Returns `true` if the floor exists and thus can be called; the
function returns `false` if the floor does not exist.

## Contents

# Component: Elevator

This component can be accessed by connecting an Elevator Control to a
Computer.

Component name: `elevator`. Callbacks:

- `call(floor:number):boolean`

Tries to call the elevator to a certain floor. Returns `true` on
success, `false` and an error message otherwise.

- `isReady():boolean`

Returns `true` if the elevator can be called, `false` if it can not
(because it is already moving).

- `getLocalFloor():number`

Returns the number of the floor the currently accessed Elevator
Control is set to.

- `getElevatorFloor():number`

Returns the number of the floor the elevator is currently at. If the
elevator is moving, the function returns the destination floor as
its second argument.

- `doesFloorExist(floor:number):boolean`

Returns `true` if the floor exists and thus can be called; the
function returns `false` if the floor does not exist.