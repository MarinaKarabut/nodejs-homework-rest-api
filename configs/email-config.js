require('dotenv').config()
const { EMAIL_PASSWORD } = process.env

const config = {
  host: 'mail.meta.ua',
  port: 465,
  secure: true,
  auth: {
    user: 'marina2108@meta.ua',
    pass: EMAIL_PASSWORD
  }
}

module.exports = config
