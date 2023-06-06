const path = require('path');
const dotenv = require('dotenv');
const { mnemonicGenerate, blake2AsU8a, keyExtractPath, keyFromPath, mnemonicToMiniSecret, sr25519PairFromSeed } = require('@polkadot/util-crypto');
const Kilt = require('@kiltprotocol/sdk-js');

const { config: envConfig } = require('dotenv');

dotenv.config({ path: path.join(__dirname, '..', '.env') });

function generateAccount(mnemonic = mnemonicGenerate()) {
  const keyring = new Kilt.Utils.Keyring({
    ss58Format: 38,
    type: 'sr25519',
  });
  return {
    account: keyring.addFromMnemonic(mnemonic),
    mnemonic,
  };
}



function generateKeyAgreement(mnemonic) {
  const secretKeyPair = sr25519PairFromSeed(mnemonicToMiniSecret(mnemonic));
  const { path } = keyExtractPath('//did//keyAgreement//0');
  const { secretKey } = keyFromPath(secretKeyPair, path, 'sr25519');
  return Kilt.Utils.Crypto.makeKeypairFromSeed(blake2AsU8a(secretKey));
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



function generateKeypairs() {
  const mnemonic = process.env.ATTESTER_ACCOUNT_MNEMONIC;

  const { account } = generateAccount(mnemonic);

  const authentication = {
    ...account.derive('//did//0'),
    type: 'sr25519',
  };

  const assertionMethod = {
    ...account.derive('//did//assertion//0'),
    type: 'sr25519',
  };

  const capabilityDelegation = {
    ...account.derive('//did//delegation//0'),
    type: 'sr25519',
  };

  const keyAgreement = generateKeyAgreement(mnemonic);

  return {
    authentication: authentication,
    keyAgreement: keyAgreement,
    assertionMethod: assertionMethod,
    capabilityDelegation: capabilityDelegation,
  };
}


if (require.main === module) {
  (async () => {
    envConfig();
try {
  Kilt.init().then(async () => {
    const mnemonic = process.env.ATTESTER_ACCOUNT_MNEMONIC;

    const keyAgreement = generateKeyAgreement(mnemonic);
    console.log('Generated Key Agreement:');
    console.log(keyAgreement);

    const keyPairs = generateKeypairs(mnemonic);
    console.log('Generated Keypairs:');
    console.log(keyPairs);
  });
} catch (e) {
  console.log('Error while setting up attester account');
  throw e;
}
  })(); 
}

console.log("attester keys generated");

module.exports = { generateKeyAgreement, generateKeypairs, generateAccount };