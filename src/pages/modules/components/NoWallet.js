import * as React from 'react';

import {
    Box, 
    List, 
    Paper, 
    Dialog,
    ListItem,
    Typography,
    ListItemText, 
    ListItemButton,
} from '@mui/material';

const wallets = ['MetaMask'];

function NoWallet(props) {
    const { onClose, open } = props;
  
    const handleClose = () => {
        onClose()
    };
  
    const handleListItemClick = () => {
        window.open('https://metamask.io/download/', '_blank');
    };
  
    return (
        <Dialog components={Paper} onClose={handleClose} open={open} >
            <Box sx={{minWidth: 400, minHeight: 350, bgcolor: '#121620'}}>
                <Box sx={{py: 1}}>
                    <Typography variant='h4' sx={{color: 'whitesmoke', textAlign: 'center'}}>
                        Select Wallet    
                    </Typography>
                </Box>
                <List sx={{ pt: 0 }}>
                    { wallets.map((wallet, index) => (
                        <ListItem disableGutters key={index}>
                            <ListItemButton onClick={() => handleListItemClick()} key={wallet} >
                                <ListItemText primary={wallet} sx={{color: 'whitesmoke', textAlign: 'center'}}/>
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Dialog>
    );
}

export default NoWallet;