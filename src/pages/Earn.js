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
    const [list, setList] = React.useState();
    React.useEffect(() => {
        const getCard = async() => {
            let cardCount = null;
            let contentList = null;
            await contract?.cardCount().then(result => {
                cardCount = result.toNumber();
            });

            await contract?.getCard(cardCount).then(result => {
                contentList = JSON.parse(result[1]);
            });
            console.log("Content List: ", contentList);
            setList(() => contentList);
        }
        getCard();
    }, [contract]); 

    return (
        <>
            <Box sx={{height: '100vh', display: 'flex', flexDirection: 'column', px: '5%'}}>
                <Box sx={{height: 60}}/>
                <Typography variant='h2' sx={{color: 'whitesmoke', textAlign: 'center', mb: 5}}>
                    Current Tasks
                </Typography>
                <Box sx={{flexGrow: 1, display: 'flex', gap: 2}}>
                    {list?.map(card => {
                        const title = card.title;
                        const description = card.description;
                        const certifications = card.certifications;
                        const signer = card.signer;
                        return (
                            <Box sx={{height: 300, width: 500, border: '2px solid whitesmoke', p: 2, borderRadius: 5}}>
                                <Typography variant='h6' sx={{color: 'whitesmoke'}}>
                                    Posted by: {signer}
                                </Typography>
                                <Typography variant='h5' sx={{color: 'whitesmoke', mt: 2}}>
                                    {title}
                                </Typography>
                                <Typography variant='h6' sx={{color: 'whitesmoke', mt: 2}}>
                                    {description}
                                </Typography>
                                <Typography variant='h6' sx={{color: 'whitesmoke', mt: 2}}>
                                    Certifications: {certifications}
                                </Typography>
                            </Box>    
                        )
                    })}
                </Box>
            </Box>
            
        </>
    );
}

export default withRoot(Earn);