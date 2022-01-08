import * as Axios from "axios"

const axios = Axios.default

const getAuthUser = async () => {
    return await axios.get("/api/user")
}

const getUser = async (id) => {
    return await axios.get("/api/users/" + id)
}

const updateUser = async (formData) => {
    return await axios.put("/api/users", formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })
}

module.exports.getUser = getUser
module.exports.updateUser = updateUser
module.exports.getAuthUser = getAuthUser