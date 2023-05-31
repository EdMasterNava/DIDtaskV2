import React, { useContext, useEffect, useState } from 'react';
import { Box, Stack, Tab, Tabs } from '@mui/material';

import { useDid } from './DidProvider';
import { CType } from '@kiltprotocol/sdk-js';
import { credentialApi } from './Api';

import CTypesListAttester from './CTypeListAttester';

const OwnerCType = () => {
  const { didUri } = useDid();
  const [ownCTypes, setOwnCTypes] = useState([]);

  useEffect(() => {
    if (didUri) {
        credentialApi.getCreatedCtypes(didUri).then((res) => {
            setOwnCTypes(
                res.data.map((d) => CType.fromSchema(d.metadata, d.owner))
            );
        });
    }
  }, [didUri]);

  return (
    <Stack spacing={3}>
        {/* <Tabs
            sx={{
                px: 2,
                boxShadow: '0px 3px 6px rgba(153, 155, 168, 0.1)'
            }}
            value={0}
        >
            <Tab label="My CTypes" />
        </Tabs> */}
        <Box sx={{px: '5%'}}>
            <CTypesListAttester list={ownCTypes} />
        </Box>
    </Stack>
  );
};

export default OwnerCType;
