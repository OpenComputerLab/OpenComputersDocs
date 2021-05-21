# Official documentation of OpenComputers

OpenComputers is a mod that adds computers and robots into the game,
which can be programmed in [Lua](http://www.lua.org/)
[5.3](http://www.lua.org/manual/5.3/manual.html). It takes ideas from a
couple of other mods such as ComputerCraft, StevesCarts and Modular
Powersuits to create something new and interesting.

- [Block and item documentation](/#contents)
- [Lua API documentation](api)
- [Component API documentation](component)
- [Tutorials](tutorial)
- [Getting started](/tutorial/oc1_basic_computer)
- [Homepage](http://oc.cil.li/)
- [Ingame manual as HTML](https://oc.shadowkat.net/)

## Connectivity

OpenComputers can connect to and interact with the outside Minecraft
world through several methods:

Most of OpenComputers' blocks can "see" and interact with other
OpenComputers Blocks automatically if placed right next to each other,
or you can use [Cables](/block/cable) to connect them over a distance.
It is also possible to connect - or separate - components logically by
using one of the various network cards or switches in both wired and/or
wireless form.

Blocks from Vanilla or other Mods can be connected via the [Redstone
Card](/item/redstone_card), the [Redstone I/O Block](/block/redstone_io)
or an [Adapter](/block/adapter). Many special Blocks from other mods are
already integrated into the Adapter, like Blocks from BuildCraft,
IndustrialCraft2 or Thermal Expansion, other mods authors can use the
Java API to add specific handling for their blocks as well.

[Robots](/block/robot) can interact with the world almost like a real
player can do. They can equip most tools, blocks or other items and can
be programmed to use them in every way you want them to. You can program
them to sort your inventory, go mining for your resources, have them
build a fortress for you or make them [sing](/api/note) and dance for
your entertainment. Only your imagination is the limit.

See the page on [component interaction](/component/component_access) to
learn how to communicate with components from Lua.

## Modularity

OpenComputers are built out of individual parts such as graphic cards,
hard drives or expansion cards, which allows to tailor each individual
computer exactly to your needs. You can save resources if you need
something small for small tasks, or spend even the last diamond on the
most expensive and powerful Minecraft computer ever built.

See the [block and item documentation](/#contents) for a list of
components that can be used to assemble your computer.

## Resource Limits

OpenComputers have a limited amount of disk space and RAM, which can be
configured in the OpenComputers config to your likings. This not only
makes OpenComputers very server friendly, it as well gives you a warm
feeling of nostalgia, back at a time where disk and RAM size was
measured in Kilo and Megabytes. However as programming in Lua is very
resource-friendly, you should be able to solve most tasks even on
mid-end OpenComputers. And if not you could always spend some diamonds
on even bigger RAM.

In addition to those intuitive limitations, OpenComputers has been
specifically designed to work flawlessly on servers: OpenComputers uses
a fixed number of low-priority threads for coroutines to cause as little
delay on the server tick as possible, in addition running programs are
forced to yield on a regular, configurable basis or - if for any reason
fail to do so - will crash (the in-game computer) forcefully to prevent
server lag by malicious or malfunctioning programs.

## Persistence

When OpenComputers leave the loaded Chunk area, they will be put on
hold, but automatically resume at the exact point they were stopped once
the Chunk is reloaded later. This makes OpenComputers very intuitive to
use in the Minecraft environment, as you do not have to worry about
chunk loading or resuming and do not need to add chunk loaders from
other mods just to keep those computers running.

To do so OpenComputers comes with a native library - the
[Eris](https://github.com/fnuecke/eris) library, specifically. This
includes the official Lua VM implementation, which is already capable to
support computers being put on pause temporarily. Currently the library
is included in the mod for Windows, Mac OS X, Linux and BSD, which are
*only* required to run on the server as all Lua code is executed
purely on the server. If the library is not available for your system,
the mod will fall back to LuaJ, a Java implementation of Lua, in which
case computers will *not* persist, and memory will *not* be limited.

## Power

Computers consume power while running based on what they are doing.
Beside a low base amount of power per tick consumed, components such as
graphic cards or wireless network cards will consume extra power based
on their work load. This is not only realistic, but as well encourages
players to optimize their code and to not keep an OpenComputers server
busy with unnecessary tasks. The exact power consumption can be
configured in the config file and even be completely removed if you wish
to run in a power-free environment.

OpenComputers mod provides electrostatic power generation with [Carpeted
Capacitor](/block/carpeted_capacitor) as well as with [Generator
Upgrade](/item/generator_upgrade) available to robots and [Solar
Generator Upgrade](/item/solar_generator_upgrade) available to robots
and microcontrollers. Opencomputers devices can also be powered with
energy equivalents of a [number of other
mods](crossmod_interoperation#power).

## Configurability

Almost every aspect of the mod can be tweaked via the configuration
file. Not a fan of computers requiring power to run? Set their running
cost to zero. Don't want power to play a role at all? Disable it
completely! Think robots move too slow? Make 'em faster. Want bigger
multi-block screens? Increase the maximum size. Just have a look at the
[default configuration
file](https://github.com/MightyPirates/OpenComputers/blob/master-MC1.7.10/src/main/resources/application.conf)
to see all the options.