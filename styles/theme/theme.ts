import {createTheme, Theme} from '@mui/material/styles';
import variables from './variables.module.scss';
import {Campaign} from '@interfaces/campaign';

export interface CustomTheme extends Theme {
  campaign: Campaign
}

export function theme(campaign: Campaign) {
  return {
    ...createTheme({
      palette: {
        primary: {
          main: variables.primaryMain,
          light: variables.primaryLight,
          dark: variables.primaryDark,
        },
        secondary: {
          main: variables.secondaryMain,
        },
        error: {
          main: variables.errorMain
        }
      },
      typography: {
        fontFamily: 'Lato'
      },
    }), campaign
  } as CustomTheme
}
