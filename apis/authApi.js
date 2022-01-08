import * as Axios from "axios"

const axios = Axios.default

const login = async (email, password) => {
    return await axios.post("/api/login", {email, password})
}

const register = async (email, password) => {
    return await axios.post("/api/register", {email, password})
}

const authApi = {
    login,
    register
}

export default authApi