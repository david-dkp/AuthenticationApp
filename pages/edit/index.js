import HomeLayout from "../../components/HomeLayout";
import {Box, Button, FormControl, IconButton, InputAdornment, Stack, TextField, Typography} from "@mui/material";
import {
    ArrowBackIosRounded,
    PhotoCameraRounded,
    VisibilityOff,
    VisibilityOffRounded,
    VisibilityRounded
} from "@mui/icons-material";
import {useEffect, useState} from "react";

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

    const handlePhotoImageChange = (e) => {
        onFileSelected(e.target.files[0])
    }

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
                <img style={{objectFit: "cover", width: "100%", height: "100%"}} src={photoUrl}
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
    const [photoUrl, setPhotoUrl] = useState(user.photoUrl)
    const [photoFileSelected, setPhotoFileSelected] = useState()
    const [showPassword, setShowPassword] = useState(false)

    const onFileSelected = (file) => {
        setPhotoFileSelected(file)
    }

    useEffect(() => {
        if (!photoFileSelected) {
            return
        }

        const objectUrl = URL.createObjectURL(photoFileSelected)
        setPhotoUrl(objectUrl)

        return () => URL.revokeObjectURL(objectUrl)
    }, [photoFileSelected])

    return (
        <Box sx={{
            maxWidth: "100vw", minHeight: "calc(90vh - 64px)", display: "flex", justifyContent: "center",
            backgroundColor: "background.default",
            color: "text.primary",
        }}>

            <Box sx={{
                display: "flex",
                width: "100%",
                margin: "15px",
                maxWidth: "845px",
                flexDirection: "column",
                alignItems: "center",
                overflow: "visible",
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
                            <ChangePhoto photoUrl={photoUrl} onFileSelected={onFileSelected}/>
                            <Typography sx={{
                                ml: "2rem",
                                color: "#828282",
                                textTransform: "uppercase",
                                fontSize: "0.8em"
                            }} variant={"h2"}>change photo</Typography>
                        </Stack>

                        <Stack gap={"5px"}>
                            <label htmlFor="edit-profile-name-input">Name</label>
                            <TextField name={"name"} InputProps={{sx: { fontSize: "1em"}}} sx={{fontSize: "1em"}} placeholder={"Enter your name..."} id="edit-profile-name-input" variant="outlined"/>
                        </Stack>

                        <Stack gap={"5px"}>
                            <label htmlFor="edit-profile-bio-input">Bio</label>
                            <TextField name={"bio"} InputProps={{sx: { fontSize: "1em"}}} sx={{fontSize: "1em"}} placeholder={"Enter your bio..."} minRows={3} type={"text"} multiline id="edit-profile-bio-input" variant="outlined"/>
                        </Stack>

                        <Stack gap={"5px"}>
                            <label htmlFor="edit-profile-phone-input">Phone</label>
                            <TextField name={"phone"} InputProps={{sx: { fontSize: "1em"}}} sx={{fontSize: "1em"}} type={"tel"} placeholder={"Enter your phone..."} id="edit-profile-phone-input" variant="outlined"/>
                        </Stack>

                        <Stack gap={"5px"}>
                            <label htmlFor="edit-profile-email-input">Email</label>
                            <TextField name={"email"} InputProps={{sx: { fontSize: "1em"}}} sx={{fontSize: "1em"}} type={"email"}  placeholder={"Enter your email..."} id="edit-profile-email-input" variant="outlined"/>
                        </Stack>

                        <Stack gap={"5px"}>
                            <label htmlFor="edit-profile-password-input">Password</label>
                            <TextField name={"password"} InputProps={{
                                sx: {fontSize: "1em"},
                                endAdornment: <InputAdornment position={"end"}>
                                    <IconButton
                                        aria-label={"toggle password visibility"}
                                        onClick={() => setShowPassword(!showPassword)}
                                        onMouseDown={e => e.preventDefault()}
                                        edge={"end"}
                                        >
                                        {showPassword ? <VisibilityOffRounded/> : <VisibilityRounded />}
                                    </IconButton>
                                </InputAdornment>
                            }} sx={{fontSize: "1em"}} type={showPassword ? "text" : "password"} placeholder={"Enter your password..."} id="edit-profile-password-input" variant="outlined"/>
                        </Stack>

                        <Button sx={{paddingInline: "1.5em", alignSelf: "start"}} variant={"contained"} type={"submit"}>
                            Save
                        </Button>

                    </FormControl>
                </Box>
            </Box>
        </Box>
    )
}

export function getStaticProps(context) {
    return {
        props: {
            user: {
                name: "Barry Allen",
                bio: "This is the user's biographie",
                photoUrl: "https://i.pravatar.cc/150?img=36",
                phone: "0879456987",
                email: "some.email@email.email",
                passwordLength: 5,
            }
        }
    }
}

EditProfile.getLayout = (page) => (
    <HomeLayout>
        {page}
    </HomeLayout>
)

export default EditProfile