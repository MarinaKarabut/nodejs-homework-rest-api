const { User } = require('../models')
const { nanoid } = require('nanoid')
const sendEmail = require('../helpers/sendEmail')

const getOne = (filter) => {
  return User.findOne(filter)
}

const add = ({ password, ...data }) => {
  const verifyToken = nanoid()
  const { email } = data
  const newUser = new User({ ...data, verifyToken })
  newUser.setPassword(password)
  sendEmail(email, verifyToken)
  return newUser.save()
}

const findById = (id) => {
  return User.findById(id)
}

const update = (id, token) => {
  return User.findByIdAndUpdate(id, token)
}

const updateAvatar = (id, idCloudAvatar, avatarURL) => {
  return User.findByIdAndUpdate(id, { idCloudAvatar, avatarURL })
}

const getAvatar = (id) => {
  const result = User.findById(id)
  return result
}

const verify = async ({ verificationToken }) => {
  const user = await User.findOne({ verifyToken: verificationToken })
  if (user) {
    await user.updateOne({ verify: true, verifyToken: null })
    return true
  }
  return false
}

module.exports = {
  getOne,
  add,
  findById,
  update,
  updateAvatar,
  getAvatar,
  verify
}
