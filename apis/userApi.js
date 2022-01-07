const axios = require("axios").default

const getUser = async(id) => {
    return await axios.get("/api/users/"+id)
}

const updateUser = async({...fields}) => {
    return await axios.put("/api/users", {...fields})
}

module.exports.getUser = getUser
module.exports.updateUser = updateUser