import * as React from 'react';
import copy from 'copy-to-clipboard';


export function useCopyClipboard(timeout = 500) {
    const [isCopied, setIsCopied] = React.useState(false);

    const staticCopy = React.useCallback((text) => {
        const didCopy = copy(text);

        setIsCopied(didCopy);
    }, []);

    React.useEffect(() => {
        if (isCopied) {
        const hide = setTimeout(() => {
            setIsCopied(false);
        }, timeout);

        return () => {
            clearTimeout(hide);
        };
        }

        return undefined;
    }, [isCopied, setIsCopied, timeout]);

    return [isCopied, staticCopy];
}