# World Sensor

This component is provided by the
[World Sensor Upgrade](/item/world_sensor_upgrade).

Component name: `world_sensor`.

Callbacks:

- `isGasPresent(gas:string):boolean`

    Gets whether the world the device is currently in has the specified
    gas.

- `getGravity():number`

    Gets the gravity of the world that the device is currently in.

- ` hasBreathableAtmosphere():boolean`

    Gets whether the world that the device is in has a breathable
    atmosphere.

- `getWindLevel():number`

    Gets the wind level of the world that the device is currently in.