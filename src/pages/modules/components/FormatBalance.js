import { BalanceUtils } from '@kiltprotocol/sdk-js';
import { Typography } from '@mui/material';
import React, { useMemo } from 'react';

const FormatBalance = ({
  decimals,
  forceUnit,
  locale,
  value,
  withSi = false,
  withSiFull = false,
  withUnit = false
}) => {
  const str = useMemo(() => {
    return BalanceUtils.fromFemtoKilt(value ?? '0', decimals, {
      decimals,
      forceUnit,
      locale,
      withSi,
      withSiFull,
      withUnit
    });
  }, [decimals, forceUnit, locale, value, withSi, withSiFull, withUnit]);

  return <span style={{color: 'whitesmoke'}}>{str}</span>;
};

export default React.memo(FormatBalance);