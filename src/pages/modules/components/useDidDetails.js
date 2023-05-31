import { Did,  } from '@kiltprotocol/sdk-js';
import { useEffect, useState } from 'react';

export async function getDidDetails(didUri) {
  if (!Did.Utils.isUri(didUri)) return null;

  const { type } = Did.Utils.parseDidUri(didUri);

  if (type === 'light') {
    return Did.LightDidDetails.fromUri(didUri);
  } else {
    return Did.FullDidDetails.fromChainInfo(didUri)
  }
}

export function useDidDetails(didUri) {
  const [didDetails, setDidDetails] = useState(null);

  useEffect(() => {
    if (!didUri) return;

    getDidDetails(didUri).then(setDidDetails);
  }, [didUri]);

  return didDetails;
}