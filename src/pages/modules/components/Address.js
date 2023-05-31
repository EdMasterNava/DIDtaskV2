import * as React from 'react';

export const Address = ({ shorten = true, value }) => {
    if (!value) {
        return null;
    }

    return shorten ? (
        <>
        {value.slice(0, 6)}...{value.slice(-6)}
        </>
    ) : (
        <>
            {value}
        </>
    );
};
