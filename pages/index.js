import {useRouter} from "next/router";
import {Box, Button, Typography} from "@mui/material";
import HomeLayout from "../components/HomeLayout";
import Footer from "../components/Footer";

const ProfileHeader = () => {
    return (
        <Box sx={{
            width: "100%",
            padding: "2em clamp(10px, 4vw, 3em)",
            display: "flex",
            backgroundColor: "background.default"
        }}>
            <Box>
                <Typography sx={{fontSize: "1.5em"}} variant={"h2"}>Profile</Typography>
                <Typography sx={{fontSize: "0.9em", color: "#828282"}} variant={"body2"}>Some info may be visible to
                    other people</Typography>
            </Box>
            <Button href={"/edit"} sx={{
                ml: "auto", padding: "0em 2em",
                lineHeight: "0",
                borderRadius: "12px"
            }} variant={"outlined"}>Edit</Button>
        </Box>
    )
}

const UserInfo = ({name, children, sx, ...props}) => (<Box sx={{
    display: "flex", padding: "2em clamp(10px, 4vw, 3em)", justifyContent: {
        xs: "space-between", sm: "start",
    }, backgroundColor: "background.default", ...sx
}} {...props}>
    <Typography
        sx={{
            flex: 1,
            height: "100%", display: "flex", alignItems: "center", textTransform: "uppercase", color: "#BDBDBD"
        }}
        variant={"body2"}>{name}</Typography>
    <Box sx={{
        flex: 3
    }}>{children}</Box>
</Box>)

export default function Home({user}) {

    return (<Box sx={{
        width: "100vw", minHeight: "calc(90vh - 64px)", display: "flex", justifyContent: "center",
        backgroundColor: "background.default",
        color: "text.primary"

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
            <Typography component={"h1"} variant={"h4"}>Personal info</Typography>
            <Typography variant={"body1"}>Basic info, like your name and photo</Typography>
            <Box component={"section"} sx={{
                mt: "32px",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                width: "100%",
                border: "1px solid #E0E0E0",
                borderRadius: "12px",
                background: "#E0E0E0",
                gap: "1px"
            }}>
                <ProfileHeader/>
                <UserInfo name={"photo"} sx={{
                    paddingBlock: "1em"
                }}>
                    <Box sx={{
                        height: "72px",
                        borderRadius: "8px",
                        overflow: "hidden",
                        width: "72px"
                    }}>
                        <img style={{width: "100%"}} src={user.photoUrl}
                             alt={"Profile Picture"}/>
                    </Box>
                </UserInfo>
                <UserInfo name={"name"}>{user.name}</UserInfo>
                <UserInfo name={"bio"}>{user.bio}</UserInfo>
                <UserInfo name={"phone"}>{user.phone}</UserInfo>
                <UserInfo name={"email"}>{user.email}</UserInfo>
                <UserInfo name={"password"}>{Array.from({length: user.passwordLength}, (_, i) => "*").join("")}</UserInfo>
            </Box>
            <Footer sx={{width: "100%"}}/>
        </Box>
    </Box>)
}

Home.getLayout = (page) => (<HomeLayout>
    {page}
</HomeLayout>)

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

