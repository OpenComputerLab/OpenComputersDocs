# Nanomachines

**Nanomachines** are a configurable buff system. Using energy as a
resource, they are able to apply various positive and negative effects
to the player.

#### Basic Usage

The player has to "eat" them before they can be used. Once ingested, a
power indicator in the HUD, positioned left of the item bar, will
indicate how much energy the nanomachines have left. Their energy can be
recharged by standing close to a [Charger](/block/Charger). Energy is
slowly used over time proportional to the number of active inputs. A
small amount of energy is still lost over time even when all inputs are
deactivated.

They provide a certain number of "inputs" that can be toggled, causing
many different effects on the player, ranging from visual effects such
as particles spawning near the player, to select potion effects and some
more rare and special behaviors.

Which input triggers what effect depends on the current configuration of
the nanomachines, the actual "connections" being random per
configuration. Which input does what is not clear to the player until
they try it. The configuration can be changed by ingesting a new batch
of nanomachines. Additionally, enabling too many inputs at a time has
severe negative effects.

See the `nanomachines` section in the config for fine tuning to your
preference.

To dispose of nanomachines, the player has to drink [Grog](/item/Grog).

#### Crafting

Nanomachines are crafted using the following recipe:

- 4 [materials#Chamelium](/item/materials#Chamelium) - 1
[Wireless Network Card](Wireless Network Card) - 1 [Tier 2
CPU](/item/cpu) - 1 [Grog](/item/Grog) - 1 [Tier 1 RAM](/item/ram) - 1
[Capacitor](/block/Capacitor)

#### Programming

Programming the machines happens through wireless messages. The range
nanomachines are able to receive messages from is only about two meters,
though this can be circumvented easily by using a tablet to send the
messages. However, the nanomachines do not check which device sent the
messages they receive.

Nanomachines react to a simple, proprietary protocol: each packet must
consist of multiple parts, the first of which is the "header" and must
equal the string `nanomachines`. The second part must be the command
name. Additional parts are parameters for the command. The following
commands are available, formatted as `commandName(arg1, ...)`:

- `setResponsePort(port:number)` - Set the port nanomachines should

      send response messages to, for commands that have a response.

- `getPowerState()` - Request the currently stored and maximum stored

      energy of the nanomachines.

- `getHealth()` - Request the player's health state. -
`getHunger()` - Request the player's hunger state. - `getAge()` -
Request the player's age in seconds. - `getName()` - Request the
player's display name. - `getExperience()` - Request the player's
experience level. - `getTotalInputCount()` - Request the total number
of available

      inputs.

- `getSafeActiveInputs()` - Request the number of *safe* active

      inputs.

- `getMaxActiveInputs()` - Request the number of *maximum* active

      inputs.

- `getInput(index:number)` - Request the current state of the input

      with the specified index.

- `setInput(index:number, value:boolean)` - Set the state of the
input

      with the specified index to the specified value.

- `getActiveEffects()` - Request a list of active effects. Note that

      some effects may not show up in this list.

- `saveConfiguration()` - Requires a set of nanomachines in the

      players inventory, will store the current configuration to it.

For example, in OpenOS:

- `component.modem.broadcast(1, "nanomachines", "setInput", 1,
true)`

      will enable the first input.

- `component.modem.broadcast(1, "nanomachines", "getHealth")`
will get

      the player's health info.

#### See also

[Nanomachines Preview](https://www.youtube.com/watch?v=gl3zGcTh67w)
(slightly outdated)

## Contents

# Nanomachines

**Nanomachines** are a configurable buff system. Using energy as a
resource, they are able to apply various positive and negative effects
to the player.

#### Basic Usage

The player has to "eat" them before they can be used. Once ingested, a
power indicator in the HUD, positioned left of the item bar, will
indicate how much energy the nanomachines have left. Their energy can be
recharged by standing close to a [Charger](/block/Charger). Energy is
slowly used over time proportional to the number of active inputs. A
small amount of energy is still lost over time even when all inputs are
deactivated.

They provide a certain number of "inputs" that can be toggled, causing
many different effects on the player, ranging from visual effects such
as particles spawning near the player, to select potion effects and some
more rare and special behaviors.

Which input triggers what effect depends on the current configuration of
the nanomachines, the actual "connections" being random per
configuration. Which input does what is not clear to the player until
they try it. The configuration can be changed by ingesting a new batch
of nanomachines. Additionally, enabling too many inputs at a time has
severe negative effects.

See the `nanomachines` section in the config for fine tuning to your
preference.

To dispose of nanomachines, the player has to drink [Grog](/item/Grog).

#### Crafting

Nanomachines are crafted using the following recipe:

- 4 [materials#Chamelium](/item/materials#Chamelium) - 1
[Wireless Network Card](Wireless Network Card) - 1 [Tier 2
CPU](/item/cpu) - 1 [Grog](/item/Grog) - 1 [Tier 1 RAM](/item/ram) - 1
[Capacitor](/block/Capacitor)

#### Programming

Programming the machines happens through wireless messages. The range
nanomachines are able to receive messages from is only about two meters,
though this can be circumvented easily by using a tablet to send the
messages. However, the nanomachines do not check which device sent the
messages they receive.

Nanomachines react to a simple, proprietary protocol: each packet must
consist of multiple parts, the first of which is the "header" and must
equal the string `nanomachines`. The second part must be the command
name. Additional parts are parameters for the command. The following
commands are available, formatted as `commandName(arg1, ...)`:

- `setResponsePort(port:number)` - Set the port nanomachines should

      send response messages to, for commands that have a response.

- `getPowerState()` - Request the currently stored and maximum stored

      energy of the nanomachines.

- `getHealth()` - Request the player's health state. -
`getHunger()` - Request the player's hunger state. - `getAge()` -
Request the player's age in seconds. - `getName()` - Request the
player's display name. - `getExperience()` - Request the player's
experience level. - `getTotalInputCount()` - Request the total number
of available

      inputs.

- `getSafeActiveInputs()` - Request the number of *safe* active

      inputs.

- `getMaxActiveInputs()` - Request the number of *maximum* active

      inputs.

- `getInput(index:number)` - Request the current state of the input

      with the specified index.

- `setInput(index:number, value:boolean)` - Set the state of the
input

      with the specified index to the specified value.

- `getActiveEffects()` - Request a list of active effects. Note that

      some effects may not show up in this list.

- `saveConfiguration()` - Requires a set of nanomachines in the

      players inventory, will store the current configuration to it.

For example, in OpenOS:

- `component.modem.broadcast(1, "nanomachines", "setInput", 1,
true)`

      will enable the first input.

- `component.modem.broadcast(1, "nanomachines", "getHealth")`
will get

      the player's health info.

#### See also

[Nanomachines Preview](https://www.youtube.com/watch?v=gl3zGcTh67w)
(slightly outdated)

## Contents
