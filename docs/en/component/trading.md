# Component: Trading

This component is provided by [trading upgrades](/item/trading_upgrade)

Component name: `trading`. Callbacks:

- `getTrades():table`

    Returns a table of trades in range as userdata objects.

### Trade Object

A trade object represents an available trade nearby.

- `isEnabled():boolean`

    Returns whether the merchant currently wants to trade this.

- `trade():boolean, string`

    Returns true when trade succeeds and nil, error when not.

- `getInput():table, table`

    Returns the items the merchant wants for this trade.

- `getOutput():table`

    Returns the item the merchant offers for this trade.

- `getMerchantId():number`

    Returns the id of the merchant that provides this trade. Trades can
    be grouped by the merchant offering them using this id. The id is
    created when you call getTrades(), but is consistent as long as the
    group of available merchants does not change between calls.