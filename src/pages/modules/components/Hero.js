import * as React from 'react';
import {
    Box,
    Grid,
    Button,
    Typography
} from '@mui/material';

// import * as Kilt from '@kiltprotocol/sdk-js';
// import { useWalletAuth } from './PolkadotAuth';

import style from '../styles/styles';

import img from  './media/large-hero-img.webp';

function Hero() {
    const css = style();
    // const { currentChain, api } = useWalletAuth();

    const connectKiltTestnet = async() => {
        // await Kilt.connect('wss://peregrine.kilt.io/parachain-public-ws');

        // const api = Kilt.ConfigService.get('api')
        // console.log(api);
        // const encodedJohnDoeDetails = await api.call.did.queryByWeb3Name('didtask-test')

        // // This function will throw if johnDoeOwner does not exist
        // const {
        // document: { uri }
        // } = Kilt.Did.linkedInfoFromChain(encodedJohnDoeDetails)
        
        // console.log(`My name is john_doe and this is my DID: "${uri}"`)
    }

    return (
        <>  
            <Box sx={{...css.navHeroContainer, ...css.heroContainer}}>
                <Box sx={{...css.heroContainer, width: '100%', flexDirection: 'column' /*bgcolor: 'darkred'*/}}>
                    <Box sx={{height: 60, position: 'relative'}}/>
                    <Box sx={{flexGrow: 1}}>
                        <Grid container sx={{width: '100%', height:'100%'}}>
                            <Grid item xs={6} sx={{width: '100%', height:'100%', pl: '5%', pt: '10%', /*bgcolor: 'darksalmon'*/}}>
                                <Box sx={{maxWidth: 600}}>
                                    <Typography variant='h2' sx={{color: 'whitesmoke', letterSpacing: 1}}>
                                        Connect to <span style={{color: '#007DF1'}}>Freelancers</span> with DID-Verified Qualifications
                                    </Typography>    
                                </Box>
                                <Box sx={{mt: 3}}>
                                    <Button variant='contained' sx={{mr: 2, px: 5, bgcolor: '#D359BD', '&:hover': {backgroundColor: 'rgba(211, 89, 189, 0.8)'}}}>
                                        <Typography sx={{color: 'whitesmoke'}}>
                                            Create a Task
                                        </Typography>
                                    </Button>   
                                    <Button onClick={connectKiltTestnet} variant='outlined' sx={{border: '1px solid whitesmoke', px: 5, '&:hover': {border: '1px solid whitesmoke', backgroundColor: 'rgba(217, 217, 217, 0.12)'}}}>
                                        <Typography sx={{color: 'whitesmoke'}}>
                                            Earn By Completing Tasks
                                        </Typography>
                                    </Button> 
                                </Box>
                            </Grid>
                            <Grid item xs={6} sx={{width: '100%', height:'100%', position: 'relative', display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-start', /*bgcolor: 'darkcyan'*/}}>
                                <img src={img} alt="iLady" style={{width: 'auto', height: 'auto', maxWidth: '100%', maxHeight: '100%', position: 'absolute', bottom: 0, left: 0}}/>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Box>
        </>
    )
}

export default Hero;