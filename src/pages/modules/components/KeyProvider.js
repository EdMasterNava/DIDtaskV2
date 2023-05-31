import * as React from 'react';
import { Keyring } from './Keyring';
// import { Keyring } from '@polkadot/api';
// import { cryptoWaitReady } from '@polkadot/util-crypto';

const keyring = new Keyring();

const KeystoreContext = React.createContext({});
export function useKeystore() {
    return React.useContext(KeystoreContext);
}

export const KeystoreProvider = ({ children }) => {
    
    const addKeystore = React.useCallback(async(mnemonic, password) => {
        // await cryptoWaitReady();

        const pairOne = keyring.addUri(mnemonic, password, {}, 'sr25519');
        const pairTwo = keyring.addUri(mnemonic, password, {}, 'ed25519');
        const authenticationPublicKey = pairOne.json;
        const encryptionPublicKey = pairTwo.json;

        return [authenticationPublicKey, encryptionPublicKey];

    }, []);

    const value = {
        keyring,
        addKeystore,
    }

    return (
        <KeystoreContext.Provider value={value}>
            {children}
        </KeystoreContext.Provider>
    );
};

//Old addKeystore code

// const result1 = keyring.addUri(mnemonic, password, {}, 'sr25519');
// const result2 = keyring.addUri(mnemonic, password, {}, 'ed25519');
// return [result1.json, result2.json];

//Unused keyProvider functions

// const [allAccounts, setAllAccounts] = React.useState(keyring.getAccounts());

// React.useEffect(() => {
//     const subscription = keyring.accounts.subject.subscribe(() => {
//         setAllAccounts(keyring.getAccounts());
//     });

//     return () => {
//         setTimeout(() => subscription.unsubscribe(), 0);
//     };
// }, []);

// const restoreKeystore = React.useCallback((json, password) => {
//     if (Array.isArray(json)) {
//     json.forEach((j) => {
//         const pair = keyring.createFromJson(j);
//         keyring.addPair(pair, password);
//     });
//     } else {
//     keyring.restoreAccounts(json, password);
//     }
// }, []);

//Unused values

// allAccounts,
// restoreKeystore