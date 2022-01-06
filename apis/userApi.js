const axios = require("axios").default

const getUser = async(id) => {
    return await axios.get("/api/users/"+id)
}

module.exports = {
    getUser
}