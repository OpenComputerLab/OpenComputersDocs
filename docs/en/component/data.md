# Component: Data

This component is provided by the [Data Card](/item/data_card)

Component name: `data`.

## Tier 1 Callbacks

- `crc32(<data:string>):string`

    Computes CRC-32 hash of the data. Result is in binary format.

- `decode64(<data:string>):string`

    Applies base64 decoding to the data.

- `encode64(<data:string>):string`

    Applies base64 encoding to the data. Result is in binary format.

- `md5(<data:string>):string`

    Computes MD5 hash of the data. Result is in binary format

- `sha256(<data:string>):string`

    Computes SHA2-256 hash of the data. Result is in binary format.

- `deflate(<data:string>):string`

    Applies deflate compression to the data.

- `inflate(<data:string>):string`

    Applies inflate decompression to the data.

- `getLimit():number`

    The maximum size of data that can be passed to other functions of
    the card.

## Tier 2 Callbacks

- `encrypt(<data:string>, key:string, iv:string):string`

    Applies AES encryption to the data using the key and (preferably)
    random IV.

- `decrypt(<data:string>, key:string, iv:string):string`

    Reverses AES encryption on the data using the key and the IV.

- `random(len:number):string`

    Generates a random binary string of `len` length.

## Tier 3 Callbacks

- `generateKeyPair([bitLen:number]):table, table`

    Generates a public/private key pair for various cryptiographic
    functions.

    Optional second parameter specifies key length, 256 or 384 bits
    accepted.

    Key types include "ec-public" and "ec-private". Keys can be
    serialized with

    `key.serialize():string` Keys also contain the function
    `key.isPublic():boolean`

- `ecdsa(<data:string>, key:userdata[, sig:string]):string|boolean`

    Generates a signiture of data using a private key. If signature is
    present verifies the signature using the public key, the previously
    generated signature string and the original string.

- `ecdh(privateKey:userdata, publicKey:userdata):string`

    Generates a Diffie-Hellman shared key using the first user's
    private key and the second user's public key. An example of a basic
    key relation:
    `ecdh(userA.private, userB.public) == ecdh(userB.private, userA.public)`

- `deserializeKey(<data:string>, type:string):table`

    Transforms a key from string to it's arbitrary type.

## Examples

This card can be used to transmit encrypted data to other in-game or
real-life peers. Since we are given the ability to create key-pairs and
Diffie-Hellman shared keys, we are able to establish encrypted
connections with these peers.

When using key pairs for encryption, the basic concept is this

### Preliminary Setup:

- (The following items are to be done on the RECEIVER)
- Generate a public key (rPublic) and private key (rPrivate).
- if no automated key exchange, then you'll need to send rPublic to the SENDER manually.

### The SENDER must:

- Read the RECEIVER's public key (rPublic), unserialize it, and rebuild the key object.
- Generate a public key (sPublic) and private key (sPrivate).
- Generate an encryption key using rPublic and sPrivate.
- Generate an Initialization Vector (IV).
- Convert sPublic into a string with sPublic.serialize().
- **Serialize the data using the serialization library, then encrypt it using
    the encryption key and IV.**
- Serialize and transmit the message, with sPublic and IV in plain-text.

### The RECEIVER must:

- Read the RECEIVER's private key (rPrivate), unserialize it, and rebuild the key object.

- Receive the message and unserialize it using the serialization library, then deserialize sPublic using data.deserializeKey().

- *Generate a decryption key using sPublic and rPrivate.
- Use the decryption key, along with the IV, to decrypt the message.
- Unserialize the decrypted data.

**NOTE** In the above, the terms 'encryption key' and 'decryption
key' are used. These keys are, byte-for-byte, the same. This is because
both keys were generated using the `ecdh()` function.

**NOTE** In the above, it is stated that *you will manually transfer
rPublic to SENDER*. This would not be the case in systems that employ a
handshake protocol. For example, SENDER would make themselves known to
RECEIVER, who will then reply to SENDER with a public key (and possibly
additional information, such as key-length). For simplicity, the
following examples will not cover the functions of handshake protocols.

**NOTE** The examples above and below state that you must
serialize/unserialize a key or message. In-general, it is good practice
to serialize data (especially when in binary format) before you write it
to a file, or transfer it on the network. Serialization makes sure that
the binary data is 'escaped', making it safe for your script or shell
to read.

To send an encrypted message:

``` lua
local serialization  = require("serialization")
local component      = require("component")
 
-- This table contains the data that will be sent to the receiving computer.
-- Along with header information the receiver will use to decrypt the message.
local __packet =
{
    header =
    {
        sPublic    = nil,
        iv         = nil
    },
 
    data = nil
}
 
-- Read the public key file.
local file = io.open("rPublic","rb")
 
local rPublic = file:read("*a")
 
file:close()
 
-- Unserialize the public key into binary form.
local rPublic = serialization.unserialize(rPublic)
 
-- Rebuild the public key object.
local rPublic = component.data.deserializeKey(rPublic,"ec-public")
 
-- Generate a public and private keypair for this session.
local sPublic, sPrivate = component.data.generateKeyPair(384)
 
-- Generate an encryption key.
local encryptionKey = component.data.md5(component.data.ecdh(sPrivate, rPublic))
 
-- Set the header value 'iv' to a randomly generated 16 digit string.
__packet.header.iv = component.data.random(16)
 
-- Set the header value 'sPublic' to a string.
__packet.header.sPublic = sPublic.serialize()
 
-- The data that is to be encrypted.
__packet.data = "lorem ipsum"
 
-- Data is serialized and encrypted.
__packet.data = component.data.encrypt(serialization.serialize(__packet.data), encryptionKey, __packet.header.iv)
 
-- For simplicity, in this example the computers are using a Linked Card (ocdoc.cil.li/item:linked_card)
component.tunnel.send(serialization.serialize(__packet))
```

To receive the encrypted message:

``` lua
local serialization = require("serialization")
local component     = require("component")
local event         = require("event")
 
-- Read the private key
local file = io.open("rPrivate","rb")
 
local rPrivate = file:read("*a")
 
file:close()
 
-- Unserialize the private key
local rPrivate = serialization.unserialize(rPrivate)
 
-- Rebuild the private key object
local rPrivate = component.data.deserializeKey(rPrivate,"ec-private")
 
-- Use event.pull() to receive the message from SENDER.
local _, _, _, _, _, message = event.pull("modem_message")
 
-- Unserialize the message
local message = serialization.unserialize(message)
 
-- From the message, deserialize the public key.
local sPublic = component.data.deserializeKey(message.header.sPublic,"ec-public")
 
-- Generate the decryption key.
local decryptionKey = component.data.md5(component.data.ecdh(rPrivate, sPublic))
 
-- Use the decryption key and the IV to decrypt the encrypted data in message.data
local data = component.data.decrypt(message.data, decryptionKey, message.header.iv)
 
-- Unserialize the decrypted data.
local data = serialization.unserialize(data)
 
-- Print the decrypted data.
print(data)
```