const axios = require("axios");
const cookies = require("js-cookie")

const configure = () => {
    axios.interceptors.request.use(function (config) {
        if (cookies.get("token")) {
            config.headers["Authorization"] = cookies.get("token")
        }
        return config;
    }, function (error) {
        // Do something with request error
        return Promise.reject(error);
    });
}

module.exports.configure = configure