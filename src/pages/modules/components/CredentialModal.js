import React, { useMemo } from 'react';

import IdentityIcon from './IdentityIcon';
import FullScreenDialog from './FullScreenDialog';
import FullScreenDialogContent from './FullScreenDialogContent';
import FullScreenDialogHeader from './FullScreenDialogHeader';
import DidName from './DidName';

import CredentialContents from './CredentialContents';

const RequestStatus = {
    INIT: 'init',
    SUBMIT: 'submit',
    REJECT: 'reject'
}

const CredentialModal = ({ credential, onClose }) => {
  const owner = useMemo(() => credential?.request.claim.owner, [credential.request.claim.owner]);
  const rootHash = useMemo(() => credential?.request.rootHash, [credential.request.rootHash]);
  const ctypeHash = useMemo(
    () => credential?.request.claim.cTypeHash,
    [credential?.request.claim.cTypeHash]
    );
    const status = useMemo(() => RequestStatus.SUBMIT, []);
    const revoked = useMemo(() => credential.attestation.revoked, [credential.attestation.revoked]);
    const attester = useMemo(() => credential.attestation.owner, [credential.attestation.owner]);
    const contents = useMemo(
        () => credential?.request.claim.contents,
        [credential?.request.claim.contents]
    );

  return (
    <FullScreenDialog open>
      <FullScreenDialogHeader
        desc={rootHash}
        icon={<IdentityIcon diameter={50} value={owner} />}
        onClose={onClose}
        title={<DidName value={owner} />}
      />
      <FullScreenDialogContent>
        <CredentialContents
          attester={attester}
          contents={contents}
          ctypeHash={ctypeHash}
          owner={owner}
          revoked={revoked}
          status={status}
        />
      </FullScreenDialogContent>
    </FullScreenDialog>
  );
};

export default React.memo(CredentialModal);