const Kilt = require('@kiltprotocol/sdk-js');
const { naclOpen, naclSeal } = require('@polkadot/util-crypto');
const { config: envConfig } = require('dotenv');
const { connect, Did, VerificationKeyType, init, EncryptionKeyType, fromBody } = require('@kiltprotocol/sdk-js');
//const { generateKeypairs, generateKeyAgreement, generateAccount } = require('./keyGen.js');

init({address: 'wss://peregrine.kilt.io/parachain-public-ws'});


async function generateRequestCredentialMessage(
  senderUri,
  receiverUri,
  cTypeHash
) {
  // Creating a challenge to submit to the receiver
  const challenge = Kilt.Utils.UUID.generate()

  // Sender uri is checked if it is a valid URI
  Did.Utils.validateKiltDidUri(senderUri)
  // Receiver uri is checked if it is a valid URI
  Did.Utils.validateKiltDidUri(receiverUri)

  // The content of the 'request-credential' message
  // It includes a CType that is being requested, this can be for attestation or verification
  // The sender is the trusted attester in the scenario
  const requestCredentialContent = {
    cTypeHash: cTypeHash,
    trustedAttesters: [senderUri],
  }

  const messageBody = {
    type: 'request-credential',
    content: { cTypes: [requestCredentialContent], challenge: challenge },
  }

  // The message will throw an Error if invalid
  const message = new Kilt.Message(messageBody, senderUri, receiverUri)


  //console.log(`Generated message: ${JSON.stringify(message, null, 4)}`)


  return message
}



 async function encryptMessage(
  message,
  senderUri,
  receiverUri,
  keyAgreement
) {


  const { document: senderDocument } = [...senderData.keyRelationships.keyAgreement][0];
  const { document: receiverDocument } = [...receiverData.keyRelationships.keyAgreement][0];
  

console.log('keyAgreementSender:', keyAgreementSender);
console.log('keyAgreementReceiver:', keyAgreementReceiver); 



  const receiverKeyAgreementUri = `${receiverUri}${receiverDocument.keyAgreement?.[0].id}`
  const senderKeyAgreeementUri = `${senderUri}${senderDocument.keyAgreement?.[0].id}`
  // encrypt the message


  const encryptedMessage = await Kilt.Message.encrypt(
    message,
    useEncryptionCallback({
      keyAgreement,
      keyAgreementUri: senderKeyAgreeementUri,
    }),
    receiverKeyAgreementUri
  )

  //console.log(`Encrypted Message: ${JSON.stringify(encryptedMessage, null, 4)}`)

  return encryptedMessage
}




 async function decryptMessage(encryptedMessage, keyAgreement) {
  // Decrypting the message to retrieve the content
  const decryptedMessage = await Kilt.Message.decrypt(
    encryptedMessage,
    useDecryptionCallback(keyAgreement)
  )

  // Verifying this is a properly-formatted message
  Kilt.Message.verify(decryptedMessage)

  console.log(`Decrypted Message: ${JSON.stringify(decryptedMessage, null, 4)}`)

  // Checking if the message type matches the expected checks
  if (decryptedMessage.body.type !== 'request-credential') {
    throw new Error('Not the correct body type')
  }

  // Destructing the message to receive the cTypes array to see what credentials
  // Are valid for the given request
  const { cTypes } = decryptedMessage.body.content

  const { cTypeHash, trustedAttesters } = cTypes[0]

  // The receiver can check if they have a valid credential that matches the cTypeHash
  console.log('The sent cType hash :', cTypeHash)

  // The trusted attesters is an array that includes the list of trusted entities
  // The receiver can check if they have a given credential from the trusted list
  console.log(`A list of trusted attesters DID :${trustedAttesters}`)

  return decryptedMessage
}


 async function useEncryptionCallback({
    keyAgreement,
    keyAgreementUri
  }) {
    return async function encryptCallback({
      data,
      peerPublicKey
    }) {
      const { sealed, nonce } = naclSeal(
        data,
        keyAgreement.secretKey,
        peerPublicKey
      );
      return {
        nonce,
        data: sealed,
        keyUri: keyAgreementUri
      };
    };
  }
  
  async function useDecryptionCallback(keyAgreement) {
    return async function decryptCallback({
      data,
      nonce,
      peerPublicKey
    }) {
      const decrypted = naclOpen(
        data,
        nonce,
        peerPublicKey,
        keyAgreement.secretKey
      );
  
      if (!decrypted) {
        throw new Error('Failed to decrypt with given key');
      }
  
      return {
        data: decrypted
      };
    };
  }
  




  async function tryFetchFullDid(Uri) {
    try {
        if (didUri) {
            const { identifier, type } = Did.Utils.parseDidUri(didUri);
            // console.log('Identifier: ', identifier);
            // console.log('Type: ', type);
            // console.log(
            //     Did.Utils.getKiltDidFromIdentifier(identifier.slice(2), 'full')
            // )
            const data = await Did.FullDidDetails.fromChainInfo(Uri);
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
        }
    } catch (error) {
        // Handle the error here
    }
}



if (require.main === module) {
  (async () => {
    envConfig();

    try {
      await connect();

      const senderUri = process.env.ATTESTER_DID_URI;
      const receiverUri = process.env.CLAIMER_FULL_DID_URI;
      const cTypeHash = process.env.DIDTASK_CTYPE_HASH;

      console.log('senderUri:', senderUri);
      console.log('receiverUri:', receiverUri);
      console.log('cTypeHash:', cTypeHash);

      const message = generateRequestCredentialMessage(senderUri, receiverUri, cTypeHash);

      const receiverData = await Did.FullDidDetails.fromChainInfo(receiverUri)
      const senderData = await Did.FullDidDetails.fromChainInfo(senderUri);


    

      let keyAgreementSender = [...senderData.keyRelationships.keyAgreement]
      let keyAgreementReceiver = [...receiverData.keyRelationships.keyAgreement]

console.log('keyAgreementSender:', keyAgreementSender);
console.log('keyAgreementReceiver:', keyAgreementReceiver); 



     // console.log('senderData:', senderData);
     // console.log('receiverData:', receiverData);
      
    //  console.log('senderData.keyRelationships:', senderData.keyRelationships);
     // console.log('receiverData.keyRelationships:', receiverData.keyRelationships);
      

      let keyAgreement = null;
      if (senderData && senderData.keyRelationships && senderData.keyRelationships.keyAgreement && senderData.keyRelationships.keyAgreement.length > 0) {
          keyAgreement = senderData.keyRelationships.keyAgreement[0];
      }

      let receiverKeyAgreement = null;
      if (receiverData && receiverData.keyRelationships && receiverData.keyRelationships.keyAgreement && receiverData.keyRelationships.keyAgreement.length > 0) {
          receiverKeyAgreement = receiverData.keyRelationships.keyAgreement[0];
      }

      if (keyAgreement && receiverKeyAgreement) {
        const encryptedMessage = await encryptMessage(message, senderUri, receiverUri, keyAgreement);
        console.log("Encrypted Message: ", encryptedMessage);
      } else {
        console.log("Either keyAgreement or receiverKeyAgreement is null.");
      }
    } catch (e) {
      console.log('Error');
      throw e;
    } finally {
      Kilt.disconnect();
    }
  })();
}
