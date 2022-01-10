import Navbar from "./NavBar";
import {Stack} from "@mui/material";

function HomeLayout({user, children}) {
    return (
        <Stack sx={{height: "100vh", backgroundColor: "background.default", width: "100vw"}} flexDirection={"column"}>
            <Navbar user={user}/>
            <main>{children}</main>
        </Stack>
    )
}

export default HomeLayout