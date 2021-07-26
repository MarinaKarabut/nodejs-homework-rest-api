const { User } = require('../models')

const getOne = (filter) => {
  return User.findOne(filter)
}

const add = ({ password, ...data }) => {
  const newUser = new User(data)
  newUser.setPassword(password)
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

module.exports = {
  getOne,
  add,
  findById,
  update,
  updateAvatar,
  getAvatar
}
