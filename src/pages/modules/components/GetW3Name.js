import { Did } from '@kiltprotocol/sdk-js';

export const w3NameCachesPromise = {};
export const w3NameCaches = {};

function isUri(str) {
  try {
    return Did.Utils.validateKiltDidUri(str);
  } catch {
    return false;
  }
}

export async function getW3Name(addressOrDidUri) {
  const fromCache = w3NameCaches[addressOrDidUri];

  if (fromCache) {
    return fromCache;
  }

  const fromCachePromise = w3NameCachesPromise[addressOrDidUri];

  if (fromCachePromise) {
    return fromCachePromise;
  }

  if (isUri(addressOrDidUri)) {
    return (w3NameCachesPromise[addressOrDidUri] = Did.Web3Names.queryWeb3NameForDid(
      addressOrDidUri
    ).then((w3name) => {
      w3NameCaches[addressOrDidUri] = w3name;

      return w3name;
    }));
  } else {
    return (w3NameCachesPromise[addressOrDidUri] = Did.Web3Names.queryWeb3NameForDidIdentifier(
      addressOrDidUri
    ).then((w3name) => {
      w3NameCaches[addressOrDidUri] = w3name;

      return w3name;
    }));
  }
}
