import * as React from 'react';
import {
    Box,
    Button,
    Paper,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    FormControl,
    IconButton,
    InputLabel,
    FilledInput,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from '@mui/material';

import {
    Close,
    IndeterminateCheckBoxOutlined
} from '@mui/icons-material/';

import { useLocalStorage } from './useLocalStorage';

import CreateProperty from './CreateProperty';
import SubmitCType from './SubmitCType';
import style from '../styles/styles';

const key = 'credential:ctype:draft';

function CreateCType(props) {
    const css = style();
    const { onClose, open } = props;
  
    const handleClose = () => {
        onClose();
    };
    const [cTypeContent, setCTypeContent, clear] = useLocalStorage(key);

    const properties = React.useMemo(() => {
        if (cTypeContent?.title && cTypeContent?.properties) {
        if (Object.entries(cTypeContent.properties).length === 0) {
            return undefined;
        }

        return Object.entries(cTypeContent.properties)
            .map(([name, property]) => ({
                [name]: {
                    type: property
                }
            }))
            .reduce((l, r) => ({ ...l, ...r }));
        } else {
            return undefined;
        }
    }, [cTypeContent]);

    const onDone = React.useCallback(() => {
        clear();
        handleClose();
        // navigate('/attester/ctypes', { replace: true });
    }, [onClose, clear]);

    return (
        <Dialog 
            components={Paper} 
            open={open} 
            PaperProps={{
                style: {
                    border: '1px solid #060708',
                    backgroundColor: '#121620',
                    width: '700px',
                    paddingBottom: '10px'
                }
            }}
        >
            <Box sx={{display: 'flex', justifyContent: 'flex-end', pt: 1, pr: 1}}>
                <IconButton onClick={handleClose}>
                    <Close sx={{color: 'whitesmoke', fontSize: 25}}/>    
                </IconButton>
            </Box>
            <Box sx={{...css.flexCenter}}>
                <Typography variant='h4' sx={{color: 'whitesmoke'}}>
                    Create CType
                </Typography>
            </Box>
            <Container component={DialogContent} maxWidth="lg">
                <Container component={Stack} maxWidth="sm" spacing={3} sx={{ paddingY: 7 }}>
                    <FormControl fullWidth variant="filled" sx={{bgcolor: 'whitesmoke'}}>
                        <InputLabel shrink sx={{'&.Mui-focused': { color: 'inherit' }}}>Ctype title</InputLabel>
                        <FilledInput
                            defaultValue={cTypeContent?.title}
                            onChange={(e) =>
                                setCTypeContent((value) => ({
                                    ...value,
                                    title: e.target.value
                                }))
                            }
                        />
                    </FormControl>
                    <FormControl fullWidth variant="filled" sx={{bgcolor: 'whitesmoke'}}>
                        <InputLabel shrink sx={{'&.Mui-focused': { color: 'inherit' }}}>Description</InputLabel>
                        <FilledInput
                            defaultValue={cTypeContent?.description}
                            minRows={6}
                            multiline
                            onChange={(e) => {
                                setCTypeContent((value) => ({
                                ...value,
                                description: e.target.value
                                }));
                            }}
                        />
                    </FormControl>
                    <FormControl fullWidth variant="outlined" sx={{bgcolor: ''}}>
                        <Box sx={{width: '100%', display: 'flex', flexDirection: 'column'}}>
                            <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexGrow: 1}}>
                                <Typography variant='h5' sx={{color: 'whitesmoke'}}>
                                    Data
                                </Typography>
                                <CreateProperty
                                    onCreate={(property) => {
                                        setCTypeContent((value) => ({
                                            ...value,
                                            properties: Object.assign(value?.properties ?? {}, property)
                                        }));
                                    }}
                                />
                            </Box>
                            
                            <TableContainer
                                sx={{
                                    border: '1px solid',
                                    borderColor: 'whitesmoke',
                                    marginTop: 4,
                                    borderRadius: 1,
                                    flexGrow: 0
                                }}
                            >
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell></TableCell>
                                            <TableCell><Typography variant='h6' sx={{color: 'whitesmoke'}}>Data Name</Typography></TableCell>
                                            <TableCell><Typography variant='h6' sx={{color: 'whitesmoke'}}>Property</Typography></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {Object.entries(cTypeContent?.properties ?? {}).map(([name, property]) => (
                                            <TableRow key={name}>
                                                <TableCell>
                                                    <IconButton
                                                        sx={{color: 'whitesmoke'}}
                                                        onClick={() =>
                                                        setCTypeContent((value) => {
                                                            if (value?.properties?.[name]) {
                                                            delete value.properties[name];
                                                            }

                                                            return { ...value, properties: { ...value.properties } };
                                                        })
                                                        }
                                                    >
                                                        <IndeterminateCheckBoxOutlined />
                                                    </IconButton>
                                                </TableCell>
                                                <TableCell><Typography variant='h6' sx={{color: 'whitesmoke'}}>{name}</Typography></TableCell>
                                                <TableCell><Typography variant='h6' sx={{color: 'whitesmoke'}}>{property}</Typography></TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>
                    </FormControl>
                </Container>
            </Container>
            <DialogActions>
                <Button variant="outlined">Save</Button>
                <SubmitCType
                    description={cTypeContent?.description}
                    onDone={onDone}
                    properties={properties}
                    title={cTypeContent?.title}
                />
            </DialogActions>
        </Dialog>
    );
}

export default CreateCType;




// import IndeterminateCheckBoxOutlinedIcon from '@mui/icons-material/IndeterminateCheckBoxOutlined';
// import {
//   Box,
//   Button,
//   Container,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   FormControl,
//   IconButton,
//   InputLabel,
//   OutlinedInput,
//   Stack,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow
// } from '@mui/material';
// import React, { useCallback, useMemo } from 'react';
// import { useNavigate } from 'react-router-dom';

// import { DialogHeader } from '@credential/react-components';
// import { useLocalStorage } from '@credential/react-hooks';

// import CreateProperty from './CreateProperty';
// import SubmitCType from './SubmitCType';

// const key = 'credential:ctype:draft';

// const CreateCType = () => {
//   const navigate = useNavigate();

//   const [cTypeContent, setCTypeContent, clear] = useLocalStorage(key);

//   const properties = useMemo(() => {
//     if (cTypeContent?.title && cTypeContent?.properties) {
//       if (Object.entries(cTypeContent.properties).length === 0) {
//         return undefined;
//       }

//       return Object.entries(cTypeContent.properties)
//         .map(([name, property]) => ({
//           [name]: {
//             type: property
//           }
//         }))
//         .reduce((l, r) => ({ ...l, ...r }));
//     } else {
//       return undefined;
//     }
//   }, [cTypeContent]);

//   const onDone = useCallback(() => {
//     clear();
//     navigate('/attester/ctypes', { replace: true });
//   }, [navigate, clear]);

//   return (
//     <Dialog fullScreen open>
//       <DialogHeader onClose={() => navigate('/attester/ctypes', { replace: true })}>
//         Create ctype
//       </DialogHeader>
//       <Container component={DialogContent} maxWidth="lg">
//         <Container component={Stack} maxWidth="sm" spacing={3} sx={{ paddingY: 7 }}>
//           <FormControl fullWidth variant="outlined">
//             <InputLabel shrink>Ctype title</InputLabel>
//             <OutlinedInput
//               defaultValue={cTypeContent?.title}
//               onChange={(e) =>
//                 setCTypeContent((value) => ({
//                   ...value,
//                   title: e.target.value
//                 }))
//               }
//             />
//           </FormControl>
//           <FormControl fullWidth variant="outlined">
//             <InputLabel shrink>Description</InputLabel>
//             <OutlinedInput
//               defaultValue={cTypeContent?.description}
//               minRows={6}
//               multiline
//               onChange={(e) => {
//                 setCTypeContent((value) => ({
//                   ...value,
//                   description: e.target.value
//                 }));
//               }}
//             />
//           </FormControl>
//           <FormControl fullWidth variant="outlined">
//             <InputLabel shrink>Data</InputLabel>
//             <Box sx={{ textAlign: 'right' }}>
//               <CreateProperty
//                 onCreate={(property) => {
//                   setCTypeContent((value) => ({
//                     ...value,
//                     properties: Object.assign(value?.properties ?? {}, property)
//                   }));
//                 }}
//               />
//               <TableContainer
//                 sx={({ palette }) => ({
//                   border: '1px solid',
//                   borderColor: palette.grey[400],
//                   marginTop: 4,
//                   borderRadius: 1
//                 })}
//               >
//                 <Table>
//                   <TableHead>
//                     <TableRow>
//                       <TableCell></TableCell>
//                       <TableCell>Data Name</TableCell>
//                       <TableCell>Property</TableCell>
//                     </TableRow>
//                   </TableHead>
//                   <TableBody>
//                     {Object.entries(cTypeContent?.properties ?? {}).map(([name, property]) => (
//                       <TableRow key={name}>
//                         <TableCell>
//                           <IconButton
//                             onClick={() =>
//                               setCTypeContent((value) => {
//                                 if (value?.properties?.[name]) {
//                                   delete value.properties[name];
//                                 }

//                                 return { ...value, properties: { ...value.properties } };
//                               })
//                             }
//                           >
//                             <IndeterminateCheckBoxOutlinedIcon />
//                           </IconButton>
//                         </TableCell>
//                         <TableCell>{name}</TableCell>
//                         <TableCell>{property}</TableCell>
//                       </TableRow>
//                     ))}
//                   </TableBody>
//                 </Table>
//               </TableContainer>
//             </Box>
//           </FormControl>
//         </Container>
//       </Container>
//       <DialogActions>
//         <Button variant="outlined">Save</Button>
//         <SubmitCType
//           description={cTypeContent?.description}
//           onDone={onDone}
//           properties={properties}
//           title={cTypeContent?.title}
//         />
//       </DialogActions>
//     </Dialog>
//   );
// };

// export default CreateCType;
