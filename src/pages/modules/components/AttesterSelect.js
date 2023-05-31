import {
    Autocomplete,
    CircularProgress,
    createFilterOptions,
    FormControl,
    FormHelperText,
    InputAdornment,
    InputLabel,
    OutlinedInput
  } from '@mui/material';
  import React, { useCallback, useEffect, useRef, useState } from 'react';
  
  import { getDidUri } from './InputDid';
  
  const filter = createFilterOptions({});
  
  const AttesterSelect = ({ defaultValue, disabled = false, onChange }) => {
    const [attester, setAttester] = useState(defaultValue);
    const options = useRef([{ title: defaultValue }].filter(Boolean));
    const [didDetails, setDidDetails] = useState(null);
    const [fetching, setFetching] = useState(false);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      if (!error) {
        onChange?.(didDetails);
      } else {
        onChange?.(null);
      }
    }, [didDetails, error, onChange]);
  
    const fetchDid = useCallback((didUri) => {
      return Did.FullDidDetails.fromChainInfo(didUri).then((didDetails) => {
        if (!didDetails) {
          setDidDetails(null);
          setError(new Error("Can't find full did on chain, please make sure attester is trusted"));
        } else if (!didDetails.encryptionKey) {
          setDidDetails(null);
          setError(
            new Error('Attester does not set encryptionKey, you cannot send a message to the attester')
          );
        } else {
          setDidDetails(didDetails);
          setError(null);
        }
      });
    }, []);
  
    useEffect(() => {
      if (!attester) return;
  
      const uri = getDidUri(attester);
  
      if (uri) {
        setError(null);
  
        setFetching(true);
        fetchDid(uri).finally(() => setFetching(false));
      } else {
        setFetching(true);
        Did.Web3Names.queryDidForWeb3Name(attester)
          .then((did) => {
            if (did) {
              setError(null);
  
              return fetchDid(did);
            } else {
              throw new Error("Can't find web3Name on chain");
            }
          })
          .catch((error) => {
            setDidDetails(null);
            setError(error);
          })
          .finally(() => setFetching(false));
      }
    }, [attester, fetchDid]);
  
    return (
      <Autocomplete
        clearOnBlur
        defaultValue={defaultValue}
        disabled={disabled}
        filterOptions={(options, params) => {
          const filtered = filter(options, params);
  
          const { inputValue } = params;
          // Suggest the creation of a new value
          const isExisting = options.some((option) => inputValue === option.title);
  
          if (inputValue !== '' && !isExisting) {
            filtered.push({
              inputValue,
              title: `Add attester "${inputValue}"`
            });
          }
  
          return filtered;
        }}
        freeSolo
        getOptionLabel={(option) => {
          // Value selected with enter, right from the input
          if (typeof option === 'string') {
            return option;
          }
  
          // Add "xxx" option created dynamically
          if (option.inputValue) {
            return option.title;
          }
  
          // Regular option
          return option.title;
        }}
        handleHomeEndKeys
        onChange={(_, newValue) => {
          if (typeof newValue === 'string') {
            setAttester(newValue);
          } else if (newValue && newValue.inputValue) {
            // Create a new value from the user input
            setAttester(newValue.inputValue);
          } else {
            setAttester(newValue?.title ?? null);
          }
        }}
        options={options.current}
        renderInput={(params) => (
          <FormControl color={error ? 'error' : undefined} error={!!error} fullWidth={params.fullWidth}>
            <InputLabel {...params.InputLabelProps} shrink>
              Attester
            </InputLabel>
            <OutlinedInput
              {...params.InputProps}
              disabled={params.disabled}
              endAdornment={
                fetching ? (
                  <InputAdornment position="end">
                    <CircularProgress size={16} />
                  </InputAdornment>
                ) : (
                  params.InputProps.endAdornment
                )
              }
              inputProps={params.inputProps}
            />
            {error ? <FormHelperText>{error.message}</FormHelperText> : null}
          </FormControl>
        )}
        selectOnFocus
        value={attester}
      />
    );
  };
  
  export default React.memo(AttesterSelect);
  