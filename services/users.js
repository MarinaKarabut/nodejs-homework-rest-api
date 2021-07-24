const { User } = require('../models')

const getOne = () => {
  return User.findOne()
}

const add = ({ password, ...data }) => {
  const newUser = new User(data)
  newUser.setPassword(password)
  return newUser.save()
}

const findById = (id) => {
  return User.findById(id)
}

const update = (id, data) => {
  return User.findByIdAndUpdate(id, data)
}

const updateAvatar = (id, avatar, idCloudAvatar) => {
  return User.findByIdAndUpdate(id, { avatarURL: avatar, idCloudAvatar })
}

const getAvatar = (id) => {
  const { idCloudAvatar, avatar } = User.findOne(id)
  return { idCloudAvatar, avatar }
}

module.exports = {
  getOne,
  add,
  findById,
  update,
  updateAvatar,
  getAvatar
}
