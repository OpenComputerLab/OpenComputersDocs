## UUID API

**(new in OpenOS 1.6)**

The uuid API is a very simple library for creating 128 bit random
identifiers.

- `uuid.next() string`

Returns 128 bit random identifiers, represented as a hex value in a
string grouped by 8, 4, 4, 4, and 12 hex characters, separated by
dashes.

e.g. `34eb7b28-14d3-4767-b326-dd1609ba92e`. You might recognize this
pattern as it is the same used for component addressing.

``` print(require("uuid").next()) ```

## Contents

## UUID API

**(new in OpenOS 1.6)**

The uuid API is a very simple library for creating 128 bit random
identifiers.

- `uuid.next() string`

Returns 128 bit random identifiers, represented as a hex value in a
string grouped by 8, 4, 4, 4, and 12 hex characters, separated by
dashes.

e.g. `34eb7b28-14d3-4767-b326-dd1609ba92e`. You might recognize this
pattern as it is the same used for component addressing.

``` print(require("uuid").next()) ```

## Contents
