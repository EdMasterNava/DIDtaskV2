import * as React from 'react';

import {
    Box, 
    Grid,
    Stack,
    Typography,
    Button,
} from '@mui/material';


import style from '../styles/styles';

function RememberMnemonic(props) {
    const css = style();

    const { mnemonic, nextStep } = props;
    const items = mnemonic.split(' ');

    return (
        <>
            <Box sx={{...css.flexCenter, px: 4, my: 3, textAlign: 'center'}}>
                <Typography sx={{color: 'whitesmoke'}}>
                    Please write down your secret recovery phrase and keep it in a safe place. Never give this phrase to anyone as it will hand over control of your assets!
                </Typography>
            </Box>
            <Box>
                <Grid
                    columnSpacing={{
                        xs: 3,
                        md: 8
                    }}
                    container
                    padding={3.5}
                    rowSpacing={{
                        xs: 2,
                        md: 3
                    }}
                >
                    {items.map((item, index) => (
                        <Grid alignItems="center" component={Stack} item key={index} md={4} width={120} xs={6}>
                            <Typography sx={{ userSelect: 'none', color: 'whitesmoke' }} width={44}>
                                {index + 1}.
                            </Typography>
                            <Box
                                alignItems="center"
                                bgcolor="white"
                                borderRadius={2}
                                display="flex"
                                height={32}
                                justifyContent="center"
                                width={100}
                            >
                                {item}
                            </Box>
                        </Grid>
                    ))}
                </Grid>
                <Box sx={{display: 'flex', justifyContent: 'flex-end', py: 2.5, px: 5}}>
                    <Button onClick={nextStep} sx={{bgcolor: '#D359BD', '&:hover': {backgroundColor: 'rgba(211, 89, 189, 0.8)'}, px: 5, py: 1, borderRadius: 10}}>
                        <Typography sx={{color: 'whitesmoke'}}>
                            Next
                        </Typography>
                    </Button>    
                </Box>
            </Box>
        </>
    );
}

export default RememberMnemonic;