import * as Axios from "axios"

const axios = Axios.default

const login = async (email, password) => {
    return await axios.post("/api/login", {email, password})
}

const register = async (email, password) => {
    return await axios.post("/api/register", {email, password})
}

const logout = async () => {
    return await axios.post("/api/logout")
}

const authApi = {
    login,
    register,
    logout
}

export default authApi