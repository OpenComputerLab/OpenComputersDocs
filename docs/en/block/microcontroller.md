# Microcontroller

Microcontrollers are more restrictive versions of Computers. The key
limitation is that they do not contain a slot for a [Hard disk
drive](/item/hard_disk_drive), and rely solely on a programmed
[EEPROM](/item/eeprom) for specific functionality. They can **not**
interact with external components!

Microcontrollers can be built by placing a [Microcontroller
case](/item/microcontrollercase) in an [Assembler](/block/assembler).
Higher tier [Microcontroller cases](/item/microcontrollercase) can take
more components and upgrades (as well as higher tier components and
upgrades). Microcontrollers take a limited subset of upgrades, and do
not contain Upgrade or Card container slots. [Graphics
cards](/item/graphics_card) cannot be placed into the expansion slots
either.

MCUs do not automatically forward network messages. They do not
distribute power. Network messages arriving on all sides will always be
forwarded to the MCU. Which sides are used for sending can be controlled
via the `microcontroller` component. A computer can access its
external component if it is directly adjacent to the microcontroller.

The following code snippet illustrates one particular usage of
Microcontrollers. The program detects redstone signals (requires a
[redstone card](/item/redstone_card)), and uses a [piston
upgrade](/item/piston_upgrade) to push a block.

``` local r,p = component.proxy(component.list("redstone")()),
component.proxy(component.list("piston")())

while true do

      computer.pullSignal(0.5)
      if r.getInput(2) > 0 then
          p.push()
      end

end ```

## Contents

# Microcontroller

Microcontrollers are more restrictive versions of Computers. The key
limitation is that they do not contain a slot for a [Hard disk
drive](/item/hard_disk_drive), and rely solely on a programmed
[EEPROM](/item/eeprom) for specific functionality. They can **not**
interact with external components!

Microcontrollers can be built by placing a [Microcontroller
case](/item/microcontrollercase) in an [Assembler](/block/assembler).
Higher tier [Microcontroller cases](/item/microcontrollercase) can take
more components and upgrades (as well as higher tier components and
upgrades). Microcontrollers take a limited subset of upgrades, and do
not contain Upgrade or Card container slots. [Graphics
cards](/item/graphics_card) cannot be placed into the expansion slots
either.

MCUs do not automatically forward network messages. They do not
distribute power. Network messages arriving on all sides will always be
forwarded to the MCU. Which sides are used for sending can be controlled
via the `microcontroller` component. A computer can access its
external component if it is directly adjacent to the microcontroller.

The following code snippet illustrates one particular usage of
Microcontrollers. The program detects redstone signals (requires a
[redstone card](/item/redstone_card)), and uses a [piston
upgrade](/item/piston_upgrade) to push a block.

``` local r,p = component.proxy(component.list("redstone")()),
component.proxy(component.list("piston")())

while true do

      computer.pullSignal(0.5)
      if r.getInput(2) > 0 then
          p.push()
      end

end ```

## Contents
