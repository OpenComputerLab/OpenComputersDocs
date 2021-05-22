# Text API

This API provides some more general operations on strings and data
serialization into and back from strings.

- `text.detab(value: string, tabWidth: number): string`

      Converts tabs in a string to spaces, while aligning the tags at the
      specified tab width. This is used for formatting text in
      `term.write`, for example.

- `text.padRight(value: string, length: number): string`

      Pads a string with whitespace on the right up to the specified
      length.

- `text.padLeft(value: string, length: number): string`

      Pads a string with whitespace on the left up to the specified
      length.

- `text.trim(value: string): string`

      Removes whitespace characters from the start and end of a string.

- `text.wrap(value:string, width:number, maxWidth:number)`

      Wraps the provided string to specified width.

- `text.wrappedLines(value:string, width:number, maxWidth:number)`

      Returns a wrapper function around `text.wrap`.

- `text.tokenize(value:string)`

      Splits the input string into a table, using space as the delimiter.

## Contents

# Text API

This API provides some more general operations on strings and data
serialization into and back from strings.

- `text.detab(value: string, tabWidth: number): string`

      Converts tabs in a string to spaces, while aligning the tags at the
      specified tab width. This is used for formatting text in
      `term.write`, for example.

- `text.padRight(value: string, length: number): string`

      Pads a string with whitespace on the right up to the specified
      length.

- `text.padLeft(value: string, length: number): string`

      Pads a string with whitespace on the left up to the specified
      length.

- `text.trim(value: string): string`

      Removes whitespace characters from the start and end of a string.

- `text.wrap(value:string, width:number, maxWidth:number)`

      Wraps the provided string to specified width.

- `text.wrappedLines(value:string, width:number, maxWidth:number)`

      Returns a wrapper function around `text.wrap`.

- `text.tokenize(value:string)`

      Splits the input string into a table, using space as the delimiter.

## Contents
