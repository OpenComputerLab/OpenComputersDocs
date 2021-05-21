### InventoryController Trait API

- `inventorySize():number`

      Returns the size of the device's internal inventory.

- `select([slot:number]):number`

      Get the currently selected slot; set the selected slot if specified.

- `count([slot:number]):number`

      Get the number of items in the specified slot, otherwise in the
      selected slot.

- `space([slot:number]):number`

      Get the remaining space in the specified slot, otherwise in the
      selected slot.

- `compareTo(otherSlot:number):boolean`

      Compare the contents of the selected slot (in the robot inventory)
      to the contents of the specified slot (also in the robot inventory).

- `transferTo(toSlot:number[, amount:number]):boolean`

      Move the specified amount of items from the selected slot into the
      specified slot. If no amount is specified, the entire stack is moved
      to the target slot.

### WorldControl Trait API

- `detect(side:number):boolean`

      Detects the block on the given side, relative to the robot, and
      returns whether or not the robot can move into the block, as well as
      a general description of the block. Returns `true` if the block will
      prevent the robot from moving forward, `false` otherwise. Drones
      return `true` even if the block is passable.

**side** - See the [Sides API](/api/sides) for a list of possible sides.

### TankWorldControl Trait API

- `compareFluid(side:number):boolean` Compares fluid in the selected

      tank (requires a [[item:tank_upgrade|Tank upgrade]]) to fluid
      in the world or in an external tank on the specified side of the
      robot.

- `drain(side:number[, count:number]):boolean`

      Extracts the specified amount of fluid from the world or a tank on
      the specified side of the robot. If no amount is specified, the
      robot will try to drain 1000mB. If the tank is unable to store the
      specified amount of fluid, the operation will fail (no fluid is lost
      in the process).

- `fill(side:number[, count:number]):boolean`

      Fills the specified amount of fluid from the selected tank (requires
      a [[item:tank_upgrade|Tank upgrade]]) into the world or a tank
      in front of the robot. If no amount is specified, the robot will try
      to fill the target tank with 1000mB of fluid. If there is not enough
      fluid to fill a block, or not enough space in the target tank, the
      operation will fail with no fluids lost.

### Agent Trait API

- `name():string`

      Get the name of the robot.

- `swing(side:number):boolean[, string]`

      Lets the robot use the currently equipped item in the tool slot
      against the block or space directly in front of the robot. Returns
      `true` if successful (may take time depending on block being
      interacted with - e.g.. Obsidian takes time to mine). Returns
      `false` if the operation fails with a description of why it failed.

- `use(side: number[, sneaky: boolean[, duration: number]]):
boolean[, string]`

      Attempts to use the item currently equipped in the tool slot in the
      same way as if the player would make a right-click.
      **side** - if given the robot will try to 'right-click' only on
      the surface as specified by side, otherwise the robot will try all
      possible sides. See the [[api:sides|Sides API]] for a list of
      possible sides.
      **sneaky** - if set to `true` the robot will simulate a
      sneak-right-click (like if the player would be using shift during a
      right-click). Some items (like buckets) will behave differently if
      this is set to true.
      **duration** - how long the item is used. This is useful when using
      charging items like a bow.
      **Returns:** true if the robot could interact with the block or
      entity in front of it, false otherwise. If successful the secondary
      parameter describes what the robot interacted with and will be one
      of 'block_activated', 'item_placed', 'item_interacted' or
      'item_used'.
      This function has a very broad use as the robot can simulate
      right-clicks with most items. The only difference to players is that
      the robot cannot use items that specifically require the user to be
      an entity as the robot is a block. So drinking potions, eating food
      or throwing an ender pearl will fail.
      This functions secondary return value can be used to determine what
      the result of the right-click caused. Which of the item results is
      returned is not always obvious and requires some testing beforehand.
      Also note that while robots are not affected by harmful potions they
      can be destroyed by explosions, so be careful when you place, throw
      or activate any form of explosives with this function. Possible
      values for the second return value:

      -   `block_activated` - a block was activated (like levers, switches
          or doors).
      -   `item_interacted` - the equipped tool interacted with the world,
          for example sheers when used on a sheep.
      -   `item_placed` - something was placed into the world. This is not
          only caused by placeable blocks, but as well by items that cause
          blocks or entities to appear in the world (like flint and stone
          or mob eggs).
      -   `item_used` - the equi ====InventoryController Trait API====

