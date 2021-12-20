import {Stack, Typography} from "@mui/material";


function Footer({sx}) {

    return(
        <Stack direction={"row"} sx={sx} color={"#828282"} justifyContent={"space-between"}>
            <Typography fontSize={"1em"} variant={"body2"}>created by <Typography component={"span"} fontWeight={600} fontSize={"1em"} sx={{textDecoration: "underline"}}>David</Typography></Typography>
            <Typography fontSize={"1em"} variant={"body2"}>devChallenges.io</Typography>
        </Stack>
    )
}

export default Footer