import { BlockchainUtils } from '@kiltprotocol/sdk-js';
import { assert } from '@polkadot/util';

export async function signAndSend(report, keyring, sender, getExtrinsic) {
  if (!getExtrinsic) return;

  assert(sender, 'No sender publicKey or address provided');

  const extrinsic = await getExtrinsic();

  if (!extrinsic) return;

  await BlockchainUtils.signAndSubmitTx(extrinsic, keyring.getPair(sender), {
    reSign: false,
    rejectOn: (result) => {
      return result.isError || result.internalError;
    },
    resolveOn: (result) => {
      report(null, true, result.status.type);

      return result.isFinalized;
    }
  });
}