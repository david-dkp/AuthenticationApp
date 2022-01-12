import {
    Alert,
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormControl,
    IconButton,
    InputAdornment,
    Link,
    Snackbar,
    Stack,
    TextField,
    Typography,
    useTheme
} from "@mui/material";
import DevChallengesLightImg from "../../assets/devchallenges-light.svg"
import DevChallengesDarkImg from "../../assets/devchallenges.svg"
import {EmailRounded, LockRounded} from "@mui/icons-material";
import {useEffect, useState} from "react";
import GoogleSvg from "../../assets/Google.svg"
import Github from "../../assets/Github.svg"
import Footer from "../../components/Footer";
import authApi from "../../apis/authApi";
import {useRouter} from "next/router";

function Login() {
    const router = useRouter()
    const {successful_register} = router.query

    const [showGuessDialog, setShowGuessDialog] = useState(false)
    const [showAlert, setShowAlert] = useState(false)
    const [alertData, setAlertData] = useState({})

    const [showError, setShowError] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const theme = useTheme()
    const devChallengesImage = theme.palette.mode === "light" ? DevChallengesDarkImg : DevChallengesLightImg

    const showSuccessRegisterAlert = () => {
        setAlertData({severity: "success", message: "Your account has been registered. You can log in :D !"})
        setShowAlert(true)
    }

    useEffect(() => {
        if (successful_register) showSuccessRegisterAlert()
    }, [])

    const handleLoginSubmit = async (e) => {
        e.preventDefault()
        try {
            const result = await authApi.login(email, password)
            if (result.request.responseURL && result.request.responseURL !== window.location.href) {
                await router.push(result.request.responseURL)
            }
        } catch (e) {
            setShowError(true)
        }
    }

    const handleLoginGuess = (e) => {
        setShowGuessDialog(true)
    }

    const loginAsGuess = async (e) => {
        try {
            const result = await authApi.loginAsGuess()
            if (result.request.responseURL && result.request.responseURL !== window.location.href) {
                await router.push(result.request.responseURL)
            }
        } catch (e) {
            setShowError(true)
        }
    }

    return <Box sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        width: "100vw",
        minHeight: "100vh",
        backgroundColor: "background.default",
    }}>
        <Dialog open={showGuessDialog}>
            <DialogTitle>Guess mode</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    This guess account will be destroyed if you logout and it will only be available for 24 hours.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setShowGuessDialog(false)} color={"secondary"}>Cancel</Button>
                <Button onClick={loginAsGuess} color={"success"}>{"It's fine"}</Button>
            </DialogActions>
        </Dialog>
        <Snackbar anchorOrigin={{
            horizontal: "center",
            vertical: "top"
        }}
                  open={showError}
                  autoHideDuration={3000}
                  onClose={() => setShowError(false)}

        >
            <Alert severity={"error"} onClose={() => setShowError(false)}>
                Wrong email or password !
            </Alert>
        </Snackbar>

        <Snackbar
            open={showAlert}
            autoHideDuration={3000}
            onClose={() => setShowAlert(false)}
        >
            <Alert onClose={() => setShowAlert(false)} severity={alertData.severity}>
                {alertData.message}
            </Alert>
        </Snackbar>

        <Stack
            sx={{
                minHeight: {
                    xs: "100vh",
                    sm: "auto"
                },
                width: "470px",
                maxWidth: "100%",
            }} justifyContent={"space-between"} p={"10px"} alignItems={"center"} direction={"column"}>
            <Box sx={{
                backgroundColor: "background.default",
                gap: "15px",
                borderRadius: "24px",
                border: {sm: "1px solid #BDBDBD"},
                display: "flex",
                width: "100%",
                flexDirection: "column",
                alignItems: "center",
                py: "clamp(8px, 7vw, 40px)",
                px: "clamp(10px, 7vw, 50px)",
            }}>
                <Box sx={{
                    alignSelf: "start",
                }}
                >
                    <img src={devChallengesImage.src} alt="DevChallenges logo"/>
                </Box>

                <Typography variant={"h1"} sx={{
                    color: "text.primary", alignSelf: "start", fontSize: "1.2em", fontWeight: "600"
                }}>Login</Typography>

                <FormControl sx={{
                    my: "15px"
                }} fullWidth onSubmit={handleLoginSubmit}>
                    <TextField value={email} onChange={e => setEmail(e.target.value)} id="login-input-email"
                               label="Email"
                               type="email" variant="outlined" InputProps={{
                        startAdornment: (<InputAdornment position={"start"}>
                            <EmailRounded/>
                        </InputAdornment>)
                    }}/>

                    <TextField sx={{mt: "15px"}} value={password} onChange={e => setPassword(e.target.value)}
                               id="login-input-password"
                               label="Password" type="password" variant="outlined"
                               InputProps={{
                                   startAdornment: (<InputAdornment position={"start"}>
                                       <LockRounded/>
                                   </InputAdornment>)
                               }}/>

                    <Button sx={{mt: "20px"}} type="submit" onClick={handleLoginSubmit} variant="contained"
                            fullWidth>Login</Button>
                    <Button sx={{mt: "10px", textTransform: "none"}}
                            onClick={handleLoginGuess}
                            color={"secondary"}
                            variant={"outlined"}>Login as Guess</Button>
                </FormControl>
                <Typography variant={"body2"} component="p" sx={{
                    color: "#828282", fontSize: "0.8em",
                }}>or continue with these social profile</Typography>

                <Stack justifyContent={"center"} spacing={0.7} direction="row">
                    <IconButton href={"/api/login/google"}><img src={GoogleSvg.src} alt="Google"/></IconButton>
                    <IconButton href={"/api/login/github"}><img src={Github.src} alt="Github"/></IconButton>
                </Stack>

                <Typography component={"span"} sx={{
                    width: "100%",
                    textAlign: "center",
                    color: "#828282", fontSize: "0.8em",
                }} variant={"body2"}>{"Don't have an account yet?"}<Link sx={{
                    textDecoration: "none"
                }} href="/register">
                    <Typography
                        component={"span"} fontSize={"1em"}
                        color={"#2C8DC5"}> Register</Typography>
                </Link></Typography>
            </Box>
            <Footer sx={{mt: "12px", fontSize: "0.8em", width: "100%"}}/>
        </Stack>
    </Box>
}

export default Login