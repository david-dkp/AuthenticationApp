import {Avatar, Button, Divider, Menu, MenuItem, styled, Typography} from "@mui/material";
import {AccountCircleRounded, ArrowDropDownRounded, ExitToAppRounded, PeopleRounded} from "@mui/icons-material";
import React, {useState} from "react";
import {useRouter} from "next/router";

const StyledMenu = styled((props => (
    <Menu
        elevation={2}
        anchorOrigin={{
            vertical: "bottom",
            horizontal: "right"
        }}
        transformOrigin={{
            vertical: "top",
            horizontal: "right"
        }}
        {...props}/>
)))(({theme}) => ({
    "& .MuiPaper-root": {
        borderRadius: "12px",
        minWidth: "188px",
        marginTop: "20px",
        "& .MuiMenu-list": {
            padding: "12px",
        },
        "& .MuiMenuItem-root": {
            fontWeight: 500,
            padding: "11px 13px",
            gap: "10px",
            borderRadius: "8px",
            fontSize: "12px",
            fontFamily: "Nota Sans, sans-serif",
            "& .MuiSvgIcon-root": {
                height: "20px"
            }
        }
    },
}))

function ProfileMenu({menuProps, ...props}) {
    const router = useRouter()
    const currentPath = router.pathname

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (<>
        <Button sx={{
            mt: "12px",
            alignItems: "center",
            display: "flex",
            flexDirection: "row",
            gap: "10px",
            padding: {xs: "0px", md: "8px"},
            minWidth: "0px"
        }}
                id="profile-menu-button"
                aria-controls={open ? 'profile-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                disableElevation
                onClick={handleClick}
                {...props}
        >
            <Avatar sx={{
                height: "32px",
                width: "32px"
            }} variant={"rounded"} src={"https://i.pravatar.cc/150?img=28"} alt={"Profile picture"}/>
            <Typography sx={{display: {xs: "none", sm: "block"},fontWeight: "bold", fontSize: "12px"}} color={"text.primary"} component={"h3"}>Xanthe
                Neal</Typography>
            <ArrowDropDownRounded sx={{display: {xs: "none", sm: "block"}, color: "text.primary"}}/>
        </Button>
        <StyledMenu id="profile-menu" MenuListProps={{
            'aria-labelledby': 'profile-menu-button',
        }}
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    {...menuProps}
        >
            <MenuItem>
                <AccountCircleRounded/>
                My Profile
            </MenuItem>
            <MenuItem>
                <PeopleRounded/>
                Group Chat
            </MenuItem>
            <Divider/>
            <MenuItem sx={{color: "#EB5757"}}>
                <ExitToAppRounded/>
                Logout
            </MenuItem>
        </StyledMenu>
    </>)
}

export default ProfileMenu;