# Component: Motion Sensor

This is the component provided by the [Motion
Sensor](/block/motion_sensor). When an entity within line of sight of
the [Motion Sensor](/block/motion_sensor) moves faster than the
threshold a [motion](/component/signals#motion_sensor_block) event is
queued. The sensor has a radius limit of 8 and is updated every half
second.

Component name: `motion_sensor`. Callbacks:

- `getSensitivity(): number`

      Gets the current sensitivity of the sensor, i.e. at which speed
      threshold of distance / second it triggers.

- `setSensitivity(value: number): number`

      Sets the sensor's sensitivity to the specified value, returns the
      old value.

------------------------------------------------------------------------

# Component: Motion Sensor

This is the component provided by the [Motion
Sensor](/block/motion_sensor). When an entity within line of sight of
the [Motion Sensor](/block/motion_sensor) moves faster than the
threshold a [motion](/component/signals#motion_sensor_block) event is
queued. The sensor has a radius limit of 8 and is updated every half
second.

Component name: `motion_sensor`. Callbacks:

- `getSensitivity(): number`

      Gets the current sensitivity of the sensor, i.e. at which speed
      threshold of distance / second it triggers.

- `setSensitivity(value: number): number`

      Sets the sensor's sensitivity to the specified value, returns the
      old value.

------------------------------------------------------------------------
