import React, { createContext, useCallback, useMemo } from 'react';

import { CType as CTypeKilt } from '@kiltprotocol/sdk-js';

import { useApp } from './AppProvider';
import { useDid } from './DidProvider';
import { useCTypes } from './useCtypes';
import { credentialApi } from './Api';

const CTypeContext = createContext({});
export function useCTypeContext() {
  return React.useContext(CTypeContext);
}

const CTypeProvider = ({ children }) => {
  const { fetcher } = useApp();
  const { didUri } = useDid();
  const cTypeList = useCTypes();

  const importCType = useCallback(
    async (hash) => {
      if (!didUri || !fetcher) return;

      await credentialApi.importCtype(didUri, hash);
      await credentialApi.getCtypes(didUri).then(({ data }) => {
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
    },
    [didUri, fetcher]
  );

  const deleteCType = useCallback(
    async (hash) => {
      if (!didUri || !fetcher) return;

      fetcher.write.ctypes.delete(hash);
      await credentialApi.deleteCtype(didUri, hash);
      await credentialApi.getCtypes(didUri).then(({ data }) => {
        fetcher.write.ctypes.batchPut(
          data.map((d) => ({
            hash: d.ctypeHash,
            owner: d.owner,
            schema: d.metadata,
            description: d.description,
            type: d.type,
          }))
        );
      });
    },
    [didUri, fetcher]
  );

  const value = useMemo(() => {
    return {
      importCType,
      deleteCType,
      cTypeList,
    };
  }, [cTypeList, deleteCType, importCType]);

  return <CTypeContext.Provider value={value}>{children}</CTypeContext.Provider>;
};

export default React.memo(CTypeProvider);