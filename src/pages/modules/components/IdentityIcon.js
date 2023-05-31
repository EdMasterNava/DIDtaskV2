import jazzicon from '@metamask/jazzicon';
import { Box } from '@mui/material';
import React, { useLayoutEffect, useMemo, useRef } from 'react';

const IdentityIcon = ({ diameter = 16, value }) => {
  const icon = useMemo(
    () => value && jazzicon(diameter, parseInt(value.slice(2, 10), 16)),
    [diameter, value]
  );

  const iconRef = useRef();

  useLayoutEffect(() => {
    const current = iconRef.current;

    if (icon) {
      current?.appendChild(icon);

      return () => {
        try {
          current?.removeChild(icon);
        } catch (e) {
          console.error('Avatar icon not found');
        }
      };
    }

    return () => 0;
  }, [icon, iconRef]);

  return (
    <Box
      component="span"
      ref={iconRef}
      sx={{
        display: 'inline-block',
        width: diameter,
        height: diameter,
        lineHeight: 1,
        fontSize: '12px !important',
        '> div': {
          borderRadius: `${diameter / 2}px !important`
        }
      }}
    />
  );
};

export default React.memo(IdentityIcon);