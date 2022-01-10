import {
    Avatar,
    Button,
    Dialog, DialogActions,
    DialogContent,
    DialogContentText,
    Divider,
    Menu,
    MenuItem,
    styled,
    Typography
} from "@mui/material";
import {AccountCircleRounded, ArrowDropDownRounded, ExitToAppRounded, PeopleRounded} from "@mui/icons-material";
import React, {useState} from "react";
import {useRouter} from "next/router";
import authApi from "../apis/authApi";

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

function ProfileMenu({user, menuProps, ...props}) {
    const [showChatGroupDialog, setShowChatGroupDialog] = useState(false)
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

    const handleCloseDialog = () => {
        setShowChatGroupDialog(false)
    }

    const handleLogout = () => {
        authApi.logout().then(r => {
            if (r.data.type === "success") {
                return router.push("/login")
            }
        })
    }

    const navigateTo = (path) => {
        router.push(path)
    }

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
            <Dialog open={showChatGroupDialog} onClose={handleCloseDialog}>
                <DialogContent>
                    <DialogContentText>
                        {"The Chat Group app is being developed, it's not released yet"}.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Ok</Button>
                </DialogActions>
            </Dialog>
            <Avatar sx={{
                height: "32px",
                width: "32px"
            }} variant={"rounded"} src={user.photoUrl} alt={"Profile picture"}/>
            <Typography sx={{display: {xs: "none", sm: "block"}, fontWeight: "bold", fontSize: "12px"}}
                        color={"text.primary"}
                        component={"h3"}>{user.name}</Typography>
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
            <MenuItem selected={currentPath==="/"} onClick={() => {
                navigateTo("/")
                handleClose()
            }}>
                <AccountCircleRounded/>
                My Profile
            </MenuItem>
            <MenuItem onClick={() => setShowChatGroupDialog(true)}>
                <PeopleRounded/>
                Group Chat
            </MenuItem>
            <Divider/>
            <MenuItem onClick={handleLogout} sx={{color: "#EB5757"}}>
                <ExitToAppRounded/>
                Logout
            </MenuItem>
        </StyledMenu>
    </>)
}

export default ProfileMenu;