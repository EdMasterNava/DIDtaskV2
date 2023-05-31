import React, { useState } from 'react';
import { 
    Box, 
    Button, 
    FormControl, 
    InputLabel, 
    Typography,
    Stack 
} from '@mui/material';

import InputPassword from './InputPassword';

const CreatePassword = (props) => {
    const { prevStep, createDIDwithPass, checkTrue } = props;
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const isValidPassword = password === confirmPassword;
    const handleCreate = () => {
        createDIDwithPass(password);
    }
    return (
        <>
            <Box sx={{px: 5, my: 3, textAlign: 'center'}}>
                <Typography sx={{color: 'whitesmoke'}}>
                    Master Password can be created with Moonbase (Highly Recommended) or you can create your own (Recommended) or use no password (Not Recommended)
                </Typography>
            </Box>
            <Stack spacing={2} width="100%" sx={{py: 2.5, px: 5}}>
                <FormControl fullWidth variant="filled" sx={{bgcolor: 'whitesmoke', borderRadius: '1px 1px 0 0'}}>
                    <InputLabel shrink sx={{'&.Mui-focused': { color: 'inherit' }}}>Enter password</InputLabel>
                    <InputPassword onChange={(e) => setPassword(e.target.value)} />
                </FormControl>
                <FormControl fullWidth variant="filled" sx={{bgcolor: 'whitesmoke', borderRadius: '1px 1px 0 0'}}>
                    <InputLabel shrink sx={{'&.Mui-focused': { color: 'inherit' }}}>Confirm password</InputLabel>
                    <InputPassword onChange={(e) => setConfirmPassword(e.target.value)} />
                </FormControl>
            </Stack>
            <Box sx={{display: 'flex', justifyContent: 'space-between', py: 2.5, px: 5}}>
                <Button onClick={prevStep} sx={{bgcolor: '#D359BD', '&:hover': {backgroundColor: 'rgba(211, 89, 189, 0.8)'}, px: 5, py: 1, borderRadius: 10}}>
                    <Typography sx={{color: 'whitesmoke'}}>
                        Go Back
                    </Typography>
                </Button> 
                <Button onClick={handleCreate} disabled={!(checkTrue && isValidPassword)} sx={{bgcolor: `${!(checkTrue && isValidPassword) ? '#37383D' : '#D359BD'}`, '&:hover': {backgroundColor: 'rgba(211, 89, 189, 0.8)'}, px: 5, py: 1, borderRadius: 10}}>
                    <Typography sx={{color: 'whitesmoke'}}>
                        Create DID
                    </Typography>
                </Button>    
            </Box>
        </>
    );
};

export default React.memo(CreatePassword);