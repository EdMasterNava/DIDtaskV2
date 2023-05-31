import { Alert, Box, Button, Checkbox, FormControlLabel, OutlinedInput, Paper, Stack, Typography } from '@mui/material';
import { assert, u8aToHex } from '@polkadot/util';
import React, { useCallback, useMemo, useState } from 'react';
import { Did } from '@kiltprotocol/sdk-js';
import { useKeystore } from './KeyProvider'

import DidModal from './DidModal';
import Steps from './Steps';
import { useDid } from './DidProvider';
import { signAndSend } from './SignAndSend'; 
import { useDidDetails } from './useDidDetails';

const Item = ({ checked, disabled = false, label, onChange, text }) => {
  return (
    <Stack alignItems="center" direction="row" justifyContent="space-between">
      <FormControlLabel
        control={<Checkbox checked={checked} color="info"/>}
        disabled={disabled}
        label={<Typography sx={{color: 'whitesmoke'}}>{label}</Typography>}
        onChange={(_, checked) => onChange?.(checked)}
      />
      <Typography
        sx={{
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          width: '50%',
          textAligh: 'right',
          color: disabled ? 'whitesmoke' : undefined
        }}
        variant="inherit"
      >
        {text}
      </Typography>
    </Stack>
  );
};

const FullDidCreator = () => {
  const { keyring } = useKeystore();
  const { blockchain, didUri, tryFetchFullDid } = useDid();
  const didDetails = useDidDetails(didUri);
  const [checkeds] = useState([true, true, true, true]);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
    // const create = getExtrinsic();
    // console.log(create)
  }
  const handleClose = () => {
    setOpen(false);
  }

  const keys = useMemo(() => {
    if (didDetails instanceof Did.LightDidDetails) {
      const _keys = [
        u8aToHex(didDetails.authenticationKey.publicKey),
        u8aToHex(didDetails.encryptionKey?.publicKey),
        u8aToHex(didDetails.authenticationKey.publicKey),
        u8aToHex(didDetails.authenticationKey.publicKey)
      ];

      return _keys;
    } else {
      return null;
    }
  }, [didDetails]);

  const fullDidUri = useMemo(() => {
    if (didDetails instanceof Did.LightDidDetails) {
      return 'did:kilt:' + didDetails.identifier;
    } else {
      return null;
    }
  }, [didDetails]);

  const getExtrinsic = useCallback(async () => {
    assert(didDetails, 'no light did');
    assert(didDetails instanceof Did.LightDidDetails, 'did is not light did');
    console.log('BC api: ', blockchain.api, 'Did Details: ', didDetails)
    console.log('Auth Key: ', didDetails.authenticationKey)
    const creation = Did.FullDidCreationBuilder.fromLightDidDetails(blockchain.api, didDetails)
      .setAttestationKey(didDetails.authenticationKey)
      .setDelegationKey(didDetails.authenticationKey);
    console.log('Creation Builder: ', creation);
    return creation.build(keyring, didDetails?.identifier);
  }, [blockchain.api, didDetails, keyring]);

  const onDone = useCallback(() => {
    handleClose();
    tryFetchFullDid();
  }, [handleClose, tryFetchFullDid]);

  if (didDetails instanceof Did.FullDidDetails) {
    return (
      <Alert severity="warning" sx={{bgcolor: '#37383D', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <Typography variant='h5' sx={{color: 'whitesmoke'}}>
          You already have a Full DID  
        </Typography>
      </Alert>
    );
  }

  return (
    <>
      <Stack spacing={4.5}>
        <Box>
          <Typography variant="inherit" sx={{color: 'whitesmoke'}}>
            The following will be published on chain:
          </Typography>
          <Paper sx={{ padding: 3, marginTop: 2, bgcolor: '#37383D'}} variant="outlined">
            <Item checked={checkeds[0]} disabled label="Authentication Key" text={keys?.[0]} />
            <Item checked={checkeds[1]} disabled label="Agreement Key Set" text={keys?.[1]} />
            <Item checked={checkeds[2]} disabled label="Assertion Key" text={keys?.[2]} />
            <Item checked={checkeds[3]} disabled label="Delegation Key" text={keys?.[3]} />
          </Paper>
        </Box>
        <Box>
          <Typography variant="inherit" sx={{color: 'whitesmoke'}}>
            Your Full DID:
          </Typography>
          <Box sx={{ marginTop: 2, bgcolor: '#37383D', px: 3, py: 2, borderRadius: 2}} >
            <Typography sx={{color: 'whitesmoke', textOverflow: 'ellipsis', overflow: 'hidden'}}>
              {fullDidUri}
            </Typography>
          </Box>
        </Box>
        <Button fullWidth onClick={handleOpen} variant="contained" sx={{mr: 2, px: 5, borderRadius: 10, bgcolor: '#D359BD', '&:hover': {backgroundColor: 'rgba(211, 89, 189, 0.8)'}}}>
          <Typography sx={{color: 'whitesmoke'}}>
              Upgrade
          </Typography>
        </Button>
      </Stack>
      <DidModal
        onClose={handleClose}
        open={open}
        title="Upgrade to FullDID"
        steps={
          <Steps
            onDone={onDone}
            submitText="Upgrade"
            steps={[
              {
                label: 'Sign and submit',
                paused: true,
                exec: (report) =>
                  signAndSend(report, keyring, didDetails?.authenticationKey.publicKey, getExtrinsic)
              }
            ]}
          />
        }
      />
    </>
  );
};

export default React.memo(FullDidCreator);
