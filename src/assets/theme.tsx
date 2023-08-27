import { PaletteMode } from "@mui/material";
import { alpha } from "@mui/material";

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
            paper: alpha('#0f2027', 0.9),
            default: '#162031',
          },
        }),
  },
  //Background gradient overrides and scrollbar styles
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          background: mode === 'dark' ? "linear-gradient(to right, #0f2027, #203a43, #2c5364)" : '',
          transition: 'all 0.25s linear',
          scrollbarColor: mode === 'dark' ? "#6b6b6b #2b2b2b" : "#c0c0c0 #f5f5f5",
          "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
            backgroundColor: mode === 'dark' ? "#2c5364" : "#f5f5f5",
          },
          "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
            borderRadius: 4,
            backgroundColor: mode === 'dark' ? "#203a43" : "#c0c0c0",
            minHeight: 10,
            border: mode === 'dark' ? "2px solid #2c5364" : "3px solid #f5f5f5",
          },
          "&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus": {
            backgroundColor: mode === 'dark' ? "#0f2027" : "#a0a0a0",
          },
          "&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active": {
            backgroundColor: mode === 'dark' ? "#0f2027" : "#888888",
          },
          "&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover": {
            backgroundColor: mode === 'dark' ? "#203a43" : "#a0a0a0",
          },
          "&::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner": {
            backgroundColor: mode === 'dark' ? "#2c5364" : "#f5f5f5",
          },
        },
      },
    },
  }
});
