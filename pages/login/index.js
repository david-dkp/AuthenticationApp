import {
    Alert,
    Box,
    Button,
    FormControl,
    IconButton,
    InputAdornment,
    Link, Snackbar,
    Stack,
    TextField,
    Typography,
    useTheme
} from "@mui/material";
import DevChallengesLightImg from "../../assets/devchallenges-light.svg"
import DevChallengesDarkImg from "../../assets/devchallenges.svg"
import {EmailRounded, LockRounded} from "@mui/icons-material";
import {useState} from "react";
import GoogleSvg from "../../assets/Google.svg"
import FacebookSvg from "../../assets/Facebook.svg"
import Twitter from "../../assets/Twitter.svg"
import Github from "../../assets/Github.svg"
import Footer from "../../components/Footer";
import authApi from "../../apis/authApi";

function Login() {
    const [showError, setShowError] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const theme = useTheme()
    const devChallengesImage = theme.palette.mode === "light" ? DevChallengesDarkImg : DevChallengesLightImg

    const handleLoginSubmit = async (e) => {
        e.preventDefault()
        try {
            await authApi.login(email, password)
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
        <Snackbar anchorOrigin={{
            horizontal: "center",
            vertical: "top"
        }} open={showError}>
            <Alert severity={"error"} onClose={() => setShowError(false)}>
                Wrong email or password !
            </Alert>
        </Snackbar>
        <Stack
            sx={{
            minHeight: {
                xs: "100vh",
                sm: "auto"
            }
        }}  justifyContent={"space-between"} p={"10px"} alignItems={"center"} direction={"column"}>
            <Box sx={{
                backgroundColor: "background.default",
                gap: "15px",
                borderRadius: "24px",
                border: {sm: "1px solid #BDBDBD"},
                display: "flex",
                width: "100%",
                maxWidth: "470px",
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
                </FormControl>
                <Typography variant={"body2"} component="p" sx={{
                    color: "#828282", fontSize: "0.8em",
                }}>or continue with these social profile</Typography>

                <Stack justifyContent={"center"} spacing={0.7} direction="row">
                    <IconButton href={"/api/login/google"}><img src={GoogleSvg.src} alt="Google"/></IconButton>
                    <IconButton><img src={FacebookSvg.src} alt="Facebook"/></IconButton>
                    <IconButton><img src={Twitter.src} alt="Twitter"/></IconButton>
                    <IconButton><img src={Github.src} alt="Github"/></IconButton>
                </Stack>

                <Typography component={"span"} sx={{
                    width: "100%",
                    textAlign: "center",
                    color: "#828282", fontSize: "0.8em",
                }} variant={"body2"}>Don't have an account yet?<Link sx={{
                    textDecoration: "none"
                }} href="/register">
                    <Typography
                        component={"span"} fontSize={"1em"}
                        color={"blue"}> Register</Typography>
                </Link></Typography>
            </Box>
            <Footer sx={{mt: "12px", fontSize: "0.8em", width: "100%"}}/>
        </Stack>
    </Box>
}

export default Login