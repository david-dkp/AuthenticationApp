import '../styles/globals.css'
import {createTheme, ThemeProvider} from "@mui/material";
import {createContext, useMemo, useState} from "react";

const getTheme = (mode) => createTheme({
    palette: {
        mode,
        ...(mode === "light" ? {
            primary: {
                main: '#2F80ED'
            },
            secondary: {
                main: '#f50057',
            },
            error: {
                main: '#EB5757',
            },

        } : {
            primary: {
                main: '#2F80ED'
            },
            background: {
                default: "#252329"
            }
        })
    },
    typography: {
        fontFamily: '"Noto Sans", "Roboto", "Helvetica", "Arial", sans-serif',
        fontSize: 16,
    },
    shape: {
        borderRadius: 8,
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: "capitalize"
                }
            },
            variants: [{props: {variant: "outlined"}, style: {borderRadius: 12}}]
        }
    }
});

const ColorModeContext = createContext({toggleColorMode: () => {}, setColorMode: (mode) => {}})

function MyApp({Component, pageProps}) {
    const [themeMode, setThemeMode] = useState("light")
    const theme = getTheme(themeMode)

    const colorMode = useMemo(
        () => ({
            toggleColorMode: () => {
                setThemeMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
            },
            setColorMode: (mode) => {
                setThemeMode(mode)
            }
        }),
        [],
    );

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <Component {...pageProps} />
            </ThemeProvider>
        </ColorModeContext.Provider>
    )
}

export default MyApp
