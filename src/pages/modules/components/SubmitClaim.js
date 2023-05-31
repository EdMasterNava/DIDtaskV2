import {
    Message
  } from '@kiltprotocol/sdk-js';
import { Button } from '@mui/material';
import React, { useMemo, useState } from 'react';

import { useApp } from './AppProvider';
import { useDid } from './DidProvider';
import { useKeystore } from './KeyProvider';
import { useDidDetails } from './useDidDetails';
import { encryptMessage } from './EncryptMessage';
import { requestAttestation } from './RequestAttestation';
import { sendMessage } from './SendMessage';
import Recaptcha from './Recaptcha';
import DidModal from './DidModal';
import Steps from './Steps';

const SubmitClaim = ({ attester, contents, ctype, hasError, onDone }) => {
  const { keyring } = useKeystore();
  const { didUri } = useDid();
  const { fetcher } = useApp();
  const [open, setOpen] = useState(false);
  const sender = useDidDetails(didUri);
  const [request, setRequest] = useState();
  const [encryptedMessage, setEncryptedMessage] = useState();
  const [recaptchaToken, setRecaptchaToken] = useState();

  const handleOpen = () => {
    setOpen(true);
  }
  const handleClose = () => {
    setClose(false)
  }

  const message = useMemo(() => {
    return sender && attester && request
      ? new Message(
          {
            content: { requestForAttestation: request },
            type: Message.BodyType.REQUEST_ATTESTATION
          },
          sender.uri,
          attester.uri
        )
      : null;
  }, [attester, request, sender]);

  return (
    <>
      <Button
        disabled={!attester || !ctype || !contents || hasError}
        onClick={handleOpen}
        variant="contained"
      >
        Submit
      </Button>
      {open && (
        <DidModal
          onClose={handleClose}
          open={open}
          title="Submit claim"
          steps={
            <Steps
              onDone={onDone}
              submitText="Submit claim"
              steps={[
                {
                  label: 'Request for attestation and sign',
                  exec: () =>
                    requestAttestation(
                      keyring,
                      sender,
                      ctype,
                      contents
                    ).then(setRequest)
                },
                {
                  label: 'Encrypt message',
                  exec: () =>
                    encryptMessage(keyring, message, sender, attester).then(setEncryptedMessage)
                },
                {
                  label: 'Send message',
                  paused: true,
                  content: <Recaptcha onCallback={setRecaptchaToken} />,
                  exec: () => sendMessage(fetcher, encryptedMessage, recaptchaToken, message)
                }
              ]}
            />
          }
        />
      )}
    </>
  );
};

export default React.memo(SubmitClaim);
