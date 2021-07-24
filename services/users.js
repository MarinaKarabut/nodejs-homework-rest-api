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

const update = (id, token) => {
  return User.findByIdAndUpdate(id, token)
}

const updateAvatar = (id, idCloudAvatar, avatar) => {
  return User.findByIdAndUpdate(id, { idCloudAvatar, avatar })
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
