import * as React from 'react';
import { connect, Did, VerificationKeyType, init, EncryptionKeyType } from '@kiltprotocol/sdk-js';
import { useKeystore } from './KeyProvider';
import { useLocalStorage } from './useLocalStorage';
import { useDidDetails } from './useDidDetails';

const DidContext = React.createContext({});
export function useDid() {
    return React.useContext(DidContext);
}

const storageKey = 'credential:didUri';
const endpoint = 'wss://peregrine.kilt.io/parachain-public-ws/';
let blockchain;

init({address: endpoint});

export const DidProvider = ({ children }) => {
    const [isReady, setIsReady] = React.useState(false);
    const { addKeystore, keyring } = useKeystore();
    const [didUri, setDidUri, removeDidUri] = useLocalStorage(storageKey);
    const [needUpgrade, setNeedUpgrade] = React.useState(false);
    const didDetails = useDidDetails(didUri);
    const [isLocked, setIsLocked] = React.useState(true);

    const generateDid = React.useCallback(
        async(mnemonic, password) => {
            const keys = await addKeystore(mnemonic, password);
            const aK = await keys[0].address;
            const eK = await keys[1].address;
            const lightDid = Did.LightDidDetails.fromDetails({
                authenticationKey: {
                    publicKey: keyring.getPair(aK).publicKey, type: VerificationKeyType.Sr25519
                },
                encryptionKey: {
                    publicKey: keyring.getPair(eK).publicKey, type: EncryptionKeyType.X25519
                }
            });
            const didUri = lightDid.uri;

            setDidUri(didUri);

            return { didUri, keys }

        }, [addKeystore, setDidUri]
    );

    const tryFetchFullDid = React.useCallback(async () => {
        try {
            if (didUri) {
                const { identifier, type } = Did.Utils.parseDidUri(didUri);
                // console.log('Identifier: ', identifier);
                // console.log('Type: ', type);
                // console.log(
                //     Did.Utils.getKiltDidFromIdentifier(identifier.slice(2), 'full')
                // )
                await Did.FullDidDetails.fromChainInfo(
                    type === 'light'
                    ? Did.Utils.getKiltDidFromIdentifier(identifier.slice(2), 'full')
                    : didUri
                ).then((data) => {
                    console.log('checking data: ', data);
                    if (data !== null) {
                        console.log('data did not equal null: ', data);
                        setDidUri(data.uri);
                        setNeedUpgrade(
                            !(
                            keyring.getPair(data.authenticationKey.publicKey) &&
                            data.encryptionKey &&
                            keyring.getPair(data.encryptionKey.publicKey) &&
                            data.attestationKey &&
                            keyring.getPair(data.attestationKey.publicKey) &&
                            data.delegationKey &&
                            keyring.getPair(data.delegationKey.publicKey)
                            )
                        );
                    }
                });
            }
        } catch {}
    }, [didUri, keyring, setDidUri]);

    React.useEffect(() => {
        tryFetchFullDid();
    }, [tryFetchFullDid]);

    const isFullDid = React.useMemo(() => {
        try {
            if (didUri) {
            const { type } = Did.Utils.parseDidUri(didUri);
    
            if (type === 'full') {
                return true;
            }
            }
        } catch {}
    
        return false;
    }, [didUri]);

    const unlockDid = React.useCallback(
        (password) => {
            if (!didDetails) throw new Error("Can't find did details");
            console.log('Unlocking...');
            console.log('Keyring: ', keyring);
            console.log('Getting Pair: ', keyring.getPair(didDetails.authenticationKey.publicKey));
            keyring.getPair(didDetails.authenticationKey.publicKey).unlock(password);
            didDetails.encryptionKey &&
                keyring.getPair(didDetails.encryptionKey.publicKey).unlock(password);

            setIsLocked(false);
        },
        [didDetails, keyring]
    );

    const logout = React.useCallback(() => {
        setIsLocked(true);

        if (didDetails) {
            didDetails.getKeys().forEach((key) => {
                const account = keyring.getAccount(key.publicKey);

                account && keyring.forgetAccount(account.address);
            });
        }

        removeDidUri();
    }, [didDetails, keyring, removeDidUri]);

    React.useEffect(() => {
        // console.log('connecting...');
        connect().then(_blockchain => {
            blockchain = _blockchain;
            setIsReady(true);
        }).catch(error => {
            console.log(error);
        })
        // console.log('done')
    }, []);

    console.log('connected: ', isReady, 'blockchain', blockchain);

    const value = {
        generateDid,
        didUri,
        removeDidUri,
        didDetails,
        isReady,
        blockchain,
        needUpgrade,
        isFullDid,
        logout,
        unlockDid,
        isLocked, 
        tryFetchFullDid
    }

    return (
        <DidContext.Provider value={value}>
            {children}
        </DidContext.Provider>
    );
};


