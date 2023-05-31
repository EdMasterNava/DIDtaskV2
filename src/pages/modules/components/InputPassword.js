import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { IconButton, InputAdornment, FilledInput } from '@mui/material';
import React from 'react';


const InputPassword = (props) => {
    const [showPassword, setShowPassword] = React.useState(false);
    const toggle = () => {
        setShowPassword(prev => !prev);
    }    
    return (
        <FilledInput
            {...props}
            type={showPassword ? 'text' : 'password'}
            endAdornment={
                <InputAdornment position="end">
                    <IconButton edge="end" onClick={toggle}>
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                </InputAdornment>
            }
        />
    );
};

export default React.memo(InputPassword);