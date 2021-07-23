# Component: Microcontroller

This is the component provided by the [Microcontroller Case](/block/microcontroller).

These callbacks can only be called by the microcontroller itself, or its
direct neighbors (i.e. other computers that share a face with the
microcontroller). Note that since microcontrollers cannot access
external components they cannot interact with each others
microcontroller components, but a computer can access a neighbouring
microcontroller.

Component name: `microcontroller`. Callbacks:

- `setSideOpen(side: number, open: boolean): boolean`

    Set whether network messages are sent via the specified side.

- `start(): boolean`

    Starts the microcontroller. Returns true if the state changed.

- `isRunning(): boolean`

    Returns whether the microcontroller is running.

- `isSideOpen(side: number): boolean`

    Get whether network messages are sent via the specified side.

- `lastError(): string`

    Returns the reason the microcontroller crashed, if applicable.
    Returns nil if no crash has occurred.

- `stop(): boolean`

    Stops the microcontroller. Returns true if the state changed.
