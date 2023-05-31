import * as React from 'react';

import {
    Box,
    Typography
} from '@mui/material';

import OwnerCType from './modules/components/OwnerCTypes';

//Applies Material UI Theme
import withRoot from './modules/styles/withRoot';

function MyCTypes() {
    return (
        <>
            <Box sx={{height: 60}}/>
            <Typography variant="h1" sx={{textAlign: 'center', color: 'whitesmoke'}}>
                My CTypes
            </Typography>
            <OwnerCType />
        </>
    );
}

export default withRoot(MyCTypes);

