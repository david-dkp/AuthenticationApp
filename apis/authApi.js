const axios = require("axios").default

const login = async (email, password) => {
    return await axios.post("/api/login", {email, password})
}

const register = async (email, password) => {
    return await axios.post("/api/register", {email, password})
}

module.exports.login = login
module.exports.register = register