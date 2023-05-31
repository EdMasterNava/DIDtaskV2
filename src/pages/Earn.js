import * as React from 'react';
import {} from 'ethers'
import {
    Box,
    Typography
} from '@mui/material';

//Applies Material UI Theme
import withRoot from './modules/styles/withRoot';
import { useEvmAuth } from './modules/components/EvmAuth';

function Earn() {
    const { contract } = useEvmAuth();
    const [card, setCard] = React.useState();
    React.useEffect(() => {
        setCard(async() => {
            await contract.getCard(9).then(result => {
                const array = result;
                setCard(() => array);
            })
        });
    }, [contract]); 

    return (
        <>
            <Box sx={{height: '100vh', display: 'flex', flexDirection: 'column'}}>
                <Box sx={{height: 60}}/>
                <Box sx={{flexGrow: 1, display: 'flex', justifyContent: 'center'}}>
                    <Box sx={{height: 400, width: 300, border: '2px solid whitesmoke', p: 2}}>
                        <Typography variant='h6' sx={{color: 'whitesmoke'}}>
                            Card ID: {card ? card[0]?.toNumber() : ''}
                        </Typography>
                        <Typography variant='h6' sx={{color: 'whitesmoke'}}>
                            Card Content: {card ? card[1] : ''}
                        </Typography>
                    </Box>
                </Box>
            </Box>
            
        </>
    );
}

export default withRoot(Earn);