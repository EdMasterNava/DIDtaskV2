import { Message } from '@kiltprotocol/sdk-js';
import React, { createContext, useCallback, useEffect, useMemo, useState } from 'react';

// import { endpoint } from '@credential/app-config/endpoints';
import { CredentialFetcher } from './CredentialFetcher';
import { SyncProvider } from './SyncProvider';
import { useDid } from './DidProvider';
import { useKeystore } from './KeyProvider';

const AppContext = createContext({});
export function useApp() {
  return React.useContext(AppContext);
}
const syncProvider = new SyncProvider('wss://wss.testnet.credential-service.zkid.app/ws');
const encryptedMessages = new Map();

const AppProvider = ({ children }) => {
  const { keyring } = useKeystore();
  const { didDetails, isLocked, unlock } = useDid();
  const [unParsed, setUnParsed] = useState(0);

  const { address, fetcher } = useMemo(() => {
    return {
      address: didDetails?.identifier,
      fetcher:
        didDetails && didDetails.encryptionKey
          ? new CredentialFetcher(`${'KILT Peregrine'}-${didDetails.assembleKeyUri(didDetails.encryptionKey.id)}`)
          : null,
    };
  }, [didDetails]);

  useEffect(() => {
    if (!fetcher || !address) return;

    const onConnected = async () => {
      await fetcher.query.messages
        .all((message) => typeof message.syncId === 'string')
        .then((messages) =>
          fetcher.write.messages.batchPut(
            messages.map((message) => ({
              ...message,
              syncId:
                message.syncId !== undefined && message.syncId !== null ? Number(message.syncId) : undefined,
            }))
          )
        );
      fetcher.query.messages.lastSync().then((message) => {
        syncProvider.subscribe(address, !message?.syncId ? 0 : message.syncId, (messages) => {
          messages.forEach((message) => encryptedMessages.set(message.id, message));
          setUnParsed(encryptedMessages.size);
        });
      });
    };

    syncProvider.on('connect', onConnected);
    syncProvider.open();

    return () => {
      encryptedMessages.clear();
      setUnParsed(0);
      syncProvider.off('connect', onConnected);
      syncProvider.close();
    };
  }, [address, fetcher]);

  const parse = useCallback(async () => {
    if (didDetails && encryptedMessages.size > 0) {
      isLocked && (await unlock());
      const promises = [];

      encryptedMessages.forEach((encryptedMessage) => {
        promises.push(
          Message.decrypt(
            {
              receiverKeyUri: encryptedMessage.receiverKeyId,
              senderKeyUri: encryptedMessage.senderKeyId,
              ciphertext: encryptedMessage.ciphertext,
              nonce: encryptedMessage.nonce,
            },
            keyring,
            didDetails
          ).then((message) => {
            return fetcher?.write.messages
              .put({
                ...message,
                syncId: encryptedMessage.id,
                isRead: 0,
              })
              .then(() => {
                encryptedMessages.delete(encryptedMessage.id);
              });
          })
        );
      });

      Promise.all(promises).finally(() => {
        setUnParsed(encryptedMessages.size);
      });
    }
  }, [didDetails, isLocked, unlock, keyring, fetcher]);

  return <AppContext.Provider value={{ fetcher, unParsed, parse }}>{children}</AppContext.Provider>;
};

export default AppProvider;
