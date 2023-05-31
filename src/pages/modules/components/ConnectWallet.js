import * as React from 'react';

import {
    Box,
    Button,
    Typography
} from '@mui/material';

import NoWallet from './NoWallet';

import { useEvmAuth } from './EvmAuth';

import style from '../styles/styles';

function ConnectWallet() {
    const css = style();
    const { extension, handleConnectingWallet } = useEvmAuth();

    const [noWalletOpen, setNoWalletOpen] = React.useState(false);

    const handleClickOpen = () => {
        if (!extension){
            setNoWalletOpen(true);
        } else{
            handleConnectingWallet();
        }
    };

    const handleClose = () => {
        setNoWalletOpen(false);
    };

    return (
        <>
            <Box sx={{...css.flexCenter}}>
                <Button onClick={handleClickOpen} sx={{...css.connectWalletButton}}>
                    <Typography sx={{...css.walletButtonText}}>
                        Connect Wallet
                    </Typography>
                </Button> 
            </Box>  
            <NoWallet open={noWalletOpen} onClose={handleClose} />
        </>
    );
}

export default ConnectWallet;