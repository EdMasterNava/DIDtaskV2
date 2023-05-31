import {
    Claim,
    CType,
    RequestForAttestation
  } from '@kiltprotocol/sdk-js';
  import { assert } from '@polkadot/util';
  
  export async function requestAttestation(
    keyring,
    sender,
    ctype,
    contents
  ) {
    assert(sender, 'No sender did provided');
    assert(ctype, 'No CType found');
    assert(contents, 'Claim contents is empty');
  
    const claim = Claim.fromCTypeAndClaimContents(
      CType.fromCType({
        schema: ctype.schema,
        hash: ctype.hash,
        owner: ctype.owner
      }),
      contents,
      sender.uri
    );
  
    const requestForAttestation = await RequestForAttestation.fromClaim(claim).signWithDidKey(
      keyring,
      sender,
      sender.authenticationKey.id
    );
  
    return requestForAttestation;
  }
  