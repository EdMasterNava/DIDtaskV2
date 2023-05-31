import { Box, Button, Typography } from '@mui/material';
import React, { useCallback, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import FullScreenDialog from './FullScreenDialog';
import FullScreenDialogContent from './FullScreenDialogContent';
import FullScreenDialogHeader from './FullScreenDialogHeader';

import CTypeForm from './CTypeForm';

import SubmitClaim from './SubmitClaim';

function CreateClaim({ ctype }) {
  const [open, setOpen] = useState(false);
  const [attester, setAttester] = useState(null);
  const [contents, setContents] = useState({});
  const [contentsError, setContentsError] = useState({});
  const navigate = useNavigate();

  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setClose(false)
  }

  const onDone = useCallback(() => {
    handleClose();
    // navigate('/claimer/claims');
  }, [navigate]);

  const hasError = useMemo(() => {
    const values = Object.values(contentsError);

    if (values.length === 0) return false;

    return values.reduce((l, r) => l || r);
  }, [contentsError]);

  return (
    <>
      <Button onClick={handleOpen} variant="contained" sx={{bgcolor: '#D359BD', '&:hover': {backgroundColor: 'rgba(211, 89, 189, 0.8)'}, px: 5, py: 1, borderRadius: 10, mt: 3}}>
        <Typography sx={{color: 'whitesmoke'}}>
            Create Claim
        </Typography>
      </Button>
      <FullScreenDialog open={open}>
        <FullScreenDialogHeader
          desc={ctype.hash}
          onClose={handleClose}
          title={ctype.schema.title}
        />
        <FullScreenDialogContent>
          <Typography mb={4} textAlign="center" variant="h2">
            Create Claim
          </Typography>
          <CTypeForm
            cType={ctype}
            defaultAttester={ctype.owner ?? undefined}
            handleAttester={setAttester}
            onChange={setContents}
            onError={setContentsError}
          />
          <Box mt={4} textAlign="center">
            <SubmitClaim
              attester={attester}
              contents={contents}
              ctype={ctype}
              hasError={!!hasError}
              onDone={onDone}
            />
          </Box>
        </FullScreenDialogContent>
      </FullScreenDialog>
    </>
  );
}

export default React.memo(CreateClaim);
