import { Box } from '@mui/material';
import React from 'react';

import { useCTypeContext } from './CTypeProvider';

import CTypeListClaimer from './CTypeListClaimer';
// import ImportCType from './ImportCType';

const CType = () => {
  const { cTypeList } = useCTypeContext();
    console.log('cTypeList', cTypeList);
  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 3
        }}
      >
        {/* <ImportCType /> */}
      </Box>
      <CTypeListClaimer list={cTypeList} />
    </Box>
  );
};

export default CType;
