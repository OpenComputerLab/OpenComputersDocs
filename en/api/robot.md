# Robot API

This API wraps the functionality of the **component**
[robot](/component/robot) to allow more intuitive interaction with the
robot.

This is the api you are using when in your lua code you call

```{=html}

``` {.lua}
local robot_api = require("robot")
robot_api.forward()
```

``` As opposed to using the robot component api directly, via the
component interface

```{=html}

``` {.lua}
local component = require("component")
local robot_component_api = component.robot -- if using openos, else component.proxy(component.list("robot")())
robot_component_api.move(sides.front)
```

``` While the component robot has more generic functions like
`move([side: number])` or `drop([side: number])`, this API has
more intuitive and failsafe functions like `turnRight`, `dropDown`,
`forward`. Which one you use is up to you, you can even use both at
the same time.

Note that a Robot is an OpenComputer like any other with just an
additional robot component included, so the normal [APIs](/api) are
available as usual.

See [Robot Block](/block/robot) for additional information on the actual
Robot.

### Slot alignment

# Robot API

This API wraps the functionality of the **component**
[robot](/component/robot) to allow more intuitive interaction with the
robot.

This is the api you are using when in your lua code you call

```{=html}

``` {.lua}
local robot_api = require("robot")
robot_api.forward()
```

``` As opposed to using the robot component api directly, via the
component interface

```{=html}

``` {.lua}
local component = require("component")
local robot_component_api = component.robot -- if using openos, else component.proxy(component.list("robot")())
robot_component_api.move(sides.front)
```

``` While the component robot has more generic functions like
`move([side: number])` or `drop([side: number])`, this API has
more intuitive and failsafe functions like `turnRight`, `dropDown`,
`forward`. Which one you use is up to you, you can even use both at
the same time.

Note that a Robot is an OpenComputer like any other with just an
additional robot component included, so the normal [APIs](/api) are
available as usual.

See [Robot Block](/block/robot) for additional information on the actual
Robot.

### Slot alignment
