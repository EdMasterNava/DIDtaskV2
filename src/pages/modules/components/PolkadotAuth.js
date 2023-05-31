import * as React from 'react';

import { /**/ApiPromise, WsProvider } from '@polkadot/api';
// import { web3Enable, web3Accounts } from '@polkadot/extension-dapp';

const WalletContext = React.createContext();
export function useWalletAuth() {
    return React.useContext(WalletContext);
}

export function WalletProvider({ children }) {
    const extension = React.useRef([]);
    const accounts = React.useRef([]);
    const [currentWallet, setCurrentWallet] = React.useState('');
    const [currentChain, setCurrentChain] = React.useState('Polkadot');
    const [api, setApi] = React.useState()
    const parachain = {
        // Kilt: '',
        Polkadot: 'wss://rpc.polkadot.io',
        Moonbeam: 'wss://moonbeam.public.blastapi.io',
        Moonriver: 'wss://moonriver.public.blastapi.io'
    }
    React.useEffect(() => {
        const connect = async() => {
            // extension.current = await web3Enable('DIDtask');
            // accounts.current = await web3Accounts();
            extension.current = [{address: '5ES1EPZ5tYdZhj9aN9dwYCpqPko1EL7mTv2Z4L2LRuF6bjMz'}];
            accounts.current = [{address: '5ES1EPZ5tYdZhj9aN9dwYCpqPko1EL7mTv2Z4L2LRuF6bjMz'}];
            setCurrentWallet(accounts.current[0]?.address);
        }
        if(accounts.current.length === 0){
            connect();    
        }
    }, [accounts]);

    React.useEffect(() => {
        const connectChain = async() => {
            const paraC = {
                // Kilt: '',
                Polkadot: 'wss://rpc.polkadot.io',
                Moonbeam: 'wss://moonbeam.public.blastapi.io',
                Moonriver: 'wss://moonriver.public.blastapi.io'
            }
            const wsProvider = new WsProvider(paraC[currentChain]);
            setApi(await ApiPromise.create({ provider: wsProvider }));
        }
        connectChain();
    }, [currentChain]);

    const handleChainChange = (chain) => {
        return new Promise((resolve) => {
           setCurrentChain(chain);
           resolve();
        })
    }

    const value = {
        extension: extension.current,
        currentWallet,
        currentChain,
        parachain,
        api,
        handleChainChange,
    }

    return (
        <WalletContext.Provider value={value}>
            {children}
        </WalletContext.Provider>
    )
}