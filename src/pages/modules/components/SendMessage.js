import { assert } from '@polkadot/util';

import { credentialApi } from './Api';

export async function sendMessage(
  fetcher,
  encryptedMessage,
  reCaptchaToken,
  saveMessage
) {
  assert(fetcher, 'No credential fetcher provided');
  assert(encryptedMessage, 'Not encrypted message found');
  assert(reCaptchaToken, 'No recaptcha token provided');
  assert(saveMessage, 'No save message found');

  const { code, message } = await credentialApi.addMessage({
    receiverKeyId: encryptedMessage.receiverKeyUri,
    senderKeyId: encryptedMessage.senderKeyUri,
    nonce: encryptedMessage.nonce,
    ciphertext: encryptedMessage.ciphertext,
    reCaptchaToken
  });

  if (code !== 200) {
    throw new Error(message ?? 'Server error');
  }

  fetcher.write.messages.put({ ...saveMessage, isRead: 1 });
}
