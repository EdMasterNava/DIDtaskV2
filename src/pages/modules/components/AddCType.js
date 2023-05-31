import { assert } from '@polkadot/util';

import { credentialApi } from './Api';

export async function addCtype(ctype, sender, description) {
  assert(ctype, 'No ctype found');
  assert(sender, 'No sender found');
  assert(description, 'No description found');

  await credentialApi.createCtype({
    owner: sender,
    ctypeHash: ctype.hash,
    metadata: ctype.schema,
    description,
  });
}