import * as React from 'react';
import { Did } from '@kiltprotocol/sdk-js';
import { Typography } from '@mui/material';
import { Address } from './Address';

import { getW3Name, w3NameCaches } from './GetW3Name';

const DidName = ({ shorten = true, value }) => {
    const [w3Name, setW3Name] = React.useState(null);

    const identifier = React.useMemo(() => {
        if (!value) return null;

        if (!Did.Utils.isUri(value)) return 'Not Did uri';

        const { identifier, type } = Did.Utils.parseDidUri(value);

        if (type === 'light') {
            return identifier.slice(2);
        } else {
            return identifier;
        }
    }, [value]);

    React.useEffect(() => {
        if (!identifier) return;

        getW3Name(identifier).then(setW3Name);
    }, [identifier]);

    return w3Name ? (
        <>{w3Name}</>
    ) : identifier && w3NameCaches[identifier] ? (
        <>{w3NameCaches[identifier]}</>
    ) : (
        <Typography sx={{color: 'whitesmoke'}}>
        did:kilt:
        <Address shorten={shorten} value={identifier} />
        </Typography>
    );
};

export default React.memo(DidName);