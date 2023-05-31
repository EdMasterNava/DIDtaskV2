import { Box, FormControl, InputLabel, OutlinedInput, Stack } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';

import AttesterSelect from './AttesterSelect';

import CTypeItem from './CTypeItem';

const CTypeForm = ({
  cType,
  onChange,
  onError,
  handleAttester,
  disabled = false,
  defaultAttester,
  defaultData = {},
  children
}) => {
  const [data, setData] = useState(defaultData);
  const [error, setError] = useState({});

  const _onChange = useCallback((key, value) => {
    setData((data) => ({
      ...data,
      [key]: value
    }));
  }, []);

  const _onError = useCallback((key, value) => {
    setError((error) => ({
      ...error,
      [key]: value
    }));
  }, []);

  useEffect(() => {
    onChange?.(data);
  }, [data, onChange]);

  useEffect(() => {
    onError?.(error);
  }, [error, onError]);

  return (
    <Stack spacing={3}>
      <FormControl fullWidth>
        <InputLabel shrink>Credential type</InputLabel>
        <OutlinedInput disabled value={cType.schema.title} />
      </FormControl>
      <AttesterSelect
        defaultValue={defaultAttester}
        disabled={disabled}
        onChange={handleAttester}
      />
      <Box />
      {Object.keys(cType.schema.properties).map((key) => (
        <CTypeItem
          defaultValue={defaultData[key]}
          disabled={disabled}
          key={key}
          name={key}
          onChange={_onChange}
          onError={_onError}
          type={cType.schema.properties[key].type}
        />
      ))}
      {children}
    </Stack>
  );
};

export default React.memo(CTypeForm);
