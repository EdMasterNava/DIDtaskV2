import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { deserializer, getCache, serializer } from './Cache';

export function useLocalStorage(key, initialvalue) {
  const keyRef = useRef(key);

  const [value, setValue] = useState(getCache(keyRef.current) || initialvalue);

  const remove = useCallback(() => {
    localStorage.removeItem(keyRef.current);
    setValue(undefined);
  }, []);

  useEffect(() => {
    const _value = localStorage.getItem(keyRef.current);
    // console.log('useEffect _value: ', _value);
    if (_value) {
      setValue(deserializer(_value));
    }
    // console.log('value after useEffect: ', value);
  }, []);

  useEffect(() => {
    const v = serializer(value);
    // console.log('useEffect 2 serializer localStorage.setItem: ', keyRef.current, v);
    localStorage.setItem(keyRef.current, v);
  }, [value]);

  return useMemo(() => [value, setValue, remove], [remove, value]);
}