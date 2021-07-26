const multer = require('multer')
const path = require('path')

const tempDir = path.join(process.cwd(), 'temp')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tempDir)
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  },
  fileFilter(req, file, cb) {
    if (file.mimetype.includes('image')) {
      cb(null, true)
    }
    cb(null, false)
  },
  limits: { fileSize: 2000000 }
})

const upload = multer({
  storage,
})

module.exports = upload
