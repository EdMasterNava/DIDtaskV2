import { FormControl, FormHelperText, InputLabel, OutlinedInput } from '@mui/material';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

const CTypeInput = ({
  defaultValue,
  disabled = false,
  name,
  onChange,
  onError,
  type
}) => {
  const [_value, _setValue] = useState();
  const error = useMemo(() => {
    if (!_value) {
      return new Error('Empty');
    }

    return null;
  }, [_value]);

  const _onChange = useCallback(
    (e) => {
      _setValue(e.target.value.trim());
      onChange?.(name, e.target.value.trim());
    },
    [name, onChange]
  );

  useEffect(() => {
    onError?.(name, error);
  }, [error, name, onError]);

  return (
    <FormControl error={!!error} fullWidth>
      <InputLabel shrink>{name}</InputLabel>
      <OutlinedInput
        defaultValue={defaultValue}
        disabled={disabled}
        onChange={_onChange}
        placeholder={`Please input ${type}`}
      />
      {error && <FormHelperText>{error.message}</FormHelperText>}
    </FormControl>
  );
};

export default React.memo(CTypeInput);
