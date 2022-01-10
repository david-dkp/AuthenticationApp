import * as Axios from "axios"

const axios = Axios.default

const getAuthUser = async () => {
    return await axios.get("/api/user")
}

const getUser = async (id) => {
    return await axios.get("/api/users/" + id)
}

const updateAuthUser = async (formData) => {
    return await axios.put("/api/user", formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })
}

module.exports = {
    getAuthUser,
    getUser,
    updateAuthUser
}