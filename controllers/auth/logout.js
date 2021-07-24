const { users: service } = require('../../services')

const logout = async (req, res, next) => {
  const { id } = req.user
  try {
    await service.update(id, { token: null })
    res.json({
      status: 'success',
      code: 200,
      message: 'Logout success',
    })
  } catch (error) {
    next(error)
  }
}

module.exports = logout
