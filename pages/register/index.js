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
import {useRouter} from "next/router";

function Register() {
    const router = useRouter()
    const [showAlreadyExistAlert, setShowAlreadyExistAlert] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [emailErrorText, setEmailErrorText] = useState("")
    const [passwordErrorText, setPasswordErrorText] = useState("")

    const theme = useTheme()
    const devChallengesImage = theme.palette.mode === "light" ? DevChallengesDarkImg : DevChallengesLightImg

    const handleLoginSubmit = async (e) => {
        e.preventDefault()
        try {
            const result = await authApi.register(email, password)
            if (result.data.type === "success") {
                await router.push("/")
            }
        } catch (e) {
            if (e.response.data.error) {
                setEmailErrorText(e.response.data.error.email ?? "")
                setPasswordErrorText(e.response.data.error.password ?? "")
            } else if (e.response.data.message) {
                setShowAlreadyExistAlert(true)
                setEmailErrorText("")
                setPasswordErrorText("")
            }
        }
    }

    return <Box sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100vw",
        minHeight: "100vh",
        backgroundColor: "background.default",
    }}>
        <Snackbar autoHideDuration={3000} anchorOrigin={{
            vertical: "top",
            horizontal: "center"
        }} open={showAlreadyExistAlert} onClose={() => setShowAlreadyExistAlert(false)}>
            <Alert severity={"error"} onClose={() => setShowAlreadyExistAlert(false)}>
                The user already exists !
            </Alert>
        </Snackbar>
        <Stack sx={{
            minHeight: {
                xs: "100vh",
                sm: "auto"
            }
        }}
               justifyContent={"space-between"} p={"10px"} direction={"column"} alignItems={"center"}>
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
                }}>Join thousands of learners from around the world</Typography>

                <Typography variant={"body2"} component="p"
                            sx={{color: "text.primary", alignSelf: "start", lineHeight: "1.3em"}}>Master web
                    development by
                    making real-life projects. There are
                    multiple paths for
                    you to choose</Typography>

                <FormControl sx={{
                    my: "15px"
                }} fullWidth onSubmit={handleLoginSubmit}>
                    <TextField value={email}
                               onChange={e => setEmail(e.target.value)}
                               id="register-input-email"
                               label="Email"
                               type="email"
                               variant="outlined"
                               error={emailErrorText.length > 0}
                               helperText={emailErrorText}
                               InputProps={{
                                   startAdornment: (<InputAdornment position={"start"}>
                                       <EmailRounded/>
                                   </InputAdornment>)
                               }}/>

                    <TextField sx={{mt: "15px"}}
                               value={password}
                               error={passwordErrorText.length > 0}
                               helperText={passwordErrorText}
                               onChange={e => setPassword(e.target.value)}
                               id="register-input-password"
                               label="Password"
                               type="password"
                               variant="outlined"
                               InputProps={{
                                   startAdornment: (<InputAdornment position={"start"}>
                                       <LockRounded/>
                                   </InputAdornment>)
                               }}/>

                    <Button sx={{mt: "20px"}} type="submit" onClick={handleLoginSubmit} variant="contained" fullWidth>
                        Start Coding Now</Button>
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
                }} variant={"body2"}>Already a member?<Link sx={{
                    textDecoration: "none"
                }} href="/login">
                    <Typography
                        component={"span"} fontSize={"1em"}
                        color={"#2C8DC5"}> Login</Typography>
                </Link></Typography>

            </Box>
            <Footer sx={{mt: "12px", fontSize: "0.8em", width: "100%"}}/>
        </Stack>
    </Box>
}

export default Register