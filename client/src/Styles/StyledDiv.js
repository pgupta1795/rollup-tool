import { alpha, styled } from '@mui/material/styles';

export const StyledDiv = styled('div')(({ theme }) => ({
  '.bgColor ': {
    backgroundColor:
      theme.palette.mode === 'dark'
        ? theme.palette.common.black
        : theme.palette.primary.main,
  },
}));

export const SearchDiv = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '90%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

export const SearchIconDiv = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 0.5),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'white',
}));
