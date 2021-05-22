# User Access Control

If enabled in the config, computers can be "owned", i.e. the list of
users of a computer (see [the computer API](/api/computer)) determines
how players can interact with a computer. Specifically, only players
registered as users can:

- Change a computer's inventory.
- Break the computer case (robots are exempt, they can always be broken, to avoid griefing).
- Input commands on the computer, i.e. use the keyboard / click the screen.

Operators are considered to be users of all computers, even if not
explicitly in the user list, meaning they can always perform the above
actions on all computers. When playing a single player game the user
also cannot "lock himself out", he will always have full control over
all computers.

To avoid locking yourself out by mistyping your name, only users that
are online can be added to a computer's user list.

In OpenOS you can add and remove users from the shell by calling
`useradd USER` and `userdel USER` respectively, where USER is the
user's name.

## Contents

# User Access Control

If enabled in the config, computers can be "owned", i.e. the list of
users of a computer (see [the computer API](/api/computer)) determines
how players can interact with a computer. Specifically, only players
registered as users can:

- Change a computer's inventory. - Break the computer case (robots are
exempt, they can always be broken, to avoid griefing).

- Input commands on the computer, i.e. use the keyboard / click the screen.

Operators are considered to be users of all computers, even if not
explicitly in the user list, meaning they can always perform the above
actions on all computers. When playing a single player game the user
also cannot "lock himself out", he will always have full control over
all computers.

To avoid locking yourself out by mistyping your name, only users that
are online can be added to a computer's user list.

In OpenOS you can add and remove users from the shell by calling
`useradd USER` and `userdel USER` respectively, where USER is the
user's name.