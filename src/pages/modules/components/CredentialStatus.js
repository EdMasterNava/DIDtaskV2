import Circle from '@mui/icons-material/Circle';
import { Stack, Typography, useTheme } from '@mui/material';
import React, { useMemo } from 'react';

const CredentialStatus = ({
  role,
  revoked,
  status = 'INIT',
  showText
}) => {
  const theme = useTheme();
  const initText = useMemo(() => (role === 'attester' ? 'Pending' : 'Attesting'), [role]);
  const submitText = useMemo(
    () =>
      role === 'attester' ? (revoked ? 'Revoked' : 'Valid') : revoked ? 'Revoked' : 'Attested',
    [revoked, role]
  );
  const rejectText = useMemo(() => (role === 'attester' ? 'Rejected' : 'Rejected'), [role]);
  const initColor = useMemo(
    () => (role === 'attester' ? theme.palette.grey[600] : theme.palette.warning.main),
    [role, theme.palette.grey, theme.palette.warning.main]
  );
  const submitColor = useMemo(
    () =>
      role === 'attester'
        ? revoked
          ? theme.palette.error.main
          : theme.palette.success.main
        : revoked
        ? theme.palette.error.main
        : theme.palette.success.main,
    [revoked, role, theme.palette.error.main, theme.palette.success.main]
  );
  const rejectColor = useMemo(
    () => (role === 'attester' ? theme.palette.error.main : theme.palette.error.main),
    [role, theme.palette.error.main]
  );

  return (
    <Stack
      direction="row"
      spacing={1}
      sx={() => ({
        display: 'inline-flex',
        alignItems: 'center',
        direction: 'row',
        color:
          status === 'SUBMIT'
            ? submitColor
            : status === 'REJECT'
            ? rejectColor
            : initColor
      })}
    >
      <Circle sx={{ width: 10, height: 10 }} />
      {showText && (
        <Typography variant="inherit">
          {status === 'SUBMIT'
            ? submitText
            : status === 'REJECT'
            ? rejectText
            : initText}
        </Typography>
      )}
    </Stack>
  );
};

export default React.memo(CredentialStatus);
