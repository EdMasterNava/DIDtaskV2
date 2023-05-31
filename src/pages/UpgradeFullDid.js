import * as React from 'react';
import { Box, Typography } from '@mui/material';

import FormatBalance from './modules/components/FormatBalance';
import { useDid } from './modules/components/DidProvider';
import FullDidCreator from './modules/components/FullDidCreator';
import withRoot from './modules/styles/withRoot';

const UpgradeFullDid = () => {
    const { blockchain } = useDid();

    return (
        <>
            <Box sx={{height: 60}}/>
            <Box sx={{ width: 460, margin: '40px auto' }}>
                <Typography variant="h2" sx={{ textAlign: 'center', color: 'whitesmoke', letterSpacing: 2}} >
                    Upgrade to FullDID
                </Typography>
                <Typography sx={{ mt: 2, mb: 4.5, color: 'darkgray', textAlign: 'center'}} >
                    To unlock all functions of the attester, you need to upgrade your account to fullDID. You
                    need to stake <FormatBalance value={blockchain.api.consts.did.deposit} /> KILT for this step.
                </Typography>
                <FullDidCreator />
            </Box>
        </>
        
    );
};

export default withRoot(React.memo(UpgradeFullDid));