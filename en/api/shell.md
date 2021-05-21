# Shell API

This API provides shell related functionality, such as the current
working directory, program search path and aliases for the shell.

- `shell.getAlias(alias: string): string`

      Gets the value of a specified alias, if any. If there is no such
      alias returns `nil`.

- `shell.setAlias(alias: string, value: string or nil)`

      Defines a new alias or updates an existing one. Pass `nil` as the
      value to remove an alias. Note that aliases are not limited to
      program names, you can include parameters as well. For example,
      `view` is a default alias for `edit -r`.

- `shell.aliases(): function`

      Returns an iterator over all known aliases.

- `shell.getWorkingDirectory(): string`

      Gets the path to the current working directory. This is an alias for
      `os.getenv("PWD")`.

- `shell.setWorkingDirectory(dir: string)`

      Sets the current working directory. This is a checked version of
      `os.setenv("PWD", dir)`.

- `shell.getPath(): string`

      Gets the search path used by `shell.resolve`. This can contain
      multiple paths, separated by colons (`:`).
      This is an alias for `os.getenv("PATH")`.

- `shell.setPath(value: string)`

      Sets the search path. Note that this will replace the previous
      search paths. To add a new path to the search paths, do this:
      `shell.setPath(shell.getPath() .. ":/some/path")`
      This is an alias for `os.setenv("PATH", value)`.

- `shell.resolve(path: string[, ext: string]): string`

      Tries to "resolve" a path, optionally also checking for files with
      the specified extension, in which case `path` would only contain the
      *name*. This first searches the working directory, then all entries
      in the search path (see `getPath`/`setPath`).
      If no file with the exact specified name exists and an extension is
      provided, it will also check for a file with that name plus the
      specified extension, i.e. for `path .. "." .. ext`.

- `shell.execute(command: string, env: table[, ...]): boolean
...`

      Runs the specified command. This runs the default shell (see
      `os.getenv("SHELL")`) and passes the command to it. `env` is the
      environment table to use for the shell, and thus for the called
      program, in case you wish to sandbox it or avoid it cluttering the
      caller's namespace. Additional arguments are passed directly to the
      first program started based on the command, so you can pass
      non-string values to programs.
      Returns values similar to `pcall` and `coroutine.resume`: the first
      returned value is a boolean indicating success or error. In case of
      errors, the second returned value is a detailed error message.
      Otherwise the remaining returned values are the values that were
      returned by the specified program when it terminated.

- `shell.parse(...): table, table`

      Utility methods intended for programs to parse their arguments. Will
      return two tables, the first one containing any "normal"
      parameters, the second containing "options". Options are indicated
      by a leading `-`, and all options must only be a single character,
      since multiple characters following a single `-` will be interpreted
      as multiple options. Options specified with 2 dashes are not split
      and can have multiple letters. Also, 2-dash options can be given
      values by using an equal sign. The following examples all assume the
      script `program` parses the options using
      `local args, ops = shell.parse(...)`.

      `program`

      # `args` is `{}`

      # `ops` is `{}`.

      `program -abC -d arg1 arg2`

      # `args` is `{"arg1", "arg2"}`

      # `ops` is `{a=true,b=true,C=true,d=true}`.

      `program -abC --dog arg1 arg2`

      # `args` is `{"arg1", "arg2"}`

      # `ops` is `{a=true,b=true,C=true,dog=true}`.

      `program -abC --dog=foo arg1 arg2`

      # `args` is `{"arg1", "arg2"}`

      # `ops` is `{a=true,b=true,C=true,dog="foo"}`.

      On this next example, notice the single dash before `dog`, this
      causes all of the token to be parsed as single chars.

      `program -abC -dog=foo arg1 arg2`

      # `args` is `{"arg1", "arg2"}`

      # `ops` is `{a=true,b=true,C=true,d=true,g=true,["="]=true,f=true,o=true}`.

## Contents

# Shell API

This API provides shell related functionality, such as the current
working directory, program search path and aliases for the shell.

- `shell.getAlias(alias: string): string`

      Gets the value of a specified alias, if any. If there is no such
      alias returns `nil`.

- `shell.setAlias(alias: string, value: string or nil)`

      Defines a new alias or updates an existing one. Pass `nil` as the
      value to remove an alias. Note that aliases are not limited to
      program names, you can include parameters as well. For example,
      `view` is a default alias for `edit -r`.

- `shell.aliases(): function`

      Returns an iterator over all known aliases.

- `shell.getWorkingDirectory(): string`

      Gets the path to the current working directory. This is an alias for
      `os.getenv("PWD")`.

- `shell.setWorkingDirectory(dir: string)`

      Sets the current working directory. This is a checked version of
      `os.setenv("PWD", dir)`.

- `shell.getPath(): string`

      Gets the search path used by `shell.resolve`. This can contain
      multiple paths, separated by colons (`:`).
      This is an alias for `os.getenv("PATH")`.

- `shell.setPath(value: string)`

      Sets the search path. Note that this will replace the previous
      search paths. To add a new path to the search paths, do this:
      `shell.setPath(shell.getPath() .. ":/some/path")`
      This is an alias for `os.setenv("PATH", value)`.

- `shell.resolve(path: string[, ext: string]): string`

      Tries to "resolve" a path, optionally also checking for files with
      the specified extension, in which case `path` would only contain the
      *name*. This first searches the working directory, then all entries
      in the search path (see `getPath`/`setPath`).
      If no file with the exact specified name exists and an extension is
      provided, it will also check for a file with that name plus the
      specified extension, i.e. for `path .. "." .. ext`.

- `shell.execute(command: string, env: table[, ...]): boolean
...`

      Runs the specified command. This runs the default shell (see
      `os.getenv("SHELL")`) and passes the command to it. `env` is the
      environment table to use for the shell, and thus for the called
      program, in case you wish to sandbox it or avoid it cluttering the
      caller's namespace. Additional arguments are passed directly to the
      first program started based on the command, so you can pass
      non-string values to programs.
      Returns values similar to `pcall` and `coroutine.resume`: the first
      returned value is a boolean indicating success or error. In case of
      errors, the second returned value is a detailed error message.
      Otherwise the remaining returned values are the values that were
      returned by the specified program when it terminated.

- `shell.parse(...): table, table`

      Utility methods intended for programs to parse their arguments. Will
      return two tables, the first one containing any "normal"
      parameters, the second containing "options". Options are indicated
      by a leading `-`, and all options must only be a single character,
      since multiple characters following a single `-` will be interpreted
      as multiple options. Options specified with 2 dashes are not split
      and can have multiple letters. Also, 2-dash options can be given
      values by using an equal sign. The following examples all assume the
      script `program` parses the options using
      `local args, ops = shell.parse(...)`.

      `program`

      # `args` is `{}`

      # `ops` is `{}`.

      `program -abC -d arg1 arg2`

      # `args` is `{"arg1", "arg2"}`

      # `ops` is `{a=true,b=true,C=true,d=true}`.

      `program -abC --dog arg1 arg2`

      # `args` is `{"arg1", "arg2"}`

      # `ops` is `{a=true,b=true,C=true,dog=true}`.

      `program -abC --dog=foo arg1 arg2`

      # `args` is `{"arg1", "arg2"}`

      # `ops` is `{a=true,b=true,C=true,dog="foo"}`.

      On this next example, notice the single dash before `dog`, this
      causes all of the token to be parsed as single chars.

      `program -abC -dog=foo arg1 arg2`

      # `args` is `{"arg1", "arg2"}`

      # `ops` is `{a=true,b=true,C=true,d=true,g=true,["="]=true,f=true,o=true}`.

## Contents
