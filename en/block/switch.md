# Relay

![](/blocks/switch.png){width="128"}

The Relay allows connecting different networks to each other. Only
network messages will be passed along, components will not be visible
through this. Use this to separate networks while still allowing
communication using Network Cards. The reasoning is the same as for the
[power distributor](/block/power_distributor) not connecting its
adjacent networks: you may often wish to keep your sub-networks
separate. This allows computers in different sub-networks to communicate
without having to go all out and use wireless networks.

Note that relays have a limited bandwidth. They will only transfer one
packet per 5 ticks (250ms) and their internal queue is limited to 20
packets. If you exceed this limit you will experience dropped packets.
Also note that packets can be relayed no more than 5 times. After that
the packet is dropped.

Relays will not route packets back where they came from, but it is still
possible to generate loops where packets will then arrive multiple
times, so keep that in mind.

A Wireless or Linked Relay may be created by first right-clicking on the
Relay, and inserting a Wireless or Linked Card into the resultant GUI.

The Relay block also serves as a ComputerCraft peripheral, providing an
interface imitating that of ComputerCraft's (wired) modems. It will
forward network messages sent from ComputerCraft to the OpenComputers
side, which can be received if a [network card](/item/lan_card) is
installed. It will also receive OpenComputers' network messages and
push a corresponding signal in CC computers attached to the adapter.
Note that network messages in OpenComputers do not require a "response
port" like ComputerCraft does. If the first argument for the network
message is a number, it will be interpreted as the response port to tell
ComputerCraft receivers, otherwise the response port will be set to
`-1`. *Note*: this functionality was available via the Adapter block
before 1.1.0.

The Relay is crafted using the following recipe:

- 3 x [Cable](/block/cable) - 4 x Iron Ingot - 1 x [Network
Card](/item/network_card) - 1 x [Printed Circuit Board](/item/materials)

![](/recipes/blocks/switch.png){width="200"}

## Contents

# Relay

![](/blocks/switch.png){width="128"}

The Relay allows connecting different networks to each other. Only
network messages will be passed along, components will not be visible
through this. Use this to separate networks while still allowing
communication using Network Cards. The reasoning is the same as for the
[power distributor](/block/power_distributor) not connecting its
adjacent networks: you may often wish to keep your sub-networks
separate. This allows computers in different sub-networks to communicate
without having to go all out and use wireless networks.

Note that relays have a limited bandwidth. They will only transfer one
packet per 5 ticks (250ms) and their internal queue is limited to 20
packets. If you exceed this limit you will experience dropped packets.
Also note that packets can be relayed no more than 5 times. After that
the packet is dropped.

Relays will not route packets back where they came from, but it is still
possible to generate loops where packets will then arrive multiple
times, so keep that in mind.

A Wireless or Linked Relay may be created by first right-clicking on the
Relay, and inserting a Wireless or Linked Card into the resultant GUI.

The Relay block also serves as a ComputerCraft peripheral, providing an
interface imitating that of ComputerCraft's (wired) modems. It will
forward network messages sent from ComputerCraft to the OpenComputers
side, which can be received if a [network card](/item/lan_card) is
installed. It will also receive OpenComputers' network messages and
push a corresponding signal in CC computers attached to the adapter.
Note that network messages in OpenComputers do not require a "response
port" like ComputerCraft does. If the first argument for the network
message is a number, it will be interpreted as the response port to tell
ComputerCraft receivers, otherwise the response port will be set to
`-1`. *Note*: this functionality was available via the Adapter block
before 1.1.0.

The Relay is crafted using the following recipe:

- 3 x [Cable](/block/cable) - 4 x Iron Ingot - 1 x [Network
Card](/item/network_card) - 1 x [Printed Circuit Board](/item/materials)

![](/recipes/blocks/switch.png){width="200"}

## Contents
