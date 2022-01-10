import Axios from "axios"
import Cookies from "js-cookie"

const configure = () => {
    Axios.interceptors.request.use((config) => {

        if (Cookies.get("jwt")) {
            config.headers.Authorization = Cookies.get("jwt")
        }

        return config
    })
}

module.exports = {
    configure
}