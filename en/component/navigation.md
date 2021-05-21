# Component: Navigation

This is the component provided by the [Navigation
Upgrade](/item/navigation_upgrade).

Component name: `navigation`. Callbacks:

- `getPosition(): number, number, number or nil, string`

      Gets the current relative position of the robot. This is the
      position relative to the center of the map item that was used to
      craft the upgrade. Note that the upgrade can be re-crafted with
      another map to change it's point of reference. Returns `nil` and
      the string `out of range` if the robot is too far away from the
      point of reference (i.e. when it is out of bounds of the map that
      was used to craft the upgrade).

- `getFacing(): number`

      Gets the current facing of the robot, as one of the `sides`
      constants.

- `getRange(): number`

      Gets the effective range of the upgrade. If the absolute value of
      the relative X or Z coordinate becomes larger than this,
      `getPosition()` will fail.

- `findWaypoints(range: number): table` *****Note:** Requires version
1.5.9 of OpenComputers.***

      Finds all [[block:waypoint|waypoint blocks]] within the
      specified range.
      This returns a table that contains other tables. The top table has
      only numbered indices corresponding to each detected beacon. In each
      of this entries is another table, each row various aspects of the
      specified beacon: "position", "redstone", "label".

      -   position returns a table with numbered indices in which 1 is x,
          2 is y, and 3 is z. These numbers are the distance from the
          navigation component to the beacon in terms of block
          coordinates.
      -   redstone returns a single number that is the current strength of
          the redstone signal
      -   label returns a string that is the label of the beacon you can
          set by right clicking on it.

Below is an example of how the tables are set up. A single beacon's
results are shown. ^table: main  ||| | ^table: 1 ^ table:
position ^ 1: | number: x distance | |::: |::: ^ 2: | number: y
distance | |::: |::: ^ 3: | number: z distance | |::: ^ redstone
|| number: redstone strength || |::: ^ label || string: beacon
label ||

------------------------------------------------------------------------

# Component: Navigation

This is the component provided by the [Navigation
Upgrade](/item/navigation_upgrade).

Component name: `navigation`. Callbacks:

- `getPosition(): number, number, number or nil, string`

      Gets the current relative position of the robot. This is the
      position relative to the center of the map item that was used to
      craft the upgrade. Note that the upgrade can be re-crafted with
      another map to change it's point of reference. Returns `nil` and
      the string `out of range` if the robot is too far away from the
      point of reference (i.e. when it is out of bounds of the map that
      was used to craft the upgrade).

- `getFacing(): number`

      Gets the current facing of the robot, as one of the `sides`
      constants.

- `getRange(): number`

      Gets the effective range of the upgrade. If the absolute value of
      the relative X or Z coordinate becomes larger than this,
      `getPosition()` will fail.

- `findWaypoints(range: number): table` *****Note:** Requires version
1.5.9 of OpenComputers.***

      Finds all [[block:waypoint|waypoint blocks]] within the
      specified range.
      This returns a table that contains other tables. The top table has
      only numbered indices corresponding to each detected beacon. In each
      of this entries is another table, each row various aspects of the
      specified beacon: "position", "redstone", "label".

      -   position returns a table with numbered indices in which 1 is x,
          2 is y, and 3 is z. These numbers are the distance from the
          navigation component to the beacon in terms of block
          coordinates.
      -   redstone returns a single number that is the current strength of
          the redstone signal
      -   label returns a string that is the label of the beacon you can
          set by right clicking on it.

Below is an example of how the tables are set up. A single beacon's
results are shown. ^table: main  ||| | ^table: 1 ^ table:
position ^ 1: | number: x distance | |::: |::: ^ 2: | number: y
distance | |::: |::: ^ 3: | number: z distance | |::: ^ redstone
|| number: redstone strength || |::: ^ label || string: beacon
label ||

------------------------------------------------------------------------
