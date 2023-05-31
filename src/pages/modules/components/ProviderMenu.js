import * as React from 'react';

import {
    Typography,
    Menu,
    MenuItem
} from '@mui/material';

function ProviderMenu(props) {
    const anchorProviderMenu = props.anchorProviderMenu;
    const handleProviderChange = props.handleProviderChange;
    const handleProviderMenuClose = props.handleProviderMenuClose;
    const providers = props.providers;
    return (
        <Menu
            sx={{ mt: '45px' }}
            id="provider-menu"
            anchorEl={anchorProviderMenu}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={Boolean(anchorProviderMenu)}
            onClose={handleProviderMenuClose}
        >
            {providers.map((chain) => (
                <MenuItem key={chain} id={chain} onClick={handleProviderChange}>
                    <Typography >{chain}</Typography>
                </MenuItem>
            ))}
        </Menu>
    );
}

export default ProviderMenu;