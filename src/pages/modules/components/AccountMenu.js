import * as React from 'react';
import { Link } from 'react-router-dom';
import {
    Box,
    Menu,
    Avatar,
    Divider,
    Tooltip,
    MenuItem,
    ListItem,
    IconButton,
    Typography,
    ListItemText,
    ListItemSecondaryAction,
} from '@mui/material';

import AddCircleIcon from '@mui/icons-material/AddCircle';

import DidCreationMenu from './DidCreationMenu';
import RestoreDidMenu from './RestoreDidMenu';
import FormatBalance from './FormatBalance';
import DidName from './DidName';
import Copy from './Copy';
import { Address } from './Address';
import { useDid } from './DidProvider';
import { useBalance } from './useBalance';

import { useEvmAuth } from './EvmAuth';
import style from '../styles/styles';

function AccountMenu(props) {
    const css = style();

    const { didUri, didDetails, isFullDid, logout } = useDid();
    const { currentWallet } = useEvmAuth();
    const mediumWallet = currentWallet.slice(0, 17) + '...' + currentWallet.slice(-4);
    const shortWallet = currentWallet.slice(0, 10) + '...' + currentWallet.slice(-4);

    const balance = useBalance(didDetails?.identifier);

    const anchorAccountMenu = props.anchorAccountMenu;
    const handleAccountMenuClose = props.handleAccountMenuClose;
    const [didMenuOpen, setDidMenuOpen] = React.useState(false);
    const handleDidMenuOpen = () => {
        setDidMenuOpen(true);
        handleAccountMenuClose();
    }
    const handleDidMenuClose = () => {
        setDidMenuOpen(false);
    }
    const [restoreDidMenuOpen, setRestoreDidMenuOpen] = React.useState(false);
    const handleRestoreDidMenuOpen = () => {
        setRestoreDidMenuOpen(true);
        handleAccountMenuClose();
    }
    const handleRestoreDidMenuClose = () => {
        setRestoreDidMenuOpen(false);
    }
    const handleLogout = React.useCallback(() => {
        logout();
        handleAccountMenuClose();
      }, [logout, handleAccountMenuClose]);
    const handleFaucet = () => {
        window.open('https://faucet.peregrine.kilt.io/', '_blank');
    }
    return (
        <>
            <Menu
                sx={{ mt: '45px' }}
                id="account-menu"
                anchorEl={anchorAccountMenu}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(anchorAccountMenu)}
                onClose={handleAccountMenuClose}
                PaperProps={{
                    style: {
                        backgroundColor: '#060708',
                        border: '1px solid #222222'
                    }
                }}
            >
                <Box sx={{px: 2, textAlign: 'center'}}>
                    <Typography sx={{color: 'whitesmoke'}}>
                        Moonbase Alpha Account
                    </Typography>    
                </Box>
                <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 2, gap: 2, mt: 2}}>
                    <Avatar sx={{p: .5, bgcolor: 'darkcyan'}} />
                    <Typography sx={{color: 'whitesmoke'}}>
                        {didUri ? mediumWallet : shortWallet}
                    </Typography>
                </Box> 
                <Divider variant='middle' sx={{bgcolor: '#37383D', mt: 2}}/>
                <Link to='/my-tasks' style={{...css.link}}>
                    <MenuItem onClick={handleAccountMenuClose} disableRipple sx={{'&:hover' : {bgcolor: 'darkslategray'}}}>
                        <Typography sx={{color: 'whitesmoke'}}>
                            Tasks
                        </Typography>
                    </MenuItem>
                </Link>
                <Link to='/my-credentials' style={{...css.link}}>
                    <MenuItem onClick={handleAccountMenuClose} disableRipple sx={{'&:hover' : {bgcolor: 'darkslategray'}}}>
                        <Typography sx={{color: 'whitesmoke'}}>
                            Credentials
                        </Typography>
                    </MenuItem>
                </Link>
                <Link to='/my-claims' style={{...css.link}}>
                    <MenuItem onClick={handleAccountMenuClose} disableRipple sx={{'&:hover' : {bgcolor: 'darkslategray'}}}>
                        <Typography sx={{color: 'whitesmoke'}}>
                            Claims
                        </Typography>
                    </MenuItem>
                </Link>
                {isFullDid && 
                    <Link to='/my-ctypes' style={{...css.link}}>
                        <MenuItem onClick={handleAccountMenuClose} disableRipple sx={{'&:hover' : {bgcolor: 'darkslategray'}}}>
                            <Typography sx={{color: 'whitesmoke'}}>
                                CTypes
                            </Typography>
                        </MenuItem>
                    </Link>
                }
                <Divider variant='middle' sx={{bgcolor: '#37383D'}}/>
                { didUri ?
                    <Box>
                        <Box sx={{px: 2}}>
                            <Typography sx={{color: 'whitesmoke', mt: 1}}>
                                {isFullDid ? 'Full DID' : 'Light DID'}
                            </Typography>
                            <ListItem sx={{bgcolor: '#37383D', display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: 250, height: 50, px: 3, mt: 1, borderRadius: 2.5}}>
                                <ListItemText primary={<DidName value={didUri} />} />
                                <Copy value={didUri}/>
                            </ListItem>
                            <Typography sx={{color: 'whitesmoke', mt: 1}}>
                                DID Address
                            </Typography>
                            <ListItem sx={{bgcolor: '#37383D', display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: 250, height: 50, px: 3, mt: 1, borderRadius: 2.5}}>
                                <Typography sx={{color: 'whitesmoke'}}>
                                    <Address value={didDetails?.identifier} />
                                </Typography>
                                <Copy value={didDetails?.identifier ?? ''} />
                            </ListItem>
                            <ListItem sx={{px: 0, mt: 1}}>
                                <Typography sx={{color: 'whitesmoke'}}>
                                    KILT Balance
                                </Typography> 
                                <ListItemSecondaryAction sx={{...css.flexCenter}}>
                                    <FormatBalance value={balance?.free}/>
                                    <Tooltip title="Get Tokens">
                                        <IconButton onClick={handleFaucet} sx={{p: 0, mr: 0, ml: 1}}>
                                            <AddCircleIcon sx={{color: 'whitesmoke', fontSize: 20}}/>    
                                        </IconButton>
                                    </Tooltip>
                                </ListItemSecondaryAction> 
                            </ListItem>
                        </Box>
                        <Divider variant='middle' sx={{bgcolor: '#37383D'}}/>
                        {!isFullDid &&
                            <>
                                <Link to='/upgrade' style={{...css.link}}>
                                    <MenuItem onClick={handleAccountMenuClose} disableRipple sx={{'&:hover' : {bgcolor: 'darkslategray'}}}>
                                        <Typography sx={{color: 'whitesmoke'}}>
                                            Upgrade to Full DID
                                        </Typography>
                                    </MenuItem>
                                </Link>
                                <Divider variant='middle' sx={{bgcolor: '#37383D'}}/>
                            </>
                        }
                        <MenuItem onClick={handleLogout} disableRipple sx={{'&:hover' : {bgcolor: 'darkslategray'}}}>
                            <Typography sx={{color: 'whitesmoke'}}>
                                Logout
                            </Typography>
                        </MenuItem>
                    </Box> 
                    : 
                    <>
                        <MenuItem onClick={handleDidMenuOpen} disableRipple sx={{'&:hover' : {bgcolor: 'darkslategray'}}}>
                            <Typography sx={{color: 'whitesmoke'}}>
                                Create DID
                            </Typography>
                        </MenuItem>
                        <MenuItem onClick={handleRestoreDidMenuOpen} disableRipple sx={{'&:hover' : {bgcolor: 'darkslategray'}}}>
                            <Typography sx={{color: 'whitesmoke'}}>
                                Restore DID
                            </Typography>
                        </MenuItem>
                    </>
                }
            </Menu>
            <DidCreationMenu open={didMenuOpen} onClose={handleDidMenuClose}/>
            <RestoreDidMenu open={restoreDidMenuOpen} onClose={handleRestoreDidMenuClose} />
        </>
    );
}

export default AccountMenu;