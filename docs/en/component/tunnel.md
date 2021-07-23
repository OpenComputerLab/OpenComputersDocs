# Component: Tunnel

This component is provided by the [linked card](/item/linked_card).

This card is similar to the [network card's component](/component/modem), but
as it is only point-to-point, no ports
can be configured, and the connection is always open.

Component name: `tunnel`. Callbacks:

- `send(data...)`

    Sends the specified data to the card this one is linked to.

- `maxPacketSize():number`

    Gets the maximum packet size (config setting).

- `getChannel():string`

    Gets the tunnel address of the link card. This is also available in
    `linkChannel` using an inventory controller and getting the stack
    from an inventory slot.

- `getWakeMessage():string`

    Gets the current wake-up message. When the network card detects the
    wake message (a string in the first argument of a network packet),
    on any port and the machine is off, the machine is started. This is
    the same functionality also provided by robots, cases, servers,
    drones, and tablets.

- `setWakeMessage(message: string, [fuzzy: boolean]):string`

    Sets the wake-up message to the specified **string**. The message
    matching can be fuzzy (default is false). A fuzzy match ignores
    additional trailing arguments in the network packet.

This card generates `modem_message` signals of the same format network
cards do.