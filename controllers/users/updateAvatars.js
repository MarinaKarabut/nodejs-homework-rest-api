const { users: service } = require('../../services')
const uploadCloud = require('../../helpers/uploadAvatar')
const fs = require('fs/promises')
const cloudinary = require('cloudinary').v2

const updateAvatars = async (req, res, next) => {
  const { _id } = req.user
  const pathFile = req.file.path

  try {
    const oldAvatar = await service.getAvatar(_id)
    const { public_id: idCloudAvatar, secure_url: avatarURL } = await uploadCloud(pathFile)
    const url = await service.updateAvatar(_id, idCloudAvatar, avatarURL)

    if (!url || !req.user.token) {
      res.status(401).json({
        status: 'error',
        code: 401,
        message: 'Not authorized',
      })
      return
    }

    cloudinary.uploader.destroy(oldAvatar.idCloudAvatar, function (err, result) {
      console.log(err, result)
    })

    await fs.unlink(pathFile)

    res.status(200).json({
      status: 'success',
      code: 200,
      data: {
        avatarURL: url
      }
    })
  } catch (error) {
    next(error)
  }
}

module.exports = updateAvatars
