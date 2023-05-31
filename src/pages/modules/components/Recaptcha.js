import { Box } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';

const Recaptcha = ({ onCallback }) => {
  const [, setError] = useState();

  const container = useRef();

  useEffect(() => {
    const script = document.createElement('script');

    script.onload = () => {
      const { grecaptcha } = window;

      grecaptcha.ready(() => {
        if (container.current) {
          grecaptcha.render(container.current, {
            callback: (response) => {
              onCallback(response);
            },
            sitekey: '6LdmRHogAAAAAF9YN6bMc6hNExitqRJog3-wDkH-'
          });
        }
      });
    };

    script.onerror = (error) => {
      setError(error.toString());
    };

    script.src = 'https://www.google.com/recaptcha/api.js';

    document.body.appendChild(script);
  }, [onCallback]);

  return <Box ref={container} />;
};

export default React.memo(Recaptcha);
