const register = require("./register");
const login = require("./login");
const logout = require("./logout")
const getCurrent = require("../auth/getCurrent");
const updateAvatar = require("./updateAvatar")
const verify = require("./verify")
const resendEmail = require("./resendMail")

module.exports = {
    register,
    login,
    logout, 
    getCurrent, 
    updateAvatar, 
    verify,
    resendEmail
}