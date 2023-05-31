import { CType, Did } from '@kiltprotocol/sdk-js';
import { Button, Typography } from '@mui/material';
import React, { useCallback, useMemo } from 'react';

import { useDid } from './DidProvider';
import { useDidDetails } from './useDidDetails';
import { signAndSend } from './SignAndSend';
import { addCtype } from './AddCType';
import { useKeystore } from './KeyProvider'
import DidModal from './DidModal';
import Steps from './Steps';

const SubmitCType = ({ description, onDone, properties, title }) => {
    const [open, setOpen] = React.useState(false);
    const { keyring } = useKeystore();
    const { didUri } = useDid();
    const attester = useDidDetails(didUri);

    const handleOpen = () => {
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
    }

    const ctype = useMemo(() => {
        if (!properties || !title) return null;

        try {
        return CType.fromSchema({
            title,
            $schema: 'http://kilt-protocol.org/draft-01/ctype#',
            type: 'object',
            properties
        });
        } catch (error) {
            return null;
        }
    }, [properties, title]);

    const getExtrinsic = useCallback(async () => {
        if (!ctype) {
            throw new Error('Ctype generate failed');
        }

        if (!(attester instanceof Did.FullDidDetails)) {
            throw new Error('The DID with the given identifier is not on chain.');
        }

        const tx = await ctype.getStoreTx();
        const extrinsic = await attester.authorizeExtrinsic(tx, keyring, attester.identifier);

        return extrinsic;
    }, [attester, ctype, keyring]);

    return (
        <>
            <Button onClick={handleOpen} sx={{bgcolor: '#D359BD', '&:hover': {backgroundColor: 'rgba(211, 89, 189, 0.8)'}, px: 5, py: 1, borderRadius: 10}}>
                <Typography sx={{color: 'whitesmoke'}}>
                    Submit
                </Typography>
            </Button>
            <DidModal
                onClose={handleClose}
                open={open}
                title="Submit ctype"
                steps={
                    <Steps
                        onDone={onDone}
                        submitText="Submit ctype"
                        steps={[
                            {
                                label: 'Sign and submit ctype',
                                paused: true,
                                exec: (report) =>
                                signAndSend(report, keyring, attester?.authenticationKey.publicKey, getExtrinsic)
                            },
                            {
                                label: 'Upload ctype',
                                exec: () => addCtype(ctype, attester?.uri, description)
                            }
                        ]}
                    />
                }
            />
        </>
    );
};

export default React.memo(SubmitCType);
