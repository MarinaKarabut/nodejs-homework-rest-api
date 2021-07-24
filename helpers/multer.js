const path = require('path')
const multer = require('multer')

const tempDir = path.join(process.cwd(), 'temp')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tempDir)
  },
  filename: (req, file, cb) => {
    const now = new Date()
    const year = now.getFullYear()
    const month = now.getMonth() + 1
    cb(null, `${year}-${month}-${file.originalname}`)
  },
  limits: {
    fileSize: 2000000
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.includes('image')) {
      cb(null, true)
    }
    cb(null, false)
  }
})

const upload = multer({
  storage,
})

module.exports = upload
