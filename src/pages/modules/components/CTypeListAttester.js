import { Box, Button, Paper, Stack, SvgIcon, Typography } from '@mui/material';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import React from 'react';

import DidName from './DidName';
import CreateCType from './CreateCType';

const CTypesListAttester = ({ list }) => {
    const [cTypeCreationMenuOpen, setCTypeCreationMenuOpen] = React.useState(false);
    const handleCTypeCreationMenuOpen = () => {
        setCTypeCreationMenuOpen(true);
    }
    const handleCTypeCreationMenuClose = () => {
        setCTypeCreationMenuOpen(false);
    }
    return (
        <>
            <Box>
                <Box sx={{ textAlign: 'right', mb: 3 }}>
                    <Button
                        startIcon={<AddBoxOutlinedIcon />}
                        onClick={handleCTypeCreationMenuOpen}
                        sx={{bgcolor: '#D359BD', '&:hover': {backgroundColor: 'rgba(211, 89, 189, 0.8)'}, px: 5, py: 1, borderRadius: 10}}
                    >
                        <Typography sx={{color: 'whitesmoke'}}>
                            Create ctype
                        </Typography>
                    </Button>
                </Box>
                <Stack spacing={3}>
                    {list.map((cType) => (
                        <Paper
                            key={cType.hash}
                            variant="outlined"
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                paddingY: 2.5,
                                paddingX: 4.5,
                                boxShadow: '0px 3px 6px rgba(153, 155, 168, 0.1)',
                                bgcolor: '#37383D'
                            }}
                        >
                            <Stack
                                alignItems="center"
                                direction="row"
                                spacing={2}
                                sx={({ breakpoints }) => ({
                                    width: '20%',
                                    [breakpoints.down('lg')]: { width: '40%' },
                                    [breakpoints.down('md')]: { width: '100%' }
                                })}
                            >
                                <SvgIcon
                                    sx={{ width: 35, height: 35 }}
                                    viewBox="0 0 60 60"
                                />
                                <Typography fontWeight={500} sx={{color: 'whitesmoke'}}>{cType.schema.title}</Typography>
                            </Stack>
                            <Stack
                                spacing={0.5}
                                sx={({ breakpoints }) => ({
                                    width: '40%',
                                    [breakpoints.down('lg')]: { display: 'none' }
                                })}
                            >
                                <Typography
                                    fontWeight={300}
                                    sx={({ palette }) => ({ color: palette.grey[500] })}
                                    variant="inherit"
                                >
                                    Created by
                                </Typography>
                                <Typography sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', color: 'black' }} variant="inherit">
                                    <DidName shorten={false} value={cType.owner} />
                                </Typography>
                            </Stack>
                            <Stack
                                spacing={0.5}
                                sx={({ breakpoints }) => ({
                                    width: '40%',
                                    [breakpoints.down('md')]: { display: 'none' }
                                })}
                            >
                                <Typography
                                    fontWeight={300}
                                    sx={({ palette }) => ({ color: palette.grey[500] })}
                                    variant="inherit"
                                >
                                    CType Hash
                                </Typography>
                                <Typography sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', color: 'whitesmoke' }} variant="inherit">
                                    {cType.hash}
                                </Typography>
                            </Stack>
                        </Paper>
                    ))}
                </Stack>
            </Box>
            <CreateCType open={cTypeCreationMenuOpen} onClose={handleCTypeCreationMenuClose}/>
        </>
    );
};

export default CTypesListAttester;