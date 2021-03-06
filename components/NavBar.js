import React from "react"
import {AppBar, Container, Toolbar, useTheme} from "@mui/material";
import DevChallengesDarkImg from "../assets/devchallenges.svg";
import DevChallengesLightImg from "../assets/devchallenges-light.svg";
import ProfileMenu from "./ProfileMenu";

function Navbar({user}) {
    const theme = useTheme()
    const devChallengesImage = theme.palette.mode === "light" ? DevChallengesDarkImg : DevChallengesLightImg
    return <AppBar elevation={0} sx={{
        backgroundColor: "background.default",
        boxShadow: "none"
    }} position={"relative"}>
        <Container maxWidth={"lg"}>
            <Toolbar sx={{justifyContent: "space-between"}} disableGutters>
                <img src={devChallengesImage.src} alt={"DevChallenges"}/>
                <ProfileMenu user={user}/>
            </Toolbar>
        </Container>
    </AppBar>
}

export default Navbar