//Refrences code

// import { Blockchain } from '@kiltprotocol/chain-helpers';
// import { connect, Did, DidUri, init } from '@kiltprotocol/sdk-js';
// import { EncryptionKeyType, VerificationKeyType } from '@kiltprotocol/types';
// import { assert } from '@polkadot/util';
// import React, { createContext, useCallback, useEffect, useMemo, useState } from 'react';

// import { endpoint } from '@credential/app-config/endpoints';
// import UnlockModal from '@credential/react-dids/UnlockModal';
// import { useLocalStorage, useToggle } from '@credential/react-hooks';
// import { useKeystore } from '@credential/react-keystore';

// import { DidKeys$Json, DidsState } from './types';
// import { useDidDetails } from './useDidDetails';

// export const DidsContext = createContext({});

// let blockchain;

// const storageKey = 'credential:didUri';

// init({
//   address: endpoint.endpoint
// });

// let unlockPromiseResolve;
// let unlockPromiseReject;

// const DidsProvider = ({ children }) => {
//   const [isReady, setIsReady] = useState(false);
//   const { addKeystore, keyring, restoreKeystore } = useKeystore();
//   const [didUri, setDidUri, removeDidUri] = useLocalStorage(storageKey);
//   const [isLocked, setIsLocked] = useState(true);
//   const [needUpgrade, setNeedUpgrade] = useState(false);
//   const [unlockOpen, toggleUnlock] = useToggle();
//   const didDetails = useDidDetails(didUri);

//   const tryFetchFullDid = useCallback(async () => {
//     try {
//       if (didUri) {
//         const { identifier, type } = Did.Utils.parseDidUri(didUri);

//         await Did.FullDidDetails.fromChainInfo(
//           type === 'light'
//             ? Did.Utils.getKiltDidFromIdentifier(identifier.slice(2), 'full')
//             : didUri
//         ).then((data) => {
//           if (data !== null) {
//             setDidUri(data.uri);
//             setNeedUpgrade(
//               !(
//                 keyring.getPair(data.authenticationKey.publicKey) &&
//                 data.encryptionKey &&
//                 keyring.getPair(data.encryptionKey.publicKey) &&
//                 data.attestationKey &&
//                 keyring.getPair(data.attestationKey.publicKey) &&
//                 data.delegationKey &&
//                 keyring.getPair(data.delegationKey.publicKey)
//               )
//             );
//           }
//         });
//       }
//     } catch {}
//   }, [didUri, keyring, setDidUri]);

//   useEffect(() => {
//     tryFetchFullDid();
//   }, [tryFetchFullDid]);

//   const isFullDid = useMemo(() => {
//     try {
//       if (didUri) {
//         const { type } = Did.Utils.parseDidUri(didUri);

//         if (type === 'full') {
//           return true;
//         }
//       }
//     } catch {}

//     return false;
//   }, [didUri]);

//   const generateDid = useCallback(
//     (mnemonic, password) => {
//       const json = addKeystore(mnemonic, password);
//       const authenticationAccount = json[0].address;
//       const encryptionAccount = json[1].address;

