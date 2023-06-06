import * as React from 'react';
import { useState, useEffect } from 'react';
import {
    Box,
    Grid,
    Button,
    TextField,
    Typography,
    Select,
    MenuItem,
    InputLabel, 
    CircularProgress
} from '@mui/material';
import { ethers } from 'ethers';



function FormPageThree(props) {
    const page = props.page;
    const nextPage = props.nextPage;
    const previousPage = props.previousPage;

    const [blockchain, setBlockchain] = useState('');
    const [tokenType, setTokenType] = useState('');
    const [info, setInfo] = useState('');
    const [contractAddress, setContractAddress] = useState('');

    const handleBlockchainChange = (event) => setBlockchain(event.target.value);
    const handleTokenTypeChange = (event) => setTokenType(event.target.value);
    const handleInfoChange = (event) => setInfo(event.target.value);
    const handleContractAddressChange = (event) => setContractAddress(event.target.value);


    useEffect(() => {
        if (ethers.utils.isAddress(contractAddress)) {
            fetchContractData();
        }
    }, [contractAddress]);


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
                                    Token Gate   
                                </Typography>    
                            </Box> 
                        </Box>
                        <Box sx={{my: 1, width: '100%'}}>
                            <Typography variant='h2' sx={{color: '#007DF1', letterSpacing: 1.5}}>
                                Please select your preferences
                            </Typography>
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={6} sx={{}}>
                    <Box sx={{width: '60%', display: 'flex', flexDirection: 'column', pl: 4, mt: '20%'}}>
                        <Box sx={{width: '100%'}}>
                            <Typography variant='h6' sx={{color: 'whitesmoke'}}>
                                Blockchain
                            </Typography> 
                            <Select value={blockchain} onChange={handleBlockchainChange}>
                                <MenuItem value={'Ethereum'}>Ethereum</MenuItem>
                                <MenuItem value={'Moonbase Alpha'}>Moobase Alpha</MenuItem>
                            </Select>
                        </Box>
                        <Box sx={{mt: 2, bgcolor: 'whitesmoke', width: '100%', borderRadius: 1}}>
                            <Typography variant='h6' sx={{color: 'black'}}>
                                Token Type
                            </Typography> 
                            <Select value={tokenType} onChange={handleTokenTypeChange}>
                                <MenuItem value={'ERC20'}>ERC20</MenuItem>
                                <MenuItem value={'ERC721'}>ERC721</MenuItem>

                            </Select>
                        </Box>
                        <Box sx={{mt: 2, bgcolor: 'whitesmoke', width: '100%', borderRadius: 1}}>
                            <TextField label="Info" fullWidth value={info} onChange={handleInfoChange} />
                        </Box>
                        <Box sx={{mt: 2, bgcolor: 'whitesmoke', width: '100%', borderRadius: 1}}>
                            <TextField label="Contract Address" fullWidth value={contractAddress} onChange={handleContractAddressChange} />
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
                    <Button onClick={props.handleClick} sx={{bgcolor: '#D359BD', '&:hover': {backgroundColor: 'rgba(211, 89, 189, 0.8)'}, px: 5, borderRadius: 10}}>
                        <Typography sx={{color: 'whitesmoke'}}>
                            Submit Tx
                        </Typography>
                    </Button>
                </Box>
            </Box>
        </>
    );
}

export default FormPageThree;