import { Box, Button, Dialog, DialogContent, lighten, Stack, Typography, Paper, FormControl, InputLabel } from '@mui/material';
import React, { useCallback } from 'react';

import FormatBalance from './FormatBalance';;
import DialogHeader from './DialogHeader';
import InputPassword from './InputPassword';

import { useEvmAuth } from './EvmAuth';
import { useDid } from './DidProvider';

const DidsModal = ({ children, onClose, open, steps, title }) => {
  const { didUri, isLocked, unlockDid, blockchain } = useDid();
  const { signer, currentWallet } = useEvmAuth();
  const [password, setPassword] = React.useState('');

  const unlockWithMoon = useCallback(async() => {
    if (!didUri) return;

    const message = `Password for DIDtask signing with Moonbase Alpha wallet ${currentWallet}`;
    await signer.signMessage(message).then(async (result) => {
      unlockDid(result);
    }).catch(error => {
      console.log(error);
    })

  }, [didUri, unlockDid]);

  const unlockWithPass = useCallback(async() => {
    if (!didUri) return;

      unlockDid(password);

  }, [didUri, unlockDid]);

  return (
    <Dialog 
      maxWidth="sm" 
      open={open}
      components={Paper}
      PaperProps={{
        style: {
            border: '1px solid #060708',
            backgroundColor: '#121620'
        }
      }}
    >
      <DialogHeader onClose={onClose}>
        <Typography variant='h4' sx={{color: 'whitesmoke', textAlign: 'center', letterSpacing: 2}}>
          {title}
        </Typography>
      </DialogHeader>
      <DialogContent sx={{ minWidth: 280, width: 578, maxWidth: '100%', padding: 7.5 }}>
        <Stack spacing={3}>
          <Typography sx={{color: 'whitesmoke', textAlign: 'center'}}>
            You will be staking <FormatBalance value={blockchain.api.consts.did.deposit} /> KILT
          </Typography>
          {isLocked && (
            <>
              <FormControl variant='filled' sx={{bgcolor: 'whitesmoke'}}>
                <InputLabel sx={{'&.Mui-focused': { color: 'inherit' }}}>Please input your password</InputLabel>
                <InputPassword
                  onChange={(e) => setPassword(() => e.target.value)}
                  sx={({ palette }) => ({
                    '.MuiOutlinedInput-notchedOutline': {
                      borderColor: 'transparent'
                    },
                    border: 'none',
                    background: lighten(palette.primary.main, 0.94)
                  })}
                />
              </FormControl>
              <Button
                  sx={{bgcolor: '#D359BD', '&:hover': {backgroundColor: 'rgba(211, 89, 189, 0.8)'}, px: 5, py: 1, borderRadius: 10}}
                  fullWidth
                  onClick={unlockWithPass}
              >
                <Typography sx={{color: 'whitesmoke'}}>
                    Unlock
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
                  sx={{bgcolor: '#D359BD', '&:hover': {backgroundColor: 'rgba(211, 89, 189, 0.8)'}, px: 5, py: 1, borderRadius: 10}}
                  fullWidth
                  onClick={unlockWithMoon}
              >
                <Typography sx={{color: 'whitesmoke'}}>
                    Sign With Moonbase Alpha
                </Typography>
              </Button>
            </>
          )}
          {isLocked ? null : steps || children}
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default React.memo(DidsModal);