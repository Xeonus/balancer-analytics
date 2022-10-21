import * as React from 'react';
import { useContext } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const ThemeContext = React.createContext();
const ThemeUpdateContext = React.createContext();

export function useTheme() {
    return useContext(ThemeContext);
}

export function useThemeUpdate() {
    return useContext(TheUpdateContext);
}

//Color mode
const ColorModeContext = React.createContext({ toggleColorMode: () => { } });


export function ThemeProvider ({ children }) {
    const [mode, setMode] = React.useState<'light' | 'dark'>('light');

    const colorMode = React.useMemo(
        () => ({
          toggleColorMode: () => {
            setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
          },
        }),
        [],
      );
    
    const theme = React.useMemo(() => createTheme(getThemeDesignTokens(mode)), [mode]);
    
    return (
        <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
        <ThemeContext.Provider value={mode}>
            <ThemeUpdateContext.Provider value={toggleColorMode}>
                {children}
            </ThemeUpdateContext.Provider>
        </ThemeContext.Provider>
        </ThemeProvider>
        </ColorModeContext.Provider>
    )
}