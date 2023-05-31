import { FormControl, InputLabel, Switch } from '@mui/material';
import React, { useEffect } from 'react';

const CTypeBool = ({ defaultValue, disabled = false, name, onChange }) => {
  useEffect(() => {
    onChange?.(name, false);
  }, [name, onChange]);

  return (
    <FormControl fullWidth>
      <InputLabel shrink>{name}</InputLabel>
      <Switch
        defaultChecked={defaultValue || false}
        disabled={disabled}
        onChange={(e) => onChange?.(name, e.target.checked)}
      />
    </FormControl>
  );
};

export default React.memo(CTypeBool);
