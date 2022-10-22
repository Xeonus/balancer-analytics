import * as React from 'react';
import { useContext } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { getThemeDesignTokens } from '../assets/theme';

const ThemeContext = React.createContext();
const ThemeUpdateContext = React.createContext();
//Color mode
const colorMode = React.useMemo(
    () => ({
        toggleColorMode: () => {
            setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
        },
    }),
    [],
);
const ColorModeContext = React.createContext({ toggleColorMode: () => { } });

export function useContextThemeMode() {
    return useContext(ThemeContext);
}

export function useThemeUpdate() {
    return useContext(ThemeUpdateContext);
}

export function useColorModeContext() {
    return useContext(ColorModeContext);
}


export function ThemeProviderAnalytics({ children }) {
    const [mode, setMode] = React.useState < 'light' | 'dark' > ('light');

    

    const theme = React.useMemo(() => createTheme(getThemeDesignTokens(mode)), [mode]);

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <ThemeContext.Provider value={mode}>
                    <ThemeUpdateContext.Provider value={''}>
                        {children}
                    </ThemeUpdateContext.Provider>
                </ThemeContext.Provider>
            </ThemeProvider>
        </ColorModeContext.Provider>
    )
}