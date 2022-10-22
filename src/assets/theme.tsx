import { PaletteMode } from "@mui/material";
import { amber, grey, deepOrange, blueGrey } from "@mui/material/colors";

export const getThemeDesignTokens = (mode: PaletteMode) => ({
    palette: {
      mode,
      ...(mode === 'light'
        ? {
            // palette values for light mode
            primary: {
                main: '#3b82f6',
            },
          }
        : {
            // palette values for dark mode
            primary: {
                main: '#3b82f6',
              },
              secondary: {
                main: '#d97706',
              },
              background: {
                paper: '#1e293e',
                default: '#162031',
              },
          }),
          overrides: {
            MuiCssBaseline: {
              '@global': {
                body: {
                  transition: 'all 2s linear',
                },
              },
            },
          },
    },
  });
  
  