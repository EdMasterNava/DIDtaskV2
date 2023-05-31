import * as React from 'react';

import {
    Box, 
    Grid,
    FormControl,
    InputLabel,
    FilledInput,
    Typography,
    Button,
} from '@mui/material';

import CreatePassword from './CreatePassword';

import style from '../styles/styles';

function random(min = 0, max = 11) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function ComfirmMnemonic(props) {
    const css = style();

    const [keyWordsIndex, setKeyWordsIndex] = React.useState([]);
    const [keyWords, setKeyWords] = React.useState([]);

    const { mnemonic, prevStep, createDIDwithMoon, createDIDwithPass, handlePassword} = props;

    React.useEffect(() => {
        const set = new Set();
    
        while (true) {
            set.add(random());
        
            if (set.size === 4) {
                setKeyWordsIndex([...set].sort((l, r) => (l > r ? 1 : -1)));
                break;
            }
        }
    }, []);

    const checkTrue = React.useMemo(() => {
        const keys = mnemonic.split(' ');
    
        if (keyWords.length > 0 && keys.length > 0 && keyWordsIndex.length > 0) {
            return keyWordsIndex.map((index, i) => keys[index] === keyWords[i]).reduce((l, r) => l && r);
        } else {
            return false;
        }
    }, [keyWords, keyWordsIndex, mnemonic]);

    return (
        <>
            <Box>
                <Box sx={{px: 5, my: 3, textAlign: 'center'}}>
                    <Typography sx={{color: 'whitesmoke'}}>
                        Please confirm your secret recovery phrase by filling in the correct word for each position.
                    </Typography>
                </Box>
                <Box sx={{...css.flexCenter, px: 5}}>
                    <Grid container spacing={2}>
                        {keyWordsIndex.map((keyWordsIndex, index) => (
                            <Grid item key={keyWordsIndex} xs={6} sx={{display: 'flex', justifyContent: `${index % 2 === 0 ? '' : 'flex-end'}`}}>
                                <FormControl variant="filled" fullWidth sx={{bgcolor: 'whitesmoke', borderRadius: '1px 1px 0 0'}}>
                                    <InputLabel shrink sx={{'&.Mui-focused': { color: 'inherit' }}}>#{keyWordsIndex + 1}</InputLabel>
                                    <FilledInput
                                        fullWidth
                                        onChange={(e) =>
                                            setKeyWords((keyWords) => {
                                                keyWords[index] = e.target.value;

                                                return [...keyWords];
                                            })
                                        }
                                    />
                                </FormControl>
                            </Grid>
                        ))}
                    </Grid>    
                </Box>
                <CreatePassword prevStep={prevStep} createDIDwithPass={createDIDwithPass} checkTrue={checkTrue}/>
                <Box sx={{px: 5, mb: 3}}>
                    <Box sx={{display: 'flex', justifyContent: 'space-between', my: 3, alignItems: 'center'}}>
                        <Box sx={{borderBottom: '1px solid whitesmoke', height: 1, flexGrow: 1}} />
                        <Typography sx={{color: 'whitesmoke', flexGrow: 0, px: 1}}>
                            OR
                        </Typography>
                        <Box sx={{borderBottom: '1px solid whitesmoke', height: 1, flexGrow: 1}} />
                    </Box>
                    <Button
                        sx={{bgcolor: `${!checkTrue ? '#37383D' : '#D359BD'}`, '&:hover': {backgroundColor: 'rgba(211, 89, 189, 0.8)'}, px: 5, py: 1, borderRadius: 10}}
                        disabled={!checkTrue}
                        fullWidth
                        onClick={createDIDwithMoon}
                    >
                        <Typography sx={{color: 'whitesmoke'}}>
                            Sign With Moonbase Alpha
                        </Typography>
                    </Button>
                </Box>
            </Box>
        </>
    );
}

export default ComfirmMnemonic;