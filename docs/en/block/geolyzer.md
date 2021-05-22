# Geolyzer

![](/blocks/geolyzer.png){width="128"}

**Provides:** [Geolyzer Component API](/component/geolyzer)

This block allows scanning its surroundings for the hardness of blocks.
It's vertical range is 32 blocks up and down, so a column of height 64
in total. It operates in "columns", e.g. when scanning at the relative
coordinates (0, 0) it will scan the blocks 32 below and above (and
including) the geolyzer block.

The returned values are (with some noise) the hardness values of the
scanned blocks. This is useful for detecting ores (which are usually
harder than stone) and for generating 'maps' that can be displayed on
the [Hologram Projector](Hologram Projector).

*Since version 1.3.*

The Geolyzer is crafted using the following recipe:

- 4 x Gold ingot - 2 x Eye of Ender - 1 x Compass - 1 x [Microchip
(Tier 2)](/item/materials) - 1 x [Printed Circuit
Board](/item/materials)

![](/recipes/blocks/geolyzer.png){width="200"}

# Tips

Even though the Geolyzer uses relative coordinates, it is still possible
to get global coordinates of scans by using a bit of simple math.

The "noise" added to scanned areas is increased based off of distance
from device. It is theoretically possible to eliminate this noise by
scanning repeatedly and finding an average. (Unconfirmed, needs further
testing.)

## Contents

# Geolyzer

![](/blocks/geolyzer.png){width="128"}

**Provides:** [Geolyzer Component API](/component/geolyzer)

This block allows scanning its surroundings for the hardness of blocks.
It's vertical range is 32 blocks up and down, so a column of height 64
in total. It operates in "columns", e.g. when scanning at the relative
coordinates (0, 0) it will scan the blocks 32 below and above (and
including) the geolyzer block.

The returned values are (with some noise) the hardness values of the
scanned blocks. This is useful for detecting ores (which are usually
harder than stone) and for generating 'maps' that can be displayed on
the [Hologram Projector](Hologram Projector).

*Since version 1.3.*

The Geolyzer is crafted using the following recipe:

- 4 x Gold ingot - 2 x Eye of Ender - 1 x Compass - 1 x [Microchip
(Tier 2)](/item/materials) - 1 x [Printed Circuit
Board](/item/materials)

![](/recipes/blocks/geolyzer.png){width="200"}

# Tips

Even though the Geolyzer uses relative coordinates, it is still possible
to get global coordinates of scans by using a bit of simple math.

The "noise" added to scanned areas is increased based off of distance
from device. It is theoretically possible to eliminate this noise by
scanning repeatedly and finding an average. (Unconfirmed, needs further
testing.)

## Contents