//       const uri = Did.LightDidDetails.fromDetails({
//         authenticationKey: {
//           publicKey: keyring.getPair(authenticationAccount).publicKey,
//           type:
//             keyring.getPair(authenticationAccount).type === 'sr25519'
//               ? VerificationKeyType.Sr25519
//               : VerificationKeyType.Ed25519
//         },
//         encryptionKey: {
//           publicKey: keyring.getPair(encryptionAccount).publicKey,
//           type: EncryptionKeyType.X25519
//         }
//       }).uri;

//       setDidUri(uri);

//       return {
//         didUri: uri,
//         keys: json
//       };
//     },
//     [addKeystore, keyring, setDidUri]
//   );

//   const restoreDid = useCallback(
//     (text, password) => {
//       const json = JSON.parse(text);

//       assert(json.didUri, 'not didUri key');

//       if (json.keys) {
//         restoreKeystore(json.keys, password);
//       } else {
//         const encoded = json.encoded;
//         const encoding = json.encoding;

//         assert(encoded && encoding, 'did file format error');

//         restoreKeystore({ encoded, encoding }, password);
//       }

//       setDidUri(json.didUri);
//     },
//     [restoreKeystore, setDidUri]
//   );

//   const backupDid = useCallback(
//     (password) => {
//       if (didDetails) {
//         return {
//           didUri: didDetails.uri,
//           keys: didDetails.getKeys().map((key) => keyring.getPair(key.publicKey).toJson(password))
//         };
//       }

//       return null;
//     },
//     [didDetails, keyring]
//   );

//   const logout = useCallback(() => {
//     setIsLocked(true);

//     if (didDetails) {
//       didDetails.getKeys().forEach((key) => {
//         const account = keyring.getAccount(key.publicKey);

//         account && keyring.forgetAccount(account.address);
//       });
//     }

//     removeDidUri();
//   }, [didDetails, keyring, removeDidUri]);

//   const unlockDid = useCallback(
//     (password) => {
//       if (!didDetails) throw new Error("Can't find did details");

//       keyring.getPair(didDetails.authenticationKey.publicKey).unlock(password);
//       didDetails.encryptionKey &&
//         keyring.getPair(didDetails.encryptionKey.publicKey).unlock(password);

//       setIsLocked(false);
//     },
//     [didDetails, keyring]
//   );

//   const unlock = useCallback(() => {
//     return new Promise((resolve, reject) => {
//       unlockPromiseResolve = resolve;
//       unlockPromiseReject = reject;
//       toggleUnlock();
//     });
//   }, [toggleUnlock]);

//   useEffect(() => {
//     connect().then((_blockchain) => {
//       blockchain = _blockchain;
//       setIsReady(true);
//     });
//   }, []);

//   const value = useMemo(
//     () => ({
//       isReady,
//       blockchain,
//       didUri,
//       didDetails,
//       isLocked,
//       isFullDid,
//       needUpgrade,
//       generateDid,
//       restoreDid,
//       backupDid,
//       logout,
//       unlockDid,
//       unlock,
//       tryFetchFullDid
//     }),
//     [
//       backupDid,
//       didUri,
//       didDetails,
//       generateDid,
//       isFullDid,
//       isLocked,
//       isReady,
//       logout,
//       needUpgrade,
//       restoreDid,
//       unlockDid,
//       unlock,
//       tryFetchFullDid
//     ]
//   );

//   return (
//     <DidsContext.Provider value={value}>
//       {children}
//       {unlockOpen && (
//         <UnlockModal
//           did={didUri}
//           onClose={() => {
//             unlockPromiseReject(new Error('User reject'));
//             toggleUnlock();
//           }}
//           onUnlock={() => {
//             unlockPromiseResolve();
//             toggleUnlock();
//           }}
//           open
//           unlockDid={unlockDid}
//         />
//       )}
//     </DidsContext.Provider>
//   );
// };

// export default React.memo(DidsProvider);
