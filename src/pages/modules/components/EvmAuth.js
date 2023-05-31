import * as React from 'react';

import { ethers } from 'ethers';

import CardContractArtifact from "../../../contracts/CardContract.json";
import contractAddress from "../../../contracts/contract-address.json";


const EvmContext = React.createContext();
export function useEvmAuth() {
    return React.useContext(EvmContext);
}

export function EvmProvider({ children }) {
  const [extension, setExtension] = React.useState(false);
  const [provider, setProvider] = React.useState();
  const [currentWallet, setCurrentWallet] = React.useState('');
  const [signer, setSigner] = React.useState();
  const [contract, setContract] = React.useState();

  React.useEffect(() => {
    const connect = async() => {
      const set = () => {
        return new Promise(async(resolve) => {
          if(window.ethereum){
            setExtension(() => true);
            setProvider(() => new ethers.providers.Web3Provider(window.ethereum));
            resolve();
          }
        })
      }
      await set();
    }
    connect();
    
    
  }, []); 
  const handleConnectingWallet = async() => {
    if (provider) {
      try {
        const accounts = await provider.send('eth_requestAccounts', []);
        const sign = provider.getSigner();
        const con = new ethers.Contract(contractAddress.CardContract, CardContractArtifact.abi, signer);
        const withSigner = con.connect(sign);
        setCurrentWallet(() => accounts[0]);
        setSigner(() => sign);
        setContract(() => withSigner);
      } 
      catch (error) {
        console.error('Error connecting wallet:', error);
      }
    } else {
      console.error('Ethereum provider not found.');
    }
    console.log('Signer: ', signer); 
  }

  const value = {
    extension,
    provider,
    currentWallet,
    contractAddress: contractAddress.CardContract,
    signer,
    contract,
    handleConnectingWallet
  }

  return (
    <EvmContext.Provider value={value}>
      {children}
    </EvmContext.Provider>
  )
}

//Old useEffect Code

// const connect = async() => {
//     // extension.current = window.ethereum !== undefined;
//     // accounts.current = await window.ethereum.request({ method: 'eth_requestAccounts' });
//     // setCurrentWallet(accounts.current[0]);
//     // const accounts = await provider.send("eth_requestAccounts", []);
//     const providerRPC = {
//         moonbase: {
//             name: 'moonbase-alpha',
//             rpc: 'https://rpc.api.moonbase.moonbeam.network',
//             chainId: 1287,
//         }
//     };
//     const privateKey= "9d8b8e61883e87c8c71ae186d1c2fbc910cd8c6057fa312ce69fea97da273e70";
//     const provider = new ethers.providers.JsonRpcProvider(providerRPC.moonbase.rpc, {
//         chainId: providerRPC.moonbase.chainId,
//         name: providerRPC.moonbase.name
//     });
//     let wallet = new ethers.Wallet(privateKey, provider);
//     console.log(wallet);
//     const contract = new ethers.Contract(contractAddress.CardContract, CardContractArtifact.abi, wallet);
    
//     const retrieveCard = await contract.getCard(5);
//     // const receipt = await contract.createCard('new text');
//     // await receipt.wait();

//     console.log(`Retrieving: ${retrieveCard}`);
//     // console.log(`Tx successful with hash: ${receipt.hash}`);

// // if(accounts.current){
        
// }
// connect();

//Old handleConnectingWallet Code

// setProvider(() => {
//     return new ethers.providers.Web3Provider(window.ethereum);
// });
// console.log(provider);
// const accounts = await provider.send("eth_requestAccounts", []);
// setCurrentWallet(() => {
//     return accounts[0];
// });
// console.log(currentWallet)
// setNetwork(() => {
//     console.log(provider?._network)
//     return provider?._network;
// });

// setSigner(() => {
//     console.log(provider.getSigner())
//     return provider.getSigner();

// const receipt = await withSigner.createCard('newest test');
// await receipt.wait();
// console.log(`Tx successful with hash: ${receipt.hash}`);
// const retrieveCard = await withSigner.getCard(1);
// console.log(retrieveCard);
// });