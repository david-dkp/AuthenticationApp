import '../styles/globals.css'
import {createTheme, ThemeProvider} from "@mui/material";
import {createContext, useMemo, useState} from "react";
import App from "next/app"
import axiosConfig from "../apis/axiosConfig";

axiosConfig.configure()

const getTheme = (mode) => createTheme({
    palette: {
        mode,
        basic: "#828282",
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

const ColorModeContext = createContext({
    toggleColorMode: () => {
    }, setColorMode: (mode) => {
    }
})

function MyApp({Component, pageProps}) {
    const [themeMode, setThemeMode] = useState("dark")
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

    const getLayout = Component.getLayout || ((page) => page)

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                {getLayout(<Component {...pageProps} />)}
            </ThemeProvider>
        </ColorModeContext.Provider>
    )
}

MyApp.getInitialProps = async (appContext) => {
    // calls page's `getInitialProps` and fills `appProps.pageProps`
    const appProps = await App.getInitialProps(appContext);

    return {...appProps};
};

export default MyApp
