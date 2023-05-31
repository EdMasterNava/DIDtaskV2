import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import { alpha, Button, IconButton, useMediaQuery, useTheme, Typography, Box } from '@mui/material';
import React from 'react';

import ImportCTypeModal from './modules/components/ImportCTypeModal';
import CType from './modules/components/CTypes';

//Applies Material UI Theme
import withRoot from './modules/styles/withRoot';

function MyClaims() {
    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const downSm = useMediaQuery(theme.breakpoints.down('sm'));
    const handleOpen = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
    }
    return (
        <>
            <Box sx={{height: 60}}/>
            <Typography variant="h1" sx={{textAlign: 'center', color: 'whitesmoke'}}>
                My Claims
            </Typography>
            <Box sx={{display: 'flex', justifyContent: 'flex-end', px: '5%'}}>
                {downSm ? (
                    <IconButton
                        onClick={handleOpen}
                        sx={({ palette }) => ({
                            backgroundColor: alpha(palette.primary.main, 0.2),
                            ':hover': {
                            backgroundColor: alpha(palette.primary.main, 0.35)
                            }
                        })}
                    >
                    <FileUploadOutlinedIcon />
                    </IconButton>
                ) : (
                    <Button
                        onClick={handleOpen}
                        startIcon={<FileUploadOutlinedIcon />}
                        sx={({ palette }) => ({
                            borderRadius: 6,
                            color: palette.primary.main,
                            boxShadow: 'none',
                            background: alpha(palette.primary.main, 0.2),
                            ':hover': {
                            boxShadow: 'none',
                            background: alpha(palette.primary.main, 0.35)
                            }
                        })}
                        variant="contained"
                    >
                        Import
                    </Button>
                )}    
            </Box>
            <CType />
            <ImportCTypeModal onClose={handleClose} open={open} />
        </>
    );
}

export default withRoot(MyClaims);