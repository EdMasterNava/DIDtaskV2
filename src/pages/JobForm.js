import * as React from 'react';

import {
    Box
} from '@mui/material';

import FormPageOne from './modules/components/FormPageOne';
import FormPageTwo from './modules/components/FormPageTwo';
import FormPageThree from './modules/components/FormPageThree';

//Applies Material UI Theme
import withRoot from './modules/styles/withRoot';
import { useEvmAuth } from './modules/components/EvmAuth';

function JobForm() {
    const [title, setTitle] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [certifications, setCertification] = React.useState('');
    const [page, setPage] = React.useState(0);
    const { contract, currentWallet } = useEvmAuth();
    const handleInput = (event) => {
        const e = event.target;
        if(e.id === 'title'){
            setTitle(e.value);
        }
        if(e.id === 'description'){
            setDescription(e.value);
        }
        if(e.id === 'certifications'){
            setCertification(e.value);
        }
    }
    const nextPage = () => {
        if(page < 2){
            setPage(prev => prev + 1);
        }
    }
    const previousPage = () => {
        if(page >= 0){
            setPage(prev => prev - 1);
        }
    }
    const handleSubmit = async () => {
        const newData = {"title": title, "description": description, "certifications": certifications, "signer": currentWallet};
        const currentCardCount = await getCardCount();
        let oldData = null;
        await contract?.getCard(currentCardCount).then(result => {
            // console.log(result);
            oldData = JSON.parse(result[1]);
        })
        // console.log("Old Data: ", oldData);
        oldData.push(newData);
        // console.log("Old Data +  New Data: ", oldData);
        const data = JSON.stringify(oldData);
        // console.log("New Data: ", data);
        try{
            const receipt = await contract.createCard(data);
            await receipt.wait();
            console.log(`Tx successful with hash: ${receipt.hash}`);
        }
        catch(error){
            console.error('Error creating card:', error);
        }
        
    }
    const getCardCount = async() => {
        let cardCount = null;
        await contract?.cardCount().then(result => {
            cardCount = result.toNumber();
        })
        console.log(cardCount);
        return cardCount;
    }
    const pages = [ 
        <FormPageOne 
            page={page} 
            handleInput={handleInput} 
            title={title} 
            nextPage={nextPage}
        />, 
        <FormPageTwo 
            page={page} 
            handleInput={handleInput} 
            description={description} 
            nextPage={nextPage}
            previousPage={previousPage}
        />,
        <FormPageThree 
            page={page} 
            handleInput={handleInput} 
            certifications={certifications}
            handleSubmit={handleSubmit}
            previousPage={previousPage}
        />
    ]
    return (
        <>
            <Box sx={{height: '100vh', display: 'flex', flexDirection: 'column'}}>
                <Box sx={{height: 60}}/>
                <Box sx={{flexGrow: 1, display: 'flex', flexDirection: 'column'}}>
                    { pages[page] }
                </Box>
            </Box>
        </>
    );
}

export default withRoot(JobForm);