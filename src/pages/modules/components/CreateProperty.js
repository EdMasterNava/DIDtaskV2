import {
    Autocomplete,
    Button,
    Dialog,
    DialogContent,
    FormControl,
    InputLabel,
    FilledInput,
    Stack,
    Typography
  } from '@mui/material';
  import React, { useCallback, useState } from 'react';
  
  import DialogHeader from './DialogHeader';
  
  const CreateProperty = ({ onCreate }) => {
        const [open, setOpen] = useState(false);
        const [name, setName] = useState();
        const [property, setProperty] = useState(null);

        const handleOpen = () => {
            setOpen(true);
        }
        const handleClose = () => {
            setOpen(false);
        }
    
        const _onCreate = useCallback(() => {
        if (name && property) {
            onCreate({ [name]: property });
            handleClose();
        }
        }, [name, onCreate, property, handleClose]);
    
        return (
        <>
            <Button onClick={handleOpen} variant="contained" sx={{bgcolor: '#D359BD', '&:hover': {backgroundColor: 'rgba(211, 89, 189, 0.8)'}, px: 5, py: 1, borderRadius: 10}}>
                Create New Property
            </Button>
            <Dialog 
                maxWidth="xs" 
                onClose={handleClose} 
                open={open} 
                PaperProps={{
                    style: {
                        border: '1px solid #060708',
                        backgroundColor: '#121620',
                        width: '700px',
                        paddingBottom: '10px'
                    }
                }}>
                <Typography variant='h4' sx={{color: 'whitesmoke', textAlign: 'center', mt: 3}}>Create New Property</Typography>
                <Stack component={DialogContent} spacing={3} sx={{ width: 600, maxWidth: '100%' }}>
                    <FormControl fullWidth variant="filled" sx={{bgcolor: 'whitesmoke'}}>
                        <InputLabel shrink sx={{'&.Mui-focused': { color: 'inherit' }}}>Data name</InputLabel>
                        <FilledInput
                            defaultValue={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Ex. Name, Age, Location, etc"
                        />
                    </FormControl>
                    <Autocomplete
                        fullWidth
                        onChange={(_, value) => setProperty(value)}
                        options={['array', 'boolean', 'integer', 'null', 'number', 'object', 'string']}
                        renderInput={(params) => (
                            <FormControl fullWidth variant="outlined" sx={{bgcolor: 'whitesmoke'}}>
                                <FilledInput
                                    {...params.InputProps}
                                    inputProps={params.inputProps}
                                    onChange={(e) => setProperty(e.target.value)}
                                    placeholder="Please select a property type"
                                />
                            </FormControl>
                        )}
                        sx={{color: 'whitesmoke', backgroundColor: '#121620'}}
                    />
                    <Button
                        disabled={!property || !name}
                        fullWidth
                        onClick={_onCreate}
                        sx={{bgcolor: `${!property || !name ? '#37383D' : '#D359BD'}`, '&:hover': {backgroundColor: 'rgba(211, 89, 189, 0.8)'}, px: 5, py: 1, borderRadius: 10}}
                    >
                        Create
                    </Button>
                </Stack>
            </Dialog>
        </>
    );
  };
  
  export default React.memo(CreateProperty);