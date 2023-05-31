import {
  Button,
  Dialog,
  DialogContent,
  FormControl,
  InputLabel,
  FilledInput,
  Typography
} from '@mui/material';
import React, { useCallback, useState } from 'react';

import { useCTypeContext } from './CTypeProvider';

const ImportCTypeModal = ({ onClose, open }) => {
  const { importCType } = useCTypeContext();
  const [hash, setHash] = useState();

  const handleClick = useCallback(() => {
    if (hash) {
      importCType(hash);
      onClose?.();
    }
  }, [hash, importCType, onClose]);

  return (
    <Dialog 
        maxWidth="sm" 
        onClose={onClose} 
        open={open}
        PaperProps={{
            style: {
                border: '1px solid #060708',
                backgroundColor: '#121620',
            }
          }}
    >
      <Typography variant="h4" sx={{color: 'whitesmoke', textAlign: 'center', mt: 5}}>Import credential type</Typography>
      <DialogContent sx={{ width: 500, maxWidth: '100%', pb: 5, px: 3 }}>
        <FormControl fullWidth variant='filled' sx={{bgcolor: 'whitesmoke'}}>
          <InputLabel shrink sx={{'&.Mui-focused': { color: 'inherit' }}}>CType hash</InputLabel>
          <FilledInput
            onChange={(e) => setHash(e.target.value)}
            placeholder="please input credential type hash"
          />
        </FormControl>
        <Button
            sx={{bgcolor: '#D359BD', '&:hover': {backgroundColor: 'rgba(211, 89, 189, 0.8)'}, px: 5, py: 1, borderRadius: 10, mt: 3}}
            fullWidth
            onClick={handleClick}
        >
            <Typography sx={{color: 'whitesmoke'}}>
                Unlock
            </Typography>
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default React.memo(ImportCTypeModal);
