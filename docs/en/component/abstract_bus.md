# Component: Abstract Bus

This card allows for interfacing with [Stargate Tech
2](<http://stargatetech.theender.net/miscellaneous/home.html>)'s
Abstract Bus system.

Component name: `abstract_bus`. Callbacks:

- `getEnabled(): boolean`

    Returns whether the local bus interface is enabled.

- `setEnabled(enabled: boolean)`

    Sets whether the local bus interface should be enabled

- `getAddress(): number`

    Returns the local interface address. `number` is a 16 bit
    hexadecimal number (0xFFFF being a broadcast). Returns `0` if an
    address has not yet been set.

- `setAddress(address: number)`

    Sets the local interface address. `number` is a 16bit hexadecimal
    number.

- `scan(mask: number): table`

    Scans the abstract bus for attached devices and returns them in a
    list.

- `send(address: number, data: table): boolean`

    Sends data across the abstract bus. The table `data` is in the form
    of key-value pairs, e.g.
        lua> component.abstract_bus.send(0xFFFF, { ["action"]="dial", ["address"]="Losomdeh Salothirt Erpac" })
    See SGTech2 documentation for more info on the Abstract Bus.

- `maxPacketSize(): number`

    Returns the maximum size a packet can be sent over the bus.

The abstract bus generates a signal named `bus_message` if a message
is received. See the [signals reference](signals).