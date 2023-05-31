import * as React from 'react';

import {
    Box, 
    Paper, 
    Dialog,
    FormControl,
    InputLabel,
    FilledInput,
    Divider,
    Button,
    Typography,
    IconButton,
} from '@mui/material';

import { Close } from '@mui/icons-material';

import { mnemonicValidate } from '@polkadot/util-crypto';

import { useDid } from './DidProvider';
import { useEvmAuth } from './EvmAuth';
import InputPassword from './InputPassword';

import style from '../styles/styles';
// import CreatePassword from './CreatePassword';

function RestoreDidMenu(props) {
    const css = style();

    const { onClose, open } = props;
  
    const handleClose = () => {
        onClose();
    };
    const { generateDid } = useDid();
    const { signer, currentWallet } = useEvmAuth();
    const [mnemonic, setMnemonic] = React.useState();
    const [password, setPassword] = React.useState();

    const isMnemonic = React.useMemo(() => mnemonic && mnemonicValidate(mnemonic), [mnemonic]);

    const restore = React.useCallback(() => {
        if (!mnemonic) return;
        if (!isMnemonic) return;
        if (!password) {
            try {
                generateDid(mnemonic);
                handleClose();
            } catch (error) {
                console.log(error);
            }
            return
        };

        try {
            generateDid(mnemonic, password);
            handleClose();
        } catch (error) {
            console.log(error);
        }
    }, [generateDid, isMnemonic, mnemonic, handleClose, password]);

    const restoreWithMoon = React.useCallback(async() => {
        if (!mnemonic) return;
        if (!isMnemonic) return;

        const message = `Password for DIDtask signing with Moonbase Alpha wallet ${currentWallet}`;
        await signer.signMessage(message).then(async (result) => {
            const uriAndKey = await generateDid(mnemonic, result);
            handleClose();
            console.log(uriAndKey); 
        }).catch(error => {
            console.log(error);
        });
    }, [generateDid, isMnemonic, mnemonic, handleClose, password]);

    const requirementsMet = mnemonic && isMnemonic;

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
                    Restore DID Account
                </Typography>
            </Box>
            <Box sx={{px: 5, my: 3}}>
                <FormControl error={!!mnemonic && !isMnemonic} fullWidth variant="filled" sx={{bgcolor: 'whitesmoke'}}>
                    <InputLabel shrink sx={{'&.Mui-focused': { color: 'inherit' }}}>Mnemonic Phrase</InputLabel>
                    <FilledInput
                        fullWidth
                        notched
                        onChange={(e) => setMnemonic(e.target.value)}
                        placeholder="Enter 12 word Mnemonic Phrase"
                        value={mnemonic}
                    />
                </FormControl>
                <FormControl fullWidth variant="filled" sx={{bgcolor: 'whitesmoke', mt: 3}}>
                    <InputLabel shrink sx={{'&.Mui-focused': { color: 'inherit' }}}>Enter password</InputLabel>
                    <InputPassword
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                    />
                </FormControl>
                <Button
                    sx={{bgcolor: `${!requirementsMet ? '#37383D' : '#D359BD'}`, mt: 3, '&:hover': {backgroundColor: 'rgba(211, 89, 189, 0.8)'}, px: 5, py: 1, borderRadius: 10}}
                    disabled={!requirementsMet}
                    fullWidth
                    onClick={restore}
                >
                    <Typography sx={{color: 'whitesmoke'}}>
                        Restore
                    </Typography>
                </Button>
                <Box sx={{display: 'flex', justifyContent: 'space-between', my: 3, alignItems: 'center'}}>
                    <Box sx={{borderBottom: '1px solid whitesmoke', height: 1, flexGrow: 1}} />
                    <Typography sx={{color: 'whitesmoke', flexGrow: 0, px: 1}}>
                        OR
                    </Typography>
                    <Box sx={{borderBottom: '1px solid whitesmoke', height: 1, flexGrow: 1}} />
                </Box>
                <Button
                    sx={{bgcolor: `${!requirementsMet ? '#37383D' : '#D359BD'}`, '&:hover': {backgroundColor: 'rgba(211, 89, 189, 0.8)'}, px: 5, py: 1, borderRadius: 10}}
                    disabled={!requirementsMet}
                    fullWidth
                    onClick={restoreWithMoon}
                >
                    <Typography sx={{color: 'whitesmoke'}}>
                        Sign With Moonbase Alpha
                    </Typography>
                </Button>
            </Box>
        </Dialog>
    );
}

export default RestoreDidMenu;