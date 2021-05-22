# Component: Modem

This component is provided by [network cards](/item/network_card).
Wireless network cards behave much like normal network cards, but
additionally send the message as a wireless "packet" when a strength
is set. The modem's address must be used for networking. It can be
found through component.modem.address.

Component name: `modem`. Callbacks:

- `isWireless(): boolean`

      Returns whether this modem is capable of sending wireless messages.

- `maxPacketSize(): number`

      Returns the maximum packet size for sending messages via network
      cards. Defaults to 8192. You can change this in the OpenComputers
      configuration file.
      Every value in a message adds two bytes of overhead. (Even if
      there's only one value.)
      Numbers add another 8 bytes, true/false/nil another 4 bytes, and
      strings exactly as many bytes as the string contains---though
      empty strings still count as one byte.
      Examples:

      -   `"foo"` is a 5-byte packet; two bytes of overhead and a three
          byte string.
      -   `"currentStatus",300` is a 25-byte packet; four bytes overhead,
          a 13-byte string, and 8 bytes for a number.

- `isOpen(port: number): boolean`

      Returns whether the specified "port" is currently being listened
      on. Messages only trigger signals when they arrive on a port that is
      open.

- `open(port: number): boolean`

      Opens the specified port number for listening. Returns `true` if the
      port was opened, `false` if it was already open. **Note: maximum
      port is 65535**

- `close([port: number]): boolean`

      Closes the specified port (default: all ports). Returns true if
      ports were closed.

- `send(address: string, port: number[, ...]): boolean`

      Sends a network message to the specified address. Returns `true` if
      the message was sent. This does *not* mean the message was received,
      only that it was sent. No port-sniffing for you.
      Any additional arguments are passed along as data. These arguments
      must be basic types: nil, boolean, number and string values are
      supported, tables and functions are not. See
      [[api:serialization|the serialization API]] for serialization
      of tables.
      The number of additional arguments is limited. The default limit
      is 8. It can be changed in the OpenComputers configuration file, but
      this is //not// recommended; higher limits can allow relatively weak
      computers to break relatively strong ones with no defense possible,
      while lower limits will prevent some protocols from working.

- `broadcast(port: number, ...): boolean`

      Sends a broadcast message. This message is delivered to all
      reachable network cards. Returns `true` if the message was sent.
      Note that broadcast messages are *not* delivered to the modem that
      sent the message.
      All additional arguments are passed along as data. See `send`.

- `getStrength(): number`

      The current signal strength to apply when sending messages.
      //Wireless network cards only.//

- `setStrength(value: number): number`

      Sets the signal strength. If this is set to a value larger than
      zero, sending a message will also generate a wireless message. The
      higher the signal strength the more energy is required to send
      messages, though. //Wireless network cards only.//

- `getWakeMessage():string`

      Gets the current wake-up message. When the network card detects the
      wake message (a string in the first argument of a network packet),
      on any port and the machine is off, the machine is started. Works
      for robots, cases, servers, drones, and tablets.
      [[component:tunnel|Linked Cards]] provide this same
      functionality.

- `setWakeMessage(message: string, [fuzzy: boolean]):string`

      Sets the wake-up message to the specified **string**. The message
      matching can be fuzzy (default is false). A fuzzy match ignores
      additional trailing arguments in the network packet.

This component generates a signal named `modem_message` if a message
from another network card is received. It has the signature
`localAddress: string, remoteAddress: string, port: number, distance:
number, ...`.

- `localAddress` is the address of the modem component the message
was

      received by.

- `remoteAddress` is the address of the network card the message was

      sent from.

- `port` is the port number the message was delivered to. -
`distance` is the distance to the modem that sent the message. This

      is only set for wireless messages. For normal messages this is
      always 0.

- All further values are values passed along by the sender (i.e. the

      `...` in `send` and `broadcast`).

Example use:

``` local component = require("component") local event =
require("event") local m = component.modem -- get primary modem
component m.open(123) print(m.isOpen(123)) -- true -- Send some
message. m.broadcast(123, "this is a test") -- Wait for a message
from another network card. local _, _, from, port, _, message =
event.pull("modem_message") print("Got a message from " .. from ..
" on port " .. port .. ": " .. tostring(message)) ```

------------------------------------------------------------------------

# Component: Modem

This component is provided by [network cards](/item/network_card).
Wireless network cards behave much like normal network cards, but
additionally send the message as a wireless "packet" when a strength
is set. The modem's address must be used for networking. It can be
found through component.modem.address.

Component name: `modem`. Callbacks:

- `isWireless(): boolean`

      Returns whether this modem is capable of sending wireless messages.

- `maxPacketSize(): number`

      Returns the maximum packet size for sending messages via network
      cards. Defaults to 8192. You can change this in the OpenComputers
      configuration file.
      Every value in a message adds two bytes of overhead. (Even if
      there's only one value.)
      Numbers add another 8 bytes, true/false/nil another 4 bytes, and
      strings exactly as many bytes as the string contains---though
      empty strings still count as one byte.
      Examples:

      -   `"foo"` is a 5-byte packet; two bytes of overhead and a three
          byte string.
      -   `"currentStatus",300` is a 25-byte packet; four bytes overhead,
          a 13-byte string, and 8 bytes for a number.

- `isOpen(port: number): boolean`

      Returns whether the specified "port" is currently being listened
      on. Messages only trigger signals when they arrive on a port that is
      open.

- `open(port: number): boolean`

      Opens the specified port number for listening. Returns `true` if the
      port was opened, `false` if it was already open. **Note: maximum
      port is 65535**

- `close([port: number]): boolean`

      Closes the specified port (default: all ports). Returns true if
      ports were closed.

- `send(address: string, port: number[, ...]): boolean`

      Sends a network message to the specified address. Returns `true` if
      the message was sent. This does *not* mean the message was received,
      only that it was sent. No port-sniffing for you.
      Any additional arguments are passed along as data. These arguments
      must be basic types: nil, boolean, number and string values are
      supported, tables and functions are not. See
      [[api:serialization|the serialization API]] for serialization
      of tables.
      The number of additional arguments is limited. The default limit
      is 8. It can be changed in the OpenComputers configuration file, but
      this is //not// recommended; higher limits can allow relatively weak
      computers to break relatively strong ones with no defense possible,
      while lower limits will prevent some protocols from working.

- `broadcast(port: number, ...): boolean`

      Sends a broadcast message. This message is delivered to all
      reachable network cards. Returns `true` if the message was sent.
      Note that broadcast messages are *not* delivered to the modem that
      sent the message.
      All additional arguments are passed along as data. See `send`.

- `getStrength(): number`

      The current signal strength to apply when sending messages.
      //Wireless network cards only.//

- `setStrength(value: number): number`

      Sets the signal strength. If this is set to a value larger than
      zero, sending a message will also generate a wireless message. The
      higher the signal strength the more energy is required to send
      messages, though. //Wireless network cards only.//

- `getWakeMessage():string`

      Gets the current wake-up message. When the network card detects the
      wake message (a string in the first argument of a network packet),
      on any port and the machine is off, the machine is started. Works
      for robots, cases, servers, drones, and tablets.
      [[component:tunnel|Linked Cards]] provide this same
      functionality.

- `setWakeMessage(message: string, [fuzzy: boolean]):string`

      Sets the wake-up message to the specified **string**. The message
      matching can be fuzzy (default is false). A fuzzy match ignores
      additional trailing arguments in the network packet.

This component generates a signal named `modem_message` if a message
from another network card is received. It has the signature
`localAddress: string, remoteAddress: string, port: number, distance:
number, ...`.

- `localAddress` is the address of the modem component the message
was

      received by.

- `remoteAddress` is the address of the network card the message was

      sent from.

- `port` is the port number the message was delivered to. -
`distance` is the distance to the modem that sent the message. This

      is only set for wireless messages. For normal messages this is
      always 0.

- All further values are values passed along by the sender (i.e. the

      `...` in `send` and `broadcast`).

Example use:

``` local component = require("component") local event =
require("event") local m = component.modem -- get primary modem
component m.open(123) print(m.isOpen(123)) -- true -- Send some
message. m.broadcast(123, "this is a test") -- Wait for a message
from another network card. local _, _, from, port, _, message =
event.pull("modem_message") print("Got a message from " .. from ..
" on port " .. port .. ": " .. tostring(message)) ```

------------------------------------------------------------------------
