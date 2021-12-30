import {useRouter} from "next/router";
import {useEffect} from "react";
import {Box} from "@mui/material";
import NavBar from "../components/NavBar";

export default function Home() {
  const router = useRouter()
  return (
    <Box width={"100%"} sx={{
      display: "flex",
      flexDirection: "column"
    }}>
      <NavBar />
    </Box>
  )
}

