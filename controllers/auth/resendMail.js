const { sendMail } = require('../../utils')
const { User } = require('../../model')

const resendEmail = async (req, res, _) => {
  const { email } = req.body
  const user = await User.findOne({ email })

  if (!user) {
    return res.status(404).json({
      status: 'error',
      code: 404,
      message: 'User not found'
    })
  }

  if (!user.verify) {
    const mail = {
        to: email,
        subject: "Verification email sent",
        html: `<a href="http://localhost:3000/api/auth/verify/${user.verifyToken}">press to verify</a>`
    };

    await sendMail(mail);
    
   return res.status(200).json({
        status: 'success',
        code: 200,
        message: 'Verification email sent'
      })
  }

  res.status(400).json({
    status: 'Bad Request',
    code: 400,
    message: 'Verification has already been passed'
  })
}

module.exports = resendEmail