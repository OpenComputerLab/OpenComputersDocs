# Component: Access Point

This component is provided by the [access point](/block/access_point) to
allow computers to change the strength of the signal used to relay
wireless messages.

Component name: `access_point`. Callbacks:

- `getStrength():number`

    Get the signal strength (range) used when relaying messages.

- `setStrength(strength:number):number`

    Set the signal strength (range) used when relaying messages.

- `isRepeater():boolean`

    Check whether Access Point is acting as a repeater (re-send received
    wireless messages).

- `setRepeater(enabled:boolean):boolean`

    Sets whether Access Point should act as a repeater (re-send received
    wireless messages).