import HomeLayout from "../../components/HomeLayout";
import {Box, Button, Stack} from "@mui/material";
import {ArrowBackIosRounded} from "@mui/icons-material";

function EditProfile() {
    return (
        <Box sx={{
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
                    borderRadius: "12px",
                    background: "#E0E0E0",
                    gap: "1px"
                }}>

                </Box>
            </Box>
        </Box>
    )
}

EditProfile.getLayout = (page) => (
    <HomeLayout>
        {page}
    </HomeLayout>
)

export default EditProfile