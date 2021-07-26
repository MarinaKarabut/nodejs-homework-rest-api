const { users: service } = require('../../services')

const verify = async (req, res, next) => {
  const { verificationToken } = req.params
  try {
    const result = await service.verify({ verificationToken })
    if (!result) {
      return res.status(404).json({
        status: 'error',
        code: 404,
        message: 'User not found'
      })
    }
    res.json({
      status: 'success',
      code: 200,
      message: 'Verification successful'
    })
  } catch (error) {
    next(error)
  }
}

module.exports = verify
