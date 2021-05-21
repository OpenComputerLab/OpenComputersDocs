# EEPROM

![](https://ocdoc.cil.li/_media/items:eeprom.png)

**Provides:** [EEPROM](/component/eeprom) component.

The EEPROM stores up to 4KiB of plain binary data and is used by an
architecture to boot a computer. For example, the Lua architecture
expects this to contain a script that is run as the first thing when the
computer is powered up. The default Lua BIOS (which can be crafted) will
look for file systems containing an `init.lua` file and run that.
Custom BIOSes could be written that boot off of network devices, for
example.

The EEPROM is crafted using the following recipe:

- 4 x Gold nugget/oreberry (with Tinker's Construct)
- 1 x Redstone Torch
- 2 x Paper
- 1 x [Transistor](/item/materials)
- 1 x [Microchip (Tier 1)](/item/materials)

![](https://ocdoc.cil.li/_media/recipes:items:eeprom.png)

The EEPROM (Lua BIOS) is crafted using the following recipe:

- 1 x EEPROM
- 1 x [OpenComputers Manual](/item/manual)