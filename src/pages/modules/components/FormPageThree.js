import * as React from 'react';

import {
    Box,
    Grid,
    Button,
    TextField,
    Typography
} from '@mui/material';


function FormPageThree(props) {
    const page = props.page;
    const certifications = props.certifications;
    const handleInput = props.handleInput;
    const nextPage = props.nextPage;
    const previousPage = props.previousPage;
    return (
        <>
            <Grid container sx={{height: '90%'}}>
                <Grid item xs={6} sx={{borderRight: '2px solid', borderImage: 'linear-gradient(to bottom, transparent, whitesmoke) 1', display: 'flex', justifyContent: 'flex-end'}}>
                    <Box sx={{width: '60%', display: 'flex', flexDirection: 'column', pr: 2, mt: '20%'}}>
                        <Box sx={{display: 'flex', gap: 2, width: '100%'}}>
                            <Box>
                                <Typography variant='h6' sx={{color: 'whitesmoke'}}>
                                    {`${page + 1}/3`} 
                                </Typography>    
                            </Box>
                            <Box >
                                <Typography variant='h6' sx={{color: 'whitesmoke'}}>
                                    Certifications    
                                </Typography>    
                            </Box> 
                        </Box>
                        <Box sx={{my: 1, width: '100%'}}>
                            <Typography variant='h2' sx={{color: '#007DF1', letterSpacing: 1.5}}>
                                What are the certifications required for your task?
                            </Typography>
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={6} sx={{}}>
                    <Box sx={{width: '60%', display: 'flex', flexDirection: 'column', pl: 4, mt: '20%'}}>
                        <Box sx={{width: '100%'}}>
                            <Typography variant='h6' sx={{color: 'whitesmoke'}}>
                                Search certifications or add your own
                            </Typography> 
                        </Box>
                        <Box sx={{mt: 2, bgcolor: 'whitesmoke', width: '100%', borderRadius: 1}}>
                            <TextField fullWidth onChange={handleInput} value={certifications} id="description" />
                        </Box>
                    </Box>
                </Grid>
            </Grid>
            <Box sx={{height: 3, bgcolor: 'whitesmoke'}}>
                <Box sx={{height: '100%', width: `${((page + 1) / 3) * 100}%`, bgcolor: '#007DF1', borderRadius: 2}}/>
            </Box>
            <Box sx={{flexGrow: 1, minHeight: 80}}>
                <Box sx={{width: '100%', height: '100%', display: 'flex', justifyContent: 'space-between', py: 2.5, px: 5}}>
                    <Button onClick={previousPage} sx={{bgcolor: '#D359BD', '&:hover': {backgroundColor: 'rgba(211, 89, 189, 0.8)'}, px: 5, borderRadius: 10}}>
                        <Typography sx={{color: 'whitesmoke'}}>
                            Back
                        </Typography>
                    </Button>
                    <Button onClick={nextPage} sx={{bgcolor: '#D359BD', '&:hover': {backgroundColor: 'rgba(211, 89, 189, 0.8)'}, px: 5, borderRadius: 10}}>
                        <Typography sx={{color: 'whitesmoke'}}>
                            Next
                        </Typography>
                    </Button>
                </Box>
            </Box>
        </>
    );
}

export default FormPageThree;