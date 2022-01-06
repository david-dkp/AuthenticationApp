import '../styles/globals.css'
import axiosConfig from "../apis/axiosConfig"
import {createTheme, ThemeProvider} from "@mui/material";
import {createContext, useEffect, useMemo, useState} from "react";
import userApi from "../apis/userApi";
import App from "next/app"

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

axiosConfig.configure()

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

    useEffect(() => {
        userApi.getUser(1).then(r => console.log(r)).catch(e => console.log(e))
    }, [])

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

    return { ...appProps };
};

export default MyApp
