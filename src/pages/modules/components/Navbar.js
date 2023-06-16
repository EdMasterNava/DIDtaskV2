import * as React from 'react';
import {
    Box,
    Typography
} from '@mui/material';

import ConnectWallet from './ConnectWallet';
import WalletConnected from './WalletConnected';

import { Link } from 'react-router-dom';

import { useEvmAuth } from './EvmAuth';

import withRoot from '../styles/withRoot';
import style from '../styles/styles';

function Navbar() {
    const css = style();

    const { currentWallet } = useEvmAuth();
   
  return (
    <>
        <Box sx={{...css.navbar}}>
            <Box sx={{...css.navbarLeftSection}}>
                <Box sx={{...css.navbarTitle}}>
                    <Link to="/DIDtaskV2/" style={{...css.link}}>
                        <Box>
                            <Typography variant='h5' sx={{...css.navbarPaddingAndColor}}>
                                DIDtask
                            </Typography>
                        </Box>
                    </Link>
                </Box>
                {/* <Box sx={{...css.flexCenter}}>
                    <Link to="/job-form" style={{...css.link}}>
                        <Box sx={{mr: 2}}>
                            <Typography varaint='h6' sx={{...css.navbarPaddingAndColor}}>
                                Find Talent
                            </Typography>
                        </Box>
                    </Link>
                    <Link to="/earn" style={{...css.link}}>
                        <Box sx={{mr: 2}}>
                            <Typography sx={{...css.navbarPaddingAndColor}}>
                                Find Work
                            </Typography>
                        </Box>
                    </Link>
                    <Link to="/whatsDID" style={{...css.link}}>
                        <Box sx={{mr: 2}}>
                            <Typography sx={{...css.navbarPaddingAndColor}}>
                                What's DID
                            </Typography>
                        </Box>
                    </Link>
                </Box> */}
            </Box>

            <Box sx={{...css.navbarRightSection}}>
                { currentWallet ? <WalletConnected /> : <ConnectWallet /> }
            </Box>
        </Box>
    </>
  )
}

export default withRoot(Navbar);