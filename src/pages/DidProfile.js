import * as React from 'react';
import { 
    Box, 
    Container, 
    Stack, 
    Tab, 
    Tabs, 
    Typography 
} from '@mui/material';

import { u8aToHex } from '@polkadot/util';
import { KeyRelationship } from '@kiltprotocol/sdk-js';
import { useDid } from './modules/components/DidProvider';
import { useDidDetails } from './modules/components/useDidDetails';
import { getW3Name } from './modules/components/GetW3Name';
import Copy from './modules/components/Copy';

import style from './modules/styles/styles';

function DidProfile() {
    const css = style();
    return (
        <>
            
        </>
    );
}

export default withRoot(DidProfile);