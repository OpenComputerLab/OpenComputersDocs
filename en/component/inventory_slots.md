### Slot Alignment

#### Internal versus External Slot Alignment

**Slot indexes do not match between the robot's internal and external
view of its inventory**

When a robot interacts with its own inventory it is using its internal
view. You access the inventory of another robot via its external view.

The reason for this distinction is to separate the two inventory spaces:
the main inventory and the tool belt inventory. Internally, the robot
selects slots only in its inventory space, and not its toolbelt. It can
`equip` or unequip items from its toolbelt. However, externally, an
observer interacts with a single inventory that includes both the
toolbelt as well as the main inventory.

#### Internal Robot Slot Alignment

The Robot's GUI displays the slots of a robot aligned from top-left to
bottom-right. So for example the slot at index 1 is displayed in the
top-left corner, the slot at index 2 is the next to the right and the
first slot on the 2nd row is index 5.

![robot_slotalign.png](/api/robot_slotalign.png)

These are the slot indexes a robot uses on it self (for its own main
inventory, an interview view).

How many slots a robot has available depends on it's setup. If a slot
is specified in a function that exceeds the amount of slots a robot has
available an error is thrown.

The robot can `select`, `place`, `drop`, `compare` (etc) items
from its main inventory using these slot indexes as they represent the
internal perspective of its inventory.

#### External View of a Robot Inventory

Slot indexes of a robot's inventory to an outside observer will be
offset by 4. To an outside observer, slots 1 through 4 refer to slots in
the robot toolbelt. The first slot of the main inventory is slot 1 from
inside the robot (internal view), but is thus slot 5 to an outside
observer. Yes, this can be confusing at first. This design choice was
made so that, to an outside observer, [slot 1] always indicated the
first toolbelt slot regardless of the robot inventory size, and [slot
5] was always the first main inventory slot.

The robot inventory, again to an external observer, is sided inventory.
The robot will not share all its inventory to all sides. Slot indexes
**do not** change to these different sides. Slot 1, therefore, always
refers to the first toolbelt slot, even when inaccessible to a side.

- From its left side it share nothing. - From its right side it shares
only its toolbelt slots (1-5) - From all other sides it shares only its
main inventory slots (5-n)
