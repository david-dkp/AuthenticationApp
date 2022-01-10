import Navbar from "./Navbar";
import {Stack} from "@mui/material";

function HomeLayout({children}) {
    return (
        <Stack sx={{height: "100vh", backgroundColor: "background.default", width: "100vw"}} flexDirection={"column"}>
            <Navbar/>
            <main>{children}</main>
        </Stack>
    )
}

export default HomeLayout