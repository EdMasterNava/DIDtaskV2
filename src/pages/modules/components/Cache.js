export const serializer = (value) => {
    return JSON.stringify({
      value,
      time: Date.now()
    });
  };
  
  export const deserializer = (value) => {
    // console.log('Deserializer: ', JSON.parse(value).value)
    return JSON.parse(value).value;
  };
  
  export const getCache = (key) => {
    const value = localStorage.getItem(key);
    // console.log('getCache', value);
    if (value) {
      return deserializer(value);
    }
  
    return undefined;
  };