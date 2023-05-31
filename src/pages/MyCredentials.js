import * as React from 'react';

import {
    Box,
    Typography
} from '@mui/material';

//Applies Material UI Theme
import withRoot from './modules/styles/withRoot';

function MyCredentials() {
    return (
        <>
            <Box sx={{height: 60}}/>
            <Typography variant="h1" sx={{textAlign: 'center', color: 'whitesmoke'}}>
                My Credentials
            </Typography>
        </>
    );
}

export default withRoot(MyCredentials);