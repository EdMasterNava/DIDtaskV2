import * as React from 'react';

import {
    Box
} from '@mui/material';

import FormPageOne from './modules/components/FormPageOne';
import FormPageTwo from './modules/components/FormPageTwo';
import FormPageThree from './modules/components/FormPageThree';

//Applies Material UI Theme
import withRoot from './modules/styles/withRoot';
// import { useEvmAuth } from './modules/components/EvmAuth';

function JobForm() {
    const [title, setTitle] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [certifications, setCertification] = React.useState('');
    const [page, setPage] = React.useState(0);
    // const { contract } = useEvmAuth();
    const handleInput = (event) => {
        const {id, value} = event.target;
        if(id === 'title'){
            setTitle(value);
        }
        if(id === 'description'){
            setDescription(value);
        }
        if(id === 'certification'){
            setCertification(value);
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
    const handleClick = async () => {
         try{ 
           const receipt = await contract.createCard(title);
           await receipt.wait();
            console.log(`Tx successful with hash: ${receipt.hash}`);
        }
       catch(error){
            console.error('Error creating card:', error);
         }
        
     }
    const pages = [ 
        <FormPageOne 
            page={page} 
            handleInput={handleInput} 
            title={title} 
            nextPage={nextPage}
        />, 
       /* <FormPageTwo 
            page={page} 
            handleInput={handleInput} 
            description={description} 
            nextPage={nextPage}
            previousPage={previousPage}
        />, */
        <FormPageThree 
            page={page} 
            handleInput={handleInput} 
            certifications={certifications}
            nextPage={nextPage}
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