- `inventorySize():number`

      Returns the size of the device's internal inventory.

- `select([slot:number]):number`

      Get the currently selected slot; set the selected slot if specified.

- `count([slot:number]):number`

      Get the number of items in the specified slot, otherwise in the
      selected slot.

- `space([slot:number]):number`

      Get the remaining space in the specified slot, otherwise in the
      selected slot.

- `compareTo(otherSlot:number):boolean`

      Compare the contents of the selected slot (in the robot inventory)
      to the contents of the specified slot (also in the robot inventory).

- `transferTo(toSlot:number[, amount:number]):boolean`

      Move the specified amount of items from the selected slot into the
      specified slot. If no amount is specified, the entire stack is moved
      to the target slot.

### WorldControl Trait API

- `detect(side:number):boolean`

      Detects the block on the given side, relative to the robot, and
      returns whether or not the robot can move into the block, as well as
      a general description of the block. Returns `true` if the block will
      prevent the robot from moving forward, `false` otherwise. Drones
      return `true` even if the block is passable.

**side** - See the [Sides API](/api/sides) for a list of possible sides.

### TankWorldControl Trait API

- `compareFluid(side:number):boolean` Compares fluid in the selected

      tank (requires a [[item:tank_upgrade|Tank upgrade]]) to fluid
      in the world or in an external tank on the specified side of the
      robot.

- `drain(side:number[, count:number]):boolean`

      Extracts the specified amount of fluid from the world or a tank on
      the specified side of the robot. If no amount is specified, the
      robot will try to drain 1000mB. If the tank is unable to store the
      specified amount of fluid, the operation will fail (no fluid is lost
      in the process).

- `fill(side:number[, count:number]):boolean`

      Fills the specified amount of fluid from the selected tank (requires
      a [[item:tank_upgrade|Tank upgrade]]) into the world or a tank
      in front of the robot. If no amount is specified, the robot will try
      to fill the target tank with 1000mB of fluid. If there is not enough
      fluid to fill a block, or not enough space in the target tank, the
      operation will fail with no fluids lost.

### Agent Trait API

- `name():string`

      Get the name of the robot.

- `swing(side:number):boolean[, string]`

      Lets the robot use the currently equipped item in the tool slot
      against the block or space directly in front of the robot. Returns
      `true` if successful (may take time depending on block being
      interacted with - e.g.. Obsidian takes time to mine). Returns
      `false` if the operation fails with a description of why it failed.

- `use(side: number[, sneaky: boolean[, duration: number]]):
boolean[, string]`

      Attempts to use the item currently equipped in the tool slot in the
      same way as if the player would make a right-click.
      **side** - if given the robot will try to 'right-click' only on
      the surface as specified by side, otherwise the robot will try all
      possible sides. See the [[api:sides|Sides API]] for a list of
      possible sides.
      **sneaky** - if set to `true` the robot will simulate a
      sneak-right-click (like if the player would be using shift during a
      right-click). Some items (like buckets) will behave differently if
      this is set to true.
      **duration** - how long the item is used. This is useful when using
      charging items like a bow.
      **Returns:** true if the robot could interact with the block or
      entity in front of it, false otherwise. If successful the secondary
      parameter describes what the robot interacted with and will be one
      of 'block_activated', 'item_placed', 'item_interacted' or
      'item_used'.
      This function has a very broad use as the robot can simulate
      right-clicks with most items. The only difference to players is that
      the robot cannot use items that specifically require the user to be
      an entity as the robot is a block. So drinking potions, eating food
      or throwing an ender pearl will fail.
      This functions secondary return value can be used to determine what
      the result of the right-click caused. Which of the item results is
      returned is not always obvious and requires some testing beforehand.
      Also note that while robots are not affected by harmful potions they
      can be destroyed by explosions, so be careful when you place, throw
      or activate any form of explosives with this function. Possible
      values for the second return value:
      -   `block_activated` - a block was activated (like levers, switches
          or doors).
      -   `item_interacted` - the equipped tool interacted with the world,
          for example sheers when used on a sheep.
      -   `item_placed` - something was placed into the world. This is not
          only caused by placeable blocks, but as well by items that cause
          blocks or entities to appear in the world (like flint and stone
          or mob eggs).
      -   `item_used` - the equi
