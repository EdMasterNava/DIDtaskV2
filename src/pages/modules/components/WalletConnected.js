import * as React from 'react';

import {
    Box,
    Button,
    Typography,
    Tooltip,
    IconButton,
    Avatar
} from '@mui/material';

import { useEvmAuth } from './EvmAuth';
import AccountMenu from './AccountMenu';
import ProviderMenu from './ProviderMenu';

import style from '../styles/styles';

function WalletConnected() {
    const css = style();

    const { currentWallet, provider } = useEvmAuth();
    const chainId = provider?._network?.chainId;
    const isChainMoonbeam = chainId === 1287;
    const settings = ['My Tasks', 'Create DID'];

    const [connectedChainName, setConnectedChainName] = React.useState('Connected')
    React.useEffect(() => {
        const timer = setTimeout(() => {
            setConnectedChainName('Moonbase Alpha');
        }, 2000);
        
        return () => clearTimeout(timer);
    }, []);

    const [anchorAccountMenu, setAnchorAccountMenu] = React.useState(null);
    const handleAccountMenuOpen = (event) => {
        setAnchorAccountMenu(event.currentTarget);
    };
    const handleAccountMenuClose = () => {
        setAnchorAccountMenu(null);
    };

    const providers = ['Kilt','Moonbeam Alpha'];

    const handleProviderChange = async (event) => {
        const chain = event.currentTarget.id;
        // await handleChainChange(chain)
        setConnectedChainName(chain);
        // handleProviderMenuClose();
    };

    const [anchorProviderMenu, setAnchorProviderMenu] = React.useState(null);
    const handleProviderMenuOpen = (event) => {
        // setAnchorProviderMenu(event.currentTarget);
    };
    const handleProviderMenuClose = () => {
        // setAnchorProviderMenu(null);
    };

    return (
        <>
            <Box sx={{...css.flexCenter}}>
                {isChainMoonbeam ?
                    <Button disabled onClick={handleProviderMenuOpen} sx={{...css.walletConnectedButton}}>
                        <Typography sx={{...css.walletButtonText}}>
                            {connectedChainName}
                        </Typography>
                    </Button> 
                    :
                    <Tooltip title="Connect to Moonbeam on MetaMask">
                        <Button onClick={handleProviderMenuOpen} sx={{...css.walletConnectedButton}}>
                            <Typography sx={{...css.walletButtonText}}>
                                Invalid Chain
                            </Typography>
                        </Button>    
                    </Tooltip>
                    
                }
                <ProviderMenu 
                    anchorProviderMenu={anchorProviderMenu} 
                    providers={providers} 
                    handleProviderChange={handleProviderChange} 
                    handleProviderMenuClose={handleProviderMenuClose}
                />
                <Tooltip title="Account">
                    <IconButton onClick={handleAccountMenuOpen} sx={{ p: 0 }}>
                        <Avatar sx={{p: .5, bgcolor: 'darkcyan'}}>
                            <Typography variant='body2' sx={{...css.avatarText}}>
                                {currentWallet}
                            </Typography>
                        </Avatar>
                    </IconButton>
                </Tooltip>
                <AccountMenu 
                    anchorAccountMenu={anchorAccountMenu} 
                    handleAccountMenuClose={handleAccountMenuClose} 
                    settings={settings}
                />
            </Box>     
        </>
    );
}

export default WalletConnected;