import * as React from 'react';

import {
    Box, 
    Paper, 
    Dialog,
    Typography,
    IconButton,
} from '@mui/material';

import { Close } from '@mui/icons-material';

import { useDid } from './DidProvider';
import { useEvmAuth } from './EvmAuth';
import { generateMnemonic } from './GenerateMnemonic';

import style from '../styles/styles';
import RememberMnemonic from './RememberMnemonic';
import ComfirmMnemonic from './ComfirmMnemonic';
// import CreatePassword from './CreatePassword';

function DidCreationMenu(props) {
    const css = style();
    
    const { generateDid } = useDid();
    const { signer, currentWallet } = useEvmAuth();
    const [step, setStep]= React.useState(0);
    const mnemonic = React.useMemo(() => generateMnemonic(), [])

    const { onClose, open } = props;
  
    const handleClose = () => {
        onClose();
    };

    const nextStep = React.useCallback(() => {
        setStep((step) => step + 1);
    }, []);
    const prevStep = React.useCallback(() => {
        setStep((step) => step - 1);
    }, []);

    const createDIDwithMoon = async() => {
        const message = `Password for DIDtask signing with Moonbase Alpha wallet ${currentWallet}`;
        await signer.signMessage(message).then(async (result) => {
            const uriAndKey = await generateDid(mnemonic, result);
            handleClose();
            console.log(uriAndKey); 
        }).catch(error => {
            console.log(error);
        });
        
    }
    
    const createDIDwithPass = async(password) => {
        const uriAndKey = await generateDid(mnemonic, password);
        handleClose();
        console.log(uriAndKey);
    }
    return (
        <Dialog 
            components={Paper} 
            open={open} 
            PaperProps={{
                style: {
                    border: '1px solid #060708',
                    backgroundColor: '#121620',
                    width: '700px',
                    paddingBottom: '10px'
                }
            }}
        >
            <Box sx={{display: 'flex', justifyContent: 'flex-end', pt: 1, pr: 1}}>
                <IconButton onClick={handleClose}>
                    <Close sx={{color: 'whitesmoke', fontSize: 25}}/>    
                </IconButton>
            </Box>
            <Box sx={{...css.flexCenter}}>
                <Typography variant='h4' sx={{color: 'whitesmoke'}}>
                    Create DID Account
                </Typography>
            </Box>
            <Box>
                {/* {step === 0 && <CreatePassword handlePassword={handlePassword}/>} */}
                {step === 0 && 
                    <RememberMnemonic 
                        mnemonic={mnemonic} 
                        prevStep={prevStep} 
                        nextStep={nextStep}
                    />
                }
                {step === 1 && 
                    <ComfirmMnemonic 
                        mnemonic={mnemonic} 
                        prevStep={prevStep} 
                        createDIDwithMoon={createDIDwithMoon} 
                        createDIDwithPass={createDIDwithPass}
                    />
                }
            </Box>
        </Dialog>
    );
}

export default DidCreationMenu;

//Old createDID code


// console.log(json);
// const authenticationAccount = await json[0]?.address;
// const encryptionAccount = await json[1]?.address;
// const authenticationKey = [{
//     publicKey: keyring.getPair(authenticationAccount).publicKey,
//     type:  verificationKeyTypes[0]
// }];

// const encryptionKey = [{
//     publicKey: keyring.getPair(encryptionAccount).publicKey,
//     type: encryptionKeyTypes[0]
// }];

// const lightDidDetails = {
//     authenticationKey,
//     encryptionKey
// };

// const did = Did.LightDidDetails.fromDetails(lightDidDetails);
// const service = [
//     {
//         id: '#DIDtask',
//         type: ['KiltPublishedCredentialCollectionV1'],
//         serviceEndpoint: ['http://example.domain.org']
//     }
// ]
// const uri = Did.createLightDidDocument({authenticationKey, encryptionKey}).uri;

// console.log(uri);
