import { useEffect, useMemo } from 'react';

import { CType as CTypeKilt } from '@kiltprotocol/sdk-js';
import { useLiveQuery } from 'dexie-react-hooks';

import { useApp } from './AppProvider';
import { useDid } from './DidProvider';

import { credentialApi } from './Api';

export function useCTypes() {
  const { fetcher } = useApp();
  const { didUri } = useDid();
  const data = useLiveQuery(() => fetcher?.query.ctypes.all(), [fetcher]);

  useEffect(() => {
    if (didUri && fetcher) {
      credentialApi.getCtypes(didUri).then(({ data }) => {
        fetcher.write.ctypes.batchPut(
          data.map((d) => {
            const ctype = CTypeKilt.fromSchema(d.metadata, d.owner);

            return {
              ...ctype,
              description: d.description,
              type: d.type,
            };
          })
        );
      });
    }
  }, [didUri, fetcher]);

  return useMemo(() => data || [], [data]);
}