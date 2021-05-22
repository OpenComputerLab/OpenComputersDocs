# RC API

The rc system automates running scripts as services and is generally
used for starting scripts when the system is booting up. It is one tool
of many provided by OpenOS for automatic script execution, as documented
[here](/tutorial/autorun_options).

OpenOS rc is inspired by [OpenRC](https://wiki.gentoo.org/wiki/OpenRC).
"rc" stands for "run command".

There are two components of the rc system; [rc
scripts](/api/rc#RC Scripts) and [the rc
controller](/api/rc#The RC Controller).

## RC Scripts

RC scripts are lua modules built by the user and managed by the rc
controller. We will cover how to build your own rc script. "Enabled"
rc scripts are those configured to start at boot. The rc controller can
also start and stop an rc script individually, without having to enable
or disable it.

RC scripts are lua scripts that require [minimal setup](/api/rc#Minimal
Setup), their [method](/api/rc#RC Script
Methods) api is flexible, and can also benefit from an [rc
configuration](/api/rc#RC Script Configuration).

### Minimal Setup

To create a custom rc script named "custom" you minimally need one
file `/etc/rc.d/custom.lua` with minimally one function defition

``` function start() end ```

This one `custom.lua` file with its one `start` function
sufficiently defines an rc script.

The astute reader will have noticed that our `start` function in the
minimal example is lacking a `local` scope designation. This was
intentional. RC scripts are loaded in a sandboxed environment and these
global functions act as an interface between the source and the rc
controller. Every method you want the rc controller to have access to
needs to be a globally defined method in your rc script file.

OpenOS ships is an example rc script. Review `/etc/rc.d/example.lua`

### RC Script Methods

To the casual reader the details of the rc script environment may only
seem a distraction to getting started with the rc system. But, for the
curious or the confused, these details can be helpful. The RC script is
loaded (lua `load`) in a sandboxed environment inheriting all global
methods to OpenOS. Your global functions in the rc script are accessible
to the rc system and do not pollute the OpenOS global environment. Your
script [configuration](/api/rc#RC Script Configuration) is in your
sandbox environment as a global variable `args`. Also note that your
script is loaded once and kept in cache.

The rc script name is the basename of the lua file you've added to
`/etc/rc.d/`.

Define your rc script methods as global functions in your rc script
file. Note that in no case does the rc system care about the return
value of any rc script method. Data of any exception throw will be
printed to stderr if available, otherwise to `/tmp/event.log`.

There are only 2 rc methods that hold a special status in the rc system,
`start` and `stop`.

- `start()`

A proper rc script needs only to define a `start` method. The design
of the rc system anticipates that rc scripts can be started, and through
various workflows with the [controller](/api/rc#The RC
Controller), the system levarages the `start` method.

- `stop()`

Optionally, the rc script may define a stop method. Enabled rc scripts
(i.e. scripts that are configured for automatic startup) will only call
`start` during boot, but `rc <custom> restart` also has a default
behavior if a `stop` method has been defined for a script. When the rc
controller is asked to `restart` any rc script it will call `stop`
followed by `start`. Note that if the script has defined `restart`
explicitly, that is called instead.

- `<methodName>([args...])`

The rc script author is not limited to defining only `start` and
`stop`. You have the flexibility to define any number of script
methods. The end user will not call these methods directly, but will
instead leverage the rc controller to call these methods. Thus there is
a common calling convention the rc controller uses to call any named rc
script method.

`# rc <moduleName> <methodName> [args...]`

Where `moduleName` is your rc script name (that being the basename of
your `.lua` file located in `/etc/rc.d/`), `methodName` is your
global method defined in that script file, and `args...` are any
command line arguments you want to pass. Even `start` and `stop` can
be called this way.

### RC Script Configuration

You can define your own script configuration in `/etc/rc.cfg` (the
syntax of this file must be lua-readable). If your rc script is at
`/etc/rc.d/foo.lua`, then its module name is `foo`, and its
configuration field name would be `foo`. The `example` rc script,
provided with OpenOS, does this. It has a `/etc/rc.d/example.lua`
script, and the `/etc/rc.cfg` has:

``` example = "Hello World" enabled = {} ```

The `enabled` table it maintained by the [controller](/api/rc#The RC
Controller), but the `example` field holds the configuration for the
`example` rc script. The value of the field can be any lua value, not
just a string, and that includes tables. The configured value for your
script is loaded into your script environment. You can access your
configuration in your script via a global field named `args`. Again,
review the `example.lua` script code at note its use of an `args`
variable. Your script file and the configuration loaded once and cached
by the controller.

## The RC Controller

The rc controller has a command line interface you access with the
`rc` command in the shell (`/bin/rc.lua`) and a library you can
access via `require("rc")`. It maintains a list of which rc scripts
are configured to start at boot, and keeps a cache of the loaded rc
scripts. Unlike the other automatic start options autorun and `.shrc`,
enabled rc scripts only automatically start once per OpenOS boot.

### Command Line Interface

`rc`

Calls start on all enabled rc scripts

`rc <moduleName> enable`

Adds rc script `<moduleName>`{=html} to the list of "autostarting"
rc scripts. Next boot, `<moduleName>`{=html}.start() will be called.

`rc <moduleName> disable`

Removes rc script `<moduleName>`{=html} from the enabled list. Next
boot, `<moduleName>`{=html} will not be started.

`rc <moduleName> restart`

If rc script `<moduleName>`{=html} has a `stop()` and `start()`
method defined, call them.

`rc <moduleName> <methodName> [args...]`

Call the function `<method>`{=html} defined in rc script
`<moduleName>`{=html}, passing [args...] (if any) to it as
function arguments.

### RC API

- `unload(moduleName: string)`

You can unload your rc script thereby removing it from the rc cache.
This would be necessary if you want to reconsume your configuration, or
clear any script globals. It can definitely be helpful when debuging and
you want to reload your script code without having to reboot the system.

## Contents

# RC API

The rc system automates running scripts as services and is generally
used for starting scripts when the system is booting up. It is one tool
of many provided by OpenOS for automatic script execution, as documented
[here](/tutorial/autorun_options).

OpenOS rc is inspired by [OpenRC](https://wiki.gentoo.org/wiki/OpenRC).
"rc" stands for "run command".

There are two components of the rc system; [rc
scripts](/api/rc#RC Scripts) and [the rc
controller](/api/rc#The RC Controller).

## RC Scripts

RC scripts are lua modules built by the user and managed by the rc
controller. We will cover how to build your own rc script. "Enabled"
rc scripts are those configured to start at boot. The rc controller can
also start and stop an rc script individually, without having to enable
or disable it.

RC scripts are lua scripts that require [minimal setup](/api/rc#Minimal
Setup), their [method](/api/rc#RC Script
Methods) api is flexible, and can also benefit from an [rc
configuration](/api/rc#RC Script Configuration).

### Minimal Setup

To create a custom rc script named "custom" you minimally need one
file `/etc/rc.d/custom.lua` with minimally one function defition

``` function start() end ```

This one `custom.lua` file with its one `start` function
sufficiently defines an rc script.

The astute reader will have noticed that our `start` function in the
minimal example is lacking a `local` scope designation. This was
intentional. RC scripts are loaded in a sandboxed environment and these
global functions act as an interface between the source and the rc
controller. Every method you want the rc controller to have access to
needs to be a globally defined method in your rc script file.

OpenOS ships is an example rc script. Review `/etc/rc.d/example.lua`

### RC Script Methods

To the casual reader the details of the rc script environment may only
seem a distraction to getting started with the rc system. But, for the
curious or the confused, these details can be helpful. The RC script is
loaded (lua `load`) in a sandboxed environment inheriting all global
methods to OpenOS. Your global functions in the rc script are accessible
to the rc system and do not pollute the OpenOS global environment. Your
script [configuration](/api/rc#RC Script Configuration) is in your
sandbox environment as a global variable `args`. Also note that your
script is loaded once and kept in cache.

The rc script name is the basename of the lua file you've added to
`/etc/rc.d/`.

Define your rc script methods as global functions in your rc script
file. Note that in no case does the rc system care about the return
value of any rc script method. Data of any exception throw will be
printed to stderr if available, otherwise to `/tmp/event.log`.

There are only 2 rc methods that hold a special status in the rc system,
`start` and `stop`.

- `start()`

A proper rc script needs only to define a `start` method. The design
of the rc system anticipates that rc scripts can be started, and through
various workflows with the [controller](/api/rc#The RC
Controller), the system levarages the `start` method.

- `stop()`

Optionally, the rc script may define a stop method. Enabled rc scripts
(i.e. scripts that are configured for automatic startup) will only call
`start` during boot, but `rc <custom> restart` also has a default
behavior if a `stop` method has been defined for a script. When the rc
controller is asked to `restart` any rc script it will call `stop`
followed by `start`. Note that if the script has defined `restart`
explicitly, that is called instead.

- `<methodName>([args...])`

The rc script author is not limited to defining only `start` and
`stop`. You have the flexibility to define any number of script
methods. The end user will not call these methods directly, but will
instead leverage the rc controller to call these methods. Thus there is
a common calling convention the rc controller uses to call any named rc
script method.

`# rc <moduleName> <methodName> [args...]`

Where `moduleName` is your rc script name (that being the basename of
your `.lua` file located in `/etc/rc.d/`), `methodName` is your
global method defined in that script file, and `args...` are any
command line arguments you want to pass. Even `start` and `stop` can
be called this way.

### RC Script Configuration

You can define your own script configuration in `/etc/rc.cfg` (the
syntax of this file must be lua-readable). If your rc script is at
`/etc/rc.d/foo.lua`, then its module name is `foo`, and its
configuration field name would be `foo`. The `example` rc script,
provided with OpenOS, does this. It has a `/etc/rc.d/example.lua`
script, and the `/etc/rc.cfg` has:

``` example = "Hello World" enabled = {} ```

The `enabled` table it maintained by the [controller](/api/rc#The RC
Controller), but the `example` field holds the configuration for the
`example` rc script. The value of the field can be any lua value, not
just a string, and that includes tables. The configured value for your
script is loaded into your script environment. You can access your
configuration in your script via a global field named `args`. Again,
review the `example.lua` script code at note its use of an `args`
variable. Your script file and the configuration loaded once and cached
by the controller.

## The RC Controller

The rc controller has a command line interface you access with the
`rc` command in the shell (`/bin/rc.lua`) and a library you can
access via `require("rc")`. It maintains a list of which rc scripts
are configured to start at boot, and keeps a cache of the loaded rc
scripts. Unlike the other automatic start options autorun and `.shrc`,
enabled rc scripts only automatically start once per OpenOS boot.

### Command Line Interface

`rc`

Calls start on all enabled rc scripts

`rc <moduleName> enable`

Adds rc script `<moduleName>`{=html} to the list of "autostarting"
rc scripts. Next boot, `<moduleName>`{=html}.start() will be called.

`rc <moduleName> disable`

Removes rc script `<moduleName>`{=html} from the enabled list. Next
boot, `<moduleName>`{=html} will not be started.

`rc <moduleName> restart`

If rc script `<moduleName>`{=html} has a `stop()` and `start()`
method defined, call them.

`rc <moduleName> <methodName> [args...]`

Call the function `<method>`{=html} defined in rc script
`<moduleName>`{=html}, passing [args...] (if any) to it as
function arguments.

### RC API

- `unload(moduleName: string)`

You can unload your rc script thereby removing it from the rc cache.
This would be necessary if you want to reconsume your configuration, or
clear any script globals. It can definitely be helpful when debuging and
you want to reload your script code without having to reboot the system.

## Contents
