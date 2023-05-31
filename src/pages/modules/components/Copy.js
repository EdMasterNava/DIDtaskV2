import * as React from 'react';
import Check from '@mui/icons-material/Check';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { IconButton } from '@mui/material';

import { useCopyClipboard } from './useCopyClipboard';

const Copy = ({ value }) => {
    const [isCopied, copy] = useCopyClipboard();

    return (
        <IconButton onClick={() => copy(value)} size="small" sx={{ padding: 0 }}>
            {!isCopied ? (
                <ContentCopyIcon sx={{ width: 16, height: 16 }} />
            ) : (
                <Check sx={{ width: 16, height: 16 }} />
            )}
        </IconButton>
    );
};

export default React.memo(Copy);