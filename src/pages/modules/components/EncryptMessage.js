import { assert } from '@polkadot/util';


export async function encryptMessage(
  keyring,
  message,
  sender,
  receiver
) {
  assert(sender, 'No sender did provided');
  assert(sender.encryptionKey, "Sender hasn't encryptionKey");
  assert(receiver, 'No receiver did provided');
  assert(receiver.encryptionKey, "Receiver hasn't encryptionKey");
  assert(message, 'Message not provided');

  const encrypted = await message.encrypt(
    sender.encryptionKey.id,
    sender,
    keyring,
    receiver.assembleKeyUri(receiver.encryptionKey.id)
  );

  return encrypted;
}
