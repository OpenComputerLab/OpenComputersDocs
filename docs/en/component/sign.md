# Component: Sign

This is the component provided by the [Sign Upgrade](/item/sign_upgrade).

Component name: `sign`. Callbacks:

- `getValue(): string or nil, string`

    Gets the text currently displayed on the sign in front of the robot,
    or `nil` and an error message if there is no sign in front of the
    robot.

- `setValue(value: string): string or nil, string`

    Sets the text of the sign in front of the robot. Returns the new
    text on the sign (which may be a truncated version of the passed
    argument) or `nil` and an error message if there is no sign in front
    of the robot.
