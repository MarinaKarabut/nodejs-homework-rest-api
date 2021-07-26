const nodemailer = require('nodemailer')
const config = require('../configs/email-config')

const transporter = nodemailer.createTransport(config)

const sendEmail = async (email, verifyToken) => {
  const emailOptions = {
    from: 'marina2108@meta.ua',
    to: email,
    subject: 'Please verify your account',
    html: `Welcome to our site! To verify your account please go to <a href="http://localhost:3000/api/v1/users/verify/${verifyToken}></a>`,
  }
  try {
    const result = await transporter.sendMail(emailOptions)
    return result
  } catch (error) {
    console.log('error', error)
  }
}

module.exports = sendEmail
