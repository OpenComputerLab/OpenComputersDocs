# Server Rack

![](/blocks/rack.png){width="128"}

The server rack houses up to four [Servers](/item/server). Servers are
basically computer cases in item format. Their main advantage is that
they can allow for multiple [Component Buses](/item/component_bus)
allowing more components to be controlled than via a normal computer.

The server rack also acts like a Power Distributor and Switch in one
block, including the built-in servers. Each server slot can be
configured to connect to one side directly, though, so the server in the
slot can be used to control external block components, such as the
[Redstone I/O](/block/redstone_io) block.

Server Racks can also house a [Terminal Server](/item/terminal_server),
which allows a [Remote Terminal](/item/terminal) to connect to the
server rack wirelessly. The Terminal Server must be attached to the same
side of the case as the server it controls, and is roughly equivalent to
a tier 2 screen and keyboard. It allows up to 4 Remote Terminals to
connect at a time.

The Server Rack GUI is composed of 3 sections. On the left are 4 slots
for components, the only valid components are Servers and Terminal
Servers.

In the middle are 5 vertical lines, corresponding to each side of the
rack except the front. A key for which line is which is present on the
right. When a server is inserted into a slot on the left, a 'primary'
node is added to each vertical line. Clicking on one of these nodes
connects the Server to the side of the case controlled by that line. If
the server has a [Network Card](/item/network_card) in it, a smaller
node is created under the primary node for each network card in the
server. Like the primary node, clicking on one of the smaller nodes
connects the network card to a side of the case. The network side allows
a server blade to send and receive modem messages through that side.

The single button on the Server Rack GUI connects and disconnects each
of the faces of the rack to each other. In other words, it enabled
"Relay Mode". When enabled (a horizontal line is drawn across the
boxes at the bottom of the vertical lines), modem messages and power
will pass through the rack - essentially, the rack acts like a cable.
When disabled, different networks on different sides of the rack will
remain isolated and no messages or power will pass through the rack.
Note that in relay mode a rack repeats modem messages and two relay
enabled racks in the same network will cause duplicate modem messages.

Servers inside the case can be accessed by right clicking on them in the
front of the Server Rack. This will open their component view, similar
to right clicking a normal computer case. To open the Rack GUI again,
right click on the side of the Server Rack, or above or below any
installed Servers.

Wired network messages can only be sent between Servers with Network
Cards. The Network Cards must be configured in the Server Rack GUI to
share a side. The side for a network card will also send and receive
modem messages to components connected to the rack on that same side. If
you want Server-Server internal networking, without cross-talk outside
the case, set the Network Cards to the case's unused side (as there are
5 valid sides, and a maximum of 4 servers, there is always an unused
side).

The Server Rack also has a Relay Mode which can be used using the
Enable/Disable button in the gui. When the rack is in relay mode it acts
like a [Relay](/block/switch) and repeats wired network packets to
external components that are connected to the rack block.

The Server rack is crafted using the following recipe:

- 2 x [Microchip (Tier 2)](/item/materials) - 1 x [Wireless Network
Card](/item/wireless_network_card) - 2 x Iron bars - 1 x
[Switch](/block/switch) - 1 x [Power
Distributor](/block/power_distributor) - 1 x [Printed Circuit
Board](/item/materials)

![](/recipes/blocks/serverrack.png){width="200"}

## Contents

# Server Rack

![](/blocks/rack.png){width="128"}

The server rack houses up to four [Servers](/item/server). Servers are
basically computer cases in item format. Their main advantage is that
they can allow for multiple [Component Buses](/item/component_bus)
allowing more components to be controlled than via a normal computer.

The server rack also acts like a Power Distributor and Switch in one
block, including the built-in servers. Each server slot can be
configured to connect to one side directly, though, so the server in the
slot can be used to control external block components, such as the
[Redstone I/O](/block/redstone_io) block.

Server Racks can also house a [Terminal Server](/item/terminal_server),
which allows a [Remote Terminal](/item/terminal) to connect to the
server rack wirelessly. The Terminal Server must be attached to the same
side of the case as the server it controls, and is roughly equivalent to
a tier 2 screen and keyboard. It allows up to 4 Remote Terminals to
connect at a time.

The Server Rack GUI is composed of 3 sections. On the left are 4 slots
for components, the only valid components are Servers and Terminal
Servers.

In the middle are 5 vertical lines, corresponding to each side of the
rack except the front. A key for which line is which is present on the
right. When a server is inserted into a slot on the left, a 'primary'
node is added to each vertical line. Clicking on one of these nodes
connects the Server to the side of the case controlled by that line. If
the server has a [Network Card](/item/network_card) in it, a smaller
node is created under the primary node for each network card in the
server. Like the primary node, clicking on one of the smaller nodes
connects the network card to a side of the case. The network side allows
a server blade to send and receive modem messages through that side.

The single button on the Server Rack GUI connects and disconnects each
of the faces of the rack to each other. In other words, it enabled
"Relay Mode". When enabled (a horizontal line is drawn across the
boxes at the bottom of the vertical lines), modem messages and power
will pass through the rack - essentially, the rack acts like a cable.
When disabled, different networks on different sides of the rack will
remain isolated and no messages or power will pass through the rack.
Note that in relay mode a rack repeats modem messages and two relay
enabled racks in the same network will cause duplicate modem messages.

Servers inside the case can be accessed by right clicking on them in the
front of the Server Rack. This will open their component view, similar
to right clicking a normal computer case. To open the Rack GUI again,
right click on the side of the Server Rack, or above or below any
installed Servers.

Wired network messages can only be sent between Servers with Network
Cards. The Network Cards must be configured in the Server Rack GUI to
share a side. The side for a network card will also send and receive
modem messages to components connected to the rack on that same side. If
you want Server-Server internal networking, without cross-talk outside
the case, set the Network Cards to the case's unused side (as there are
5 valid sides, and a maximum of 4 servers, there is always an unused
side).

The Server Rack also has a Relay Mode which can be used using the
Enable/Disable button in the gui. When the rack is in relay mode it acts
like a [Relay](/block/switch) and repeats wired network packets to
external components that are connected to the rack block.

The Server rack is crafted using the following recipe:

- 2 x [Microchip (Tier 2)](/item/materials) - 1 x [Wireless Network
Card](/item/wireless_network_card) - 2 x Iron bars - 1 x
[Switch](/block/switch) - 1 x [Power
Distributor](/block/power_distributor) - 1 x [Printed Circuit
Board](/item/materials)

![](/recipes/blocks/serverrack.png){width="200"}

## Contents
