import * as React from 'react';

import {
    Box,
    Button,
    Grid,
    TextField,
    Typography,
} from '@mui/material';

//Applies Material UI Theme
import withRoot from './modules/styles/withRoot';
import { useEvmAuth } from './modules/components/EvmAuth';

function JobForm() {
    const [title, setTitle] = React.useState('');
    const [page] = React.useState(0);
    const { contract } = useEvmAuth();

    const handleInput = (event) => {
        setTitle(event.target.value)
    }
    const handleClick = () => {
        contract.createCard(title);
    }
    return (
        <>
            <Box sx={{height: '100vh', display: 'flex', flexDirection: 'column'}}>
                <Box sx={{height: 60}}/>
                <Box sx={{flexGrow: 1, display: 'flex', flexDirection: 'column'}}>
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
                                            Headline    
                                        </Typography>    
                                    </Box> 
                                </Box>
                                <Box sx={{my: 1, width: '100%'}}>
                                    <Typography variant='h2' sx={{color: '#007DF1'}}>
                                        Write a title for your task
                                    </Typography>
                                </Box>
                                <Box sx={{width: '100%'}}>
                                    <Typography variant='h6' sx={{color: 'whitesmoke'}}>
                                        This helps your task stand out to the right canindates. It's the first thing they see, so make it count!
                                    </Typography>
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item xs={6} sx={{}}>
                            <Box sx={{width: '60%', display: 'flex', flexDirection: 'column', pl: 4, mt: '20%'}}>
                                <Box sx={{width: '100%'}}>
                                    <Typography variant='h6' sx={{color: 'whitesmoke'}}>
                                       Write a title for your task 
                                    </Typography> 
                                </Box>
                                <Box sx={{my: 2, bgcolor: 'whitesmoke', width: '100%', borderRadius: 1}}>
                                    <TextField fullWidth onChange={handleInput} value={title}/>
                                </Box>
                                <Box sx={{width: '100%'}}>
                                    <Typography variant='h6' sx={{color: 'whitesmoke'}}>
                                        Example titles
                                    </Typography>
                                    <ul style={{color: 'whitesmoke'}}>
                                        <li>
                                            <Typography variant='h6' sx={{color: 'whitesmoke'}}>
                                               Build a responsive WordPress site with booking/payment functionality 
                                            </Typography>
                                        </li>
                                        <li>
                                            <Typography variant='h6' sx={{color: 'whitesmoke'}}>
                                               Graphic desinger needed to design ad creative for multiple campaigns 
                                            </Typography>
                                        </li>
                                        <li>
                                            <Typography variant='h6' sx={{color: 'whitesmoke'}}>
                                               Facebook ad specialist needed for product launch 
                                            </Typography>
                                        </li>
                                    </ul>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                    <Box sx={{height: 3, bgcolor: 'whitesmoke'}}>
                        <Box sx={{height: '100%', width: `${((page + 1) / 3) * 100}%`, bgcolor: '#007DF1', borderRadius: 2}}/>
                    </Box>
                    <Box sx={{flexGrow: 1, minHeight: 80}}>
                        <Box sx={{width: '100%', height: '100%', display: 'flex', justifyContent: 'flex-end', py: 2.5, px: 5}}>
                            <Button onClick={handleClick} sx={{bgcolor: '#D359BD', '&:hover': {backgroundColor: 'rgba(211, 89, 189, 0.8)'}, px: 5, borderRadius: 10}}>
                                <Typography sx={{color: 'whitesmoke'}}>
                                    Next
                                </Typography>
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    );
}

export default withRoot(JobForm);