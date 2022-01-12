import HomeLayout from "../../components/HomeLayout";
import {
    Alert,
    Box,
    Button,
    FormControl,
    IconButton,
    InputAdornment,
    Snackbar,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import {ArrowBackIosRounded, PhotoCameraRounded, VisibilityOffRounded, VisibilityRounded} from "@mui/icons-material";
import {useEffect, useState} from "react";
import userApi from "../../apis/userApi";
import * as CookieParser from "cookie";
import axios from "axios";
import Footer from "../../components/Footer";
import {useRouter} from "next/router";

const ChangeInfoHeader = () => {
    return (
        <Box sx={{
            width: "100%",
            display: "flex",
        }}>
            <Box>
                <Typography sx={{fontSize: "1.5em"}} variant={"h2"}>Change Info</Typography>
                <Typography sx={{fontSize: "0.9em", color: "#828282"}} variant={"body2"}>
                    Changes will be reflected to every services
                </Typography>
            </Box>
        </Box>
    )
}

const ChangePhoto = ({photoUrl, onFileSelected}) => {
    const [photoFileSelected, setPhotoFileSelected] = useState(null)
    const [currentPhotoUrl, setCurrentPhotoUrl] = useState(photoUrl)

    const handlePhotoImageChange = (e) => {
        setPhotoFileSelected(e.target.files[0])
        onFileSelected(e.target.files[0])
    }

    useEffect(() => {
        if (!photoFileSelected) {
            return
        }

        const objectUrl = URL.createObjectURL(photoFileSelected)
        setCurrentPhotoUrl(objectUrl)

        return () => URL.revokeObjectURL(objectUrl)
    }, [photoFileSelected])


    return (
        <Button sx={{color: "white", padding: 0}} component={"label"}>
            <Box sx={{
                height: "72px",
                borderRadius: "8px",
                overflow: "hidden",
                width: "72px",
                position: "relative",
                cursor: "pointer",
                justifyContent: "center",
                alignItems: "center"
            }}>
                <img style={{objectFit: "cover", width: "100%", height: "100%"}} src={currentPhotoUrl}
                     alt={"Profile Picture"}
                />
                <Box sx={{
                    opacity: 0,
                    position: "absolute",
                    left: 0,
                    top: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: "rgba(0, 0, 0, 0.2)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    transition: "all 0.25s ease",

                    "&:hover": {
                        opacity: 1,
                    }
                }}>
                    <PhotoCameraRounded/>
                </Box>
            </Box>
            <input
                name={"photoFile"}
                accept={"image/*"}
                type="file"
                hidden
                onChange={handlePhotoImageChange}
            />
        </Button>
    )
}

function EditProfile({user}) {
    const router = useRouter()

    const [photoFileSelected, setPhotoFileSelected] = useState(null)
    const [showPassword, setShowPassword] = useState(false)

    const [name, setName] = useState(user.name ?? "")
    const [bio, setBio] = useState(user.bio ?? "")
    const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber ?? "")

    const [email, setEmail] = useState(user.email ?? "")
    const [emailErrorText, setEmailErrorText] = useState("")

    const [password, setPassword] = useState("")
    const [passwordErrorText, setPasswordErrorText] = useState("")

    const [alertData, setAlertData] = useState({})
    const [showAlert, setShowAlert] = useState(false)

    const showErrorAlert = (message) => {
        setAlertData({severity: "error", message})
        setShowAlert(true)
    }

    const clearFields = () => {
        setName("")
        setBio("")
        setPhoneNumber("")
        setEmail("")
        setEmailErrorText("")
        setPassword("")
        setPasswordErrorText("")
    }

    const handleSubmit = async () => {
        const formData = new FormData()

        if (photoFileSelected) formData.append("photoFile", photoFileSelected)
        formData.append("name", name)
        formData.append("bio", bio)
        formData.append("phoneNumber", phoneNumber)
        formData.append("email", email)
        if (password !== "") formData.append("password", password)

        try {
            const result = await userApi.updateAuthUser(formData)

            if (result.data.type === "success") {
                await router.push("/?successful_edit=true")
            }
        } catch (e) {
            const result = e.response

            if (result.data.error) {
                if (result.data.error.email) setEmailErrorText(result.data.error.email)
                if (result.data.error.password) setPasswordErrorText(result.data.error.password)
            }

            if (result.data.message) {
                showErrorAlert(result.data.message)
            }
            showErrorAlert("Something went wrong, please try again.")
        }
    }

    return (
        <Box sx={{
            width: "100vw", minHeight: "calc(90vh - 64px)", display: "flex", justifyContent: "center",
            backgroundColor: "background.default",
            color: "text.primary",
            paddingBottom: "15px",
        }}>
            <Snackbar
                open={showAlert}
                autoHideDuration={3000}
                onClose={() => setShowAlert(false)}
            >
                <Alert onClose={() => setShowAlert(false)} severity={alertData.severity}>
                    {alertData.message}
                </Alert>
            </Snackbar>
            <Box sx={{
                display: "flex",
                width: "100%",
                margin: "15px",
                maxWidth: "845px",
                flexDirection: "column",
                alignItems: "center",
                gap: "10px",
            }}>
                <Button style={{alignSelf: "start"}}
                        startIcon={<ArrowBackIosRounded sx={{height: "0.8em"}}/>}
                        href={"/"}
                        variant={"text"}
                        sx={{
                            color: "#2D9CDB"
                        }}>
                    Back
                </Button>
                <Box component={"section"} sx={{
                    mt: "16px",
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                    border: "1px solid #E0E0E0",
                    padding: "2em clamp(10px, 4vw, 3em)",
                    borderRadius: "12px",
                    background: "#E0E0E0",
                    gap: "2em",
                    backgroundColor: "background.default"
                }}>
                    <ChangeInfoHeader/>
                    <FormControl
                        onSubmit={e => console.log(e)}
                        sx={{
                            maxWidth: "415px",
                            gap: "2em",
                            display: "flex",
                            flexDirection: "column",
                            "label": {
                                fontSize: "0.81em"
                            }
                        }}
                    >
                        <Stack alignItems={"center"} flexDirection={"row"}>
                            <ChangePhoto photoUrl={user.photoUrl} onFileSelected={setPhotoFileSelected}/>
                            <Typography sx={{
                                ml: "2rem",
                                color: "#828282",
                                textTransform: "uppercase",
                                fontSize: "0.8em"
                            }} variant={"h2"}>change photo</Typography>
                        </Stack>

                        <Stack gap={"5px"}>
                            <label htmlFor="edit-profile-name-input">Name</label>
                            <TextField value={name}
                                       onChange={(e) => setName(e.target.value)}
                                       name={"name"}
                                       InputProps={{sx: {fontSize: "1em"}}}
                                       sx={{fontSize: "1em"}}
                                       placeholder={"Enter your name..."}
                                       id="edit-profile-name-input"
                                       variant="outlined"/>
                        </Stack>

                        <Stack gap={"5px"}>
                            <label htmlFor="edit-profile-bio-input">Bio</label>
                            <TextField value={bio}
                                       onChange={(e) => setBio(e.target.value)}
                                       name={"bio"}
                                       InputProps={{sx: {fontSize: "1em"}}}
                                       sx={{fontSize: "1em"}}
                                       placeholder={"Enter your bio..."}
                                       minRows={3}
                                       type={"text"}
                                       multiline
                                       id="edit-profile-bio-input"
                                       variant="outlined"/>
                        </Stack>

                        <Stack gap={"5px"}>
                            <label htmlFor="edit-profile-phone-input">Phone</label>
                            <TextField value={phoneNumber}
                                       onChange={(e) => setPhoneNumber(e.target.value)}
                                       name={"phone"}
                                       InputProps={{sx: {fontSize: "1em"}}}
                                       sx={{fontSize: "1em"}}
                                       type={"tel"}
                                       placeholder={"Enter your phone..."}
                                       id="edit-profile-phone-input"
                                       variant="outlined"/>
                        </Stack>

                        <Stack gap={"5px"}>
                            <label htmlFor="edit-profile-email-input">Email</label>
                            <TextField value={email}
                                       onChange={(e) => setEmail(e.target.value)}
                                       error={emailErrorText !== ""}
                                       helperText={emailErrorText}
                                       name={"email"}
                                       InputProps={{sx: {fontSize: "1em"}}}
                                       sx={{fontSize: "1em"}}
                                       type={"email"}
                                       placeholder={"Enter your email..."}
                                       id="edit-profile-email-input"
                                       variant="outlined"/>
                        </Stack>

                        <Stack gap={"5px"}>
                            <label htmlFor="edit-profile-password-input">Password</label>
                            <TextField value={password}
                                       onChange={(e) => setPassword(e.target.value)}
                                       error={passwordErrorText !== ""}
                                       helperText={passwordErrorText}
                                       name={"password"}
                                       InputProps={{
                                           sx: {fontSize: "1em"},
                                           endAdornment: <InputAdornment position={"end"}>
                                               <IconButton
                                                   aria-label={"toggle password visibility"}
                                                   onClick={() => setShowPassword(!showPassword)}
                                                   onMouseDown={e => e.preventDefault()}
                                                   edge={"end"}
                                               >
                                                   {showPassword ? <VisibilityOffRounded/> : <VisibilityRounded/>}
                                               </IconButton>
                                           </InputAdornment>
                                       }}
                                       sx={{fontSize: "1em"}}
                                       type={showPassword ? "text" : "password"}
                                       placeholder={"Enter your password..."}
                                       id="edit-profile-password-input"
                                       variant="outlined"/>
                        </Stack>

                        <Button onClick={handleSubmit}
                                sx={{paddingInline: "1.5em", alignSelf: "start"}}
                                variant={"contained"}
                                type={"submit"}>
                            Save
                        </Button>

                    </FormControl>
                </Box>
                <Footer sx={{width: "100%"}}/>
            </Box>
        </Box>
    )
}

export async function getServerSideProps(context) {
    try {
        const cookies = CookieParser.parse(context.req.headers.cookie)
        const response = await axios.get(process.env.NEXT_PUBLIC_SERVER_URL + "/user", {
            headers: {
                "Authorization": cookies["jwt"]
            }
        })
        const user = response.data.data
        if (!user) {
            return {
                redirect: {
                    destination: "/login"
                }
            }
        }

        return {
            props: {
                user
            }
        }
    } catch (e) {
        return {
            redirect: {
                destination: "/login"
            }
        }
    }
}

EditProfile.getLayout = (page) => {
    return (<HomeLayout user={page.props.user}>
        {page}
    </HomeLayout>)
}

export default EditProfile