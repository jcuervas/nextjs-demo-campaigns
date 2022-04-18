import {styled} from '@mui/material/styles';
import LinearProgress from '@mui/material/LinearProgress';
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import sx from '@mui/system/sx';
import {alpha, IconButton, Typography} from '@mui/material';

export const StyledLinearProgress = styled(LinearProgress)(({}) => ({
  position: 'absolute',
  top: 0,
  right: 0,
  width: '100%'
}));

export const StyledBackground = styled('div')(({theme}) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  background: 'url(' + theme['campaign'].template.backgroundImg + ')',
  backgroundSize: 'cover',
  zIndex: '-1'
}));

export const StyledLogo = styled('img')(({}) => ({
  width: '200px'
}));

export const StyledCard = styled(Card)(({theme}) => sx({
  backgroundColor: theme['campaign'].template.backgroundColor,
  height: '100%',
  width: '100%',
  color: theme['campaign'].template.textColor,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  '& .MuiCardContent-root': {
    padding: {
      lg: theme.spacing(6),
      md: theme.spacing(4),
      sm: theme.spacing(4),
      xs: theme.spacing(3)
    },
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    '& img': {
      maxWidth: '100%'
    },
    '& p': {
      width: '100%',
      textAlign: 'left',
    },
    '& .actions': {
      margin: theme.spacing(4, 0, 2),
      display: 'flex',
      justifyContent: 'space-between',
      width: '100%',
      '& form': {
        margin: 'auto'
      }
  },
  }
}));

export const StyledTextField = styled(TextField)(({theme}) => ({
  width: '100%',
  '& .MuiInputLabel-formControl': {
    color: alpha(theme.palette.common.white, 0.8),
  },
  '& .MuiInputBase-root ': {
    color: theme.palette.common.white,
    '&.MuiInput-underline': {
      '&:before': {
        borderBottomWidth: '1px',
        borderBottomStyle: 'solid',
        borderBottomColor: theme.palette.primary.main
      },
      '&:after': {
        borderBottomWidth: '2px solid #d79a2a',
        borderBottomStyle: 'solid',
        borderBottomColor: theme.palette.primary.main
      }
    }
  }
}));

export const StyledButton = styled(Button)(({theme}) => sx({
  fontFamily: 'Prelo',
  fontSize: '1rem',
  color: theme.palette.common.white,
  border: 0,
  width: {xl: '156px', lg: '136px', md: '116px', sm: '106px'},
  height: {lg: '50px', md: '45px', sm: '40px', xs: '40px'},
  position: 'relative',
  padding: theme.spacing(1, 2),
  outline: 'none',
  transition: 'all 0.3s ease',
  zIndex: 0,
  '&.ok': {
    backgroundColor: theme.palette.primary.main,
    right: {xs: '24px', sm: '1.1vw'},
    '&:after': {
      content: '""',
      width: {lg: '37px', md: '34px', xs: '30px'},
      height: {lg: '37px', md: '34px', xs: '30px'},
      borderRadius: '5px',
      backgroundColor: theme.palette.primary.main,
      transform: 'rotate(45deg)',
      position: 'absolute',
      right: {lg: '-18px', md: '-15px', xs: '-12px'},
      top: {lg: '7px', md: '5.5px', xs: '5px'},
      zIndex: '-1',
      transition: 'all .3s ease',
    },
    '&:hover:not(:disabled)': {
      backgroundColor: theme.palette.primary.dark,
      '&:after': {
        backgroundColor: theme.palette.primary.dark
      }
    }
  },
  '&.ko': {
    backgroundColor: theme.palette.secondary.main,
    left: {xs: '24px', sm: '1.1vw'},
    '&:after': {
      content: '""',
      width: {lg: '37px', md: '34px', sm: '30px', xs: '30px'},
      height: {lg: '37px', md: '34px', sm: '30px', xs: '30px'},
      borderRadius: '5px',
      backgroundColor: theme.palette.secondary.main,
      transform: 'rotate(45deg)',
      position: 'absolute',
      left: {lg: '-18px', md: '-15px', sm: '-12px', xs: '-12px'},
      top: {lg: '7px', md: '5.5px', sm: '5px', xs: '5px'},
      zIndex: '-1',
      transition: 'all .3s ease',
    },
    '&:hover:not(:disabled)': {
      backgroundColor: theme.palette.error.main,
      '&:after': {
        backgroundColor: theme.palette.error.main
      }
    }
  },
  '&:disabled': {
    opacity: '0.6',
    cursor: 'default'
  }
}))


export const StyledIconButton = styled(IconButton)(({theme}) => ({
  width: '100%',
  height: '108px',
  borderRadius: 4,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-evenly',
  backgroundColor: theme.palette.grey['400'],
  '& p.MuiTypography-root': {
    textAlign: 'center'
  },
  "&:hover": {
    backgroundColor: theme.palette.grey['500'],
  }
}))

export const StyledText = styled(Typography)(({theme}) => ({
  color: theme['campaign'].template.textColor
}))

