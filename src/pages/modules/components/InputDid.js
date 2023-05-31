import {
    CircularProgress,
    FormControl,
    FormHelperText,
    InputAdornment,
    InputLabel,
    OutlinedInput,
  } from '@mui/material';
  import React, { useCallback, useEffect, useState } from 'react';
  
  import { Did, Utils } from '@kiltprotocol/sdk-js';
  
  function validateDidUri(uri) {
    try {
      return Did.Utils.validateKiltDidUri(uri);
    } catch {
      return false;
    }
  }
  
  function validateAddress(address) {
    try {
      return Utils.DataUtils.validateAddress(address, '');
    } catch {
      return false;
    }
  }
  
  export function getDidUri(uriOrAddress) {
    if (validateDidUri(uriOrAddress)) {
      return uriOrAddress;
    } else if (validateAddress(uriOrAddress)) {
      return Did.Utils.getKiltDidFromIdentifier(uriOrAddress, 'full');
    } else {
      return null;
    }
  }
  
  const InputDid = ({ defaultValue, inputProps, onChange }) => {
    const [didOrAddress, setDidOrAddress] = useState(defaultValue);
    const [fetching, setFetching] = useState(false);
    const [didDetails, setDidDetails] = useState(null);
    const [error, setError] = useState(null);
    const [warn, setWarn] = useState(null);
  
    useEffect(() => {
      onChange?.(didDetails);
    }, [didDetails, onChange]);
  
    const fetchDid = useCallback((didUri) => {
      const { type } = Did.Utils.parseDidUri(didUri);
  
      if (type === 'light') {
        setWarn(new Error('This is a light did, please make sure it is trusted'));
        setDidDetails(Did.LightDidDetails.fromUri(didUri));
      }
  
      return Did.FullDidDetails.fromChainInfo(didUri).then((didDetails) => {
        if (!didDetails) {
          setDidDetails(null);
          setError(new Error("Can't find full did on chain, please make sure it is trusted"));
        } else if (!didDetails.encryptionKey) {
          setDidDetails(null);
          setError(new Error('Input did does not set encryptionKey, you cannot send a message to it'));
        } else {
          setDidDetails(didDetails);
          setWarn(null);
        }
      });
    }, []);
  
    useEffect(() => {
      if (!didOrAddress) return;
  
      const uri = getDidUri(didOrAddress);
  
      if (uri) {
        setError(null);
        setFetching(true);
        fetchDid(uri).finally(() => setFetching(false));
      } else {
        setFetching(true);
        Did.Web3Names.queryDidForWeb3Name(didOrAddress)
          .then((did) => {
            if (did) {
              setError(null);
  
              return fetchDid(did);
            } else {
              throw new Error("Can't found web3Name on chain");
            }
          })
          .catch((error) => {
            setDidDetails(null);
            setError(error);
          })
          .finally(() => setFetching(false));
      }
    }, [didOrAddress, fetchDid]);
  
    return (
      <FormControl color={error ? 'error' : warn ? 'warning' : undefined} error={!!error} fullWidth variant="outlined">
        <InputLabel shrink>Receiver</InputLabel>
        <OutlinedInput
          {...inputProps}
          defaultValue={didOrAddress}
          endAdornment={
            fetching ? (
              <InputAdornment position="end">
                <CircularProgress size={16} />
              </InputAdornment>
            ) : null
          }
          onChange={(e) => setDidOrAddress(e.target.value)}
          placeholder="Did or address or web3Name"
        />
        {error ? (
          <FormHelperText>{error.message}</FormHelperText>
        ) : warn ? (
          <FormHelperText>{warn.message}</FormHelperText>
        ) : null}
      </FormControl>
    );
  };
  
  export default React.memo(InputDid);
  