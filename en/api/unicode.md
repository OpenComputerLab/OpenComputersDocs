# Unicode API

Because all strings pass through Java at some point it can be useful to
handle them with Unicode support (since Java's internal string
representation is UTF-8 encoded). In particular, screens display UTF-8
strings, meaning the related GPU functions expect UTF-8 strings. Also,
keyboard input will generally be UTF-8 encoded, especially the
clipboard.

However, keep in mind that while wide characters can be displayed, input
and output of those is not fully supported in OpenOS's software (i.e.
the shell, edit and Lua interpreter).

The following functions are provided to allow basic UTF-8 handling:

- `unicode.char(value: number, ...): string`

      UTF-8 aware version of `string.char`. The values may be in the full
      UTF-8 range, not just ASCII.

- `unicode.charWidth(value: string, ...): number`

      Returns the width of the first character given. For example, for
      `シ` it'll return `2`, where `a` would return `1`.

- `unicode.isWide(value: string, ...): boolean`

      Returns if the width of the first character given is greater than 1.
      For example, for `シ` it'll return `true`, where `a` would return
      `false`.

- `unicode.len(value: string): number`

      UTF-8 aware version of `string.len`. For example, for `Ümläüt`
      it'll return `6`, where `string.len` would return `9`.

- `unicode.lower(value: string): string`

      UTF-8 aware version of `string.lower`.

- `unicode.reverse(value: string): string`

      UTF-8 aware version of `string.reverse`. For example, for `Ümläüt`
      it'll return `tüälmÜ`, where `string.reverse` would return `tälm`.

- `unicode.sub(value: string, i:number[, j:number]): string`

      UTF-8 aware version of `string.sub`.

- `unicode.upper(value: string): string`

      UTF-8 aware version of `string.upper`.

- `unicode.wlen(value: string): number`

      Returns the width of the entire string.

- `unicode.wtrunc(value: string, count: number): string`

      Truncates the given string up to but not including `count` width. If
      there are not enough characters to match the wanted width, the
      function errors.

For example, these are used when files are opened in non-binary mode.
The original string functions are used for files opened in binary mode.

## Contents

# Unicode API

Because all strings pass through Java at some point it can be useful to
handle them with Unicode support (since Java's internal string
representation is UTF-8 encoded). In particular, screens display UTF-8
strings, meaning the related GPU functions expect UTF-8 strings. Also,
keyboard input will generally be UTF-8 encoded, especially the
clipboard.

However, keep in mind that while wide characters can be displayed, input
and output of those is not fully supported in OpenOS's software (i.e.
the shell, edit and Lua interpreter).

The following functions are provided to allow basic UTF-8 handling:

- `unicode.char(value: number, ...): string`

      UTF-8 aware version of `string.char`. The values may be in the full
      UTF-8 range, not just ASCII.

- `unicode.charWidth(value: string, ...): number`

      Returns the width of the first character given. For example, for
      `シ` it'll return `2`, where `a` would return `1`.

- `unicode.isWide(value: string, ...): boolean`

      Returns if the width of the first character given is greater than 1.
      For example, for `シ` it'll return `true`, where `a` would return
      `false`.

- `unicode.len(value: string): number`

      UTF-8 aware version of `string.len`. For example, for `Ümläüt`
      it'll return `6`, where `string.len` would return `9`.

- `unicode.lower(value: string): string`

      UTF-8 aware version of `string.lower`.

- `unicode.reverse(value: string): string`

      UTF-8 aware version of `string.reverse`. For example, for `Ümläüt`
      it'll return `tüälmÜ`, where `string.reverse` would return `tälm`.

- `unicode.sub(value: string, i:number[, j:number]): string`

      UTF-8 aware version of `string.sub`.

- `unicode.upper(value: string): string`

      UTF-8 aware version of `string.upper`.

- `unicode.wlen(value: string): number`

      Returns the width of the entire string.

- `unicode.wtrunc(value: string, count: number): string`

      Truncates the given string up to but not including `count` width. If
      there are not enough characters to match the wanted width, the
      function errors.

For example, these are used when files are opened in non-binary mode.
The original string functions are used for files opened in binary mode.

## Contents
