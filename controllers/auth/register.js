const { Conflict } = require("http-errors");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const { nanoid } = require("nanoid")
const { sendMail } = require("../../utils");

const {User} = require("../../model");

const register = async(req, res)=> {

    const {email, password} = req.body;
    const user = await User.findOne({email});

    if(user){
        throw new Conflict("Email in use")
    }
    const verifyToken = nanoid();
    const avatarURL = gravatar.url(email);
    const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    const newUser = await User.create({ email, password: hashPassword, avatarURL, verifyToken});

    newUser.save();

    const mail = {
        to: email,
        subject: "Verification email sent",
        html: `<a href="http://localhost:3000/api/auth/verify/${verifyToken}">press to verify</a>`
    };

    await sendMail(mail);
    
    res.status(200).json({
        status: 'success',
        code: 200,
        message: 'Verification email sent'
      })
    
}

module.exports = register;