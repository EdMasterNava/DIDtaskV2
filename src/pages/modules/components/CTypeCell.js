import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import {
  alpha,
  Box,
  IconButton,
  Paper,
  Stack,
  styled,
  SvgIcon,
  Tooltip,
  Typography
} from '@mui/material';
import React, { useCallback } from 'react';

// import { isMobile } from '@credential/react-hooks/utils/userAgent';

import { useCTypeContext } from './CTypeProvider';
import DidName from './DidName';

import CreateClaim from './CreateClaim';

const Wrapper = styled(Paper)(({ theme }) => ({
  position: 'relative',
  padding: theme.spacing(4),
  height: 240,
  borderRadius: theme.spacing(2.5),

  ':hover': {
    boxShadow: theme.shadows[3],

    '.CTypeCell_logo': {
      transform: 'scale(0.8)'
    },

    '.CTypeCell_title': {
      transform: 'translate(60px, -62px) scale(0.8)'
    },
    '.CTypeCell_attester': {
      transform: 'translate(0, -50px)'
    },
    '.CTypeCell_actions': {
      opacity: 1,
      transform: 'translateY(0)'
    }
  },
  '.CTypeCell_logo': {
    width: 60,
    height: 60,
    border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
    borderRadius: 30,
    padding: theme.spacing(0.6),
    transformOrigin: 'top left',
    transform: null,

    transition: theme.transitions.create(['transform'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    }),

    '>svg': {
      width: '100%',
      height: '100%'
    }
  },
  '.CTypeCell_title': {
    transformOrigin: 'top left',
    transform: null,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',

    transition: theme.transitions.create(['transform'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  '.CTypeCell_attester': {
    transformOrigin: 'top left',
    transform: null,

    transition: theme.transitions.create(['transform'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  '.CTypeCell_actions': {
    left: theme.spacing(4),
    right: theme.spacing(4),
    bottom: theme.spacing(4),
    position: 'absolute',
    textAlign: 'center',
    opacity: 0,
    transform: 'translateY(20px)',

    transition: theme.transitions.create(['transform', 'opacity'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  }
}));

const CTypeCell = ({ cType }) => {
  const { deleteCType } = useCTypeContext();

  const handleDelete = useCallback(() => {
    deleteCType(cType.hash);
  }, [cType.hash, deleteCType]);

  return (
    <Wrapper
      sx={{ bgcolor: '#37383D' }}
    >
        <IconButton
          onClick={handleDelete}
          size="small"
          sx={{ position: 'absolute', right: 10, top: 10 }}
        >
          <DeleteOutlineOutlinedIcon sx={{color: 'whitesmoke'}}/>
        </IconButton>
      <Stack spacing={1.5}>
        <Box >
            <SvgIcon  />
        </Box>
        <Tooltip title={cType.schema.title}>
          <Typography className="CTypeCell_title" variant="h3" sx={{color: 'whitesmoke'}}>
            {cType.schema.title}
          </Typography>
        </Tooltip>
        <Stack className="CTypeCell_attester" direction="row" justifyContent="space-between">
          <Box width="50%">
            <Typography sx={({ palette }) => ({ color: palette.grey[600] })} variant="inherit">
              Attested by
            </Typography>
            <Tooltip placement="top" title={cType.owner ?? ''}>
              <Typography sx={{ fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                <DidName value={cType.owner} />
              </Typography>
            </Tooltip>
          </Box>
          <Box width="50%">
            <Typography sx={({ palette }) => ({ color: palette.grey[600] })} variant="inherit">
              Hash
            </Typography>
            <Tooltip placement="top" title={cType.hash ?? ''}>
              <Typography sx={{ fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', color: 'whitesmoke' }}>{cType.hash}</Typography>
            </Tooltip>
          </Box>
        </Stack>
        <Box className="CTypeCell_actions">
          <CreateClaim ctype={cType} />
        </Box>
      </Stack>
    </Wrapper>
  );
};

export default React.memo(CTypeCell);
