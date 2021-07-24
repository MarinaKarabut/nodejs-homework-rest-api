const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
const path = require('path')
require('dotenv').config()
require('./configs/passport-config')

const upload = require('./helpers/multer')
const addAvatarFunc = require('./helpers/addAvatarFunc')
const contactsRouter = require('./routes/api/contacts')
const authRouter = require('./routes/api/auth')
const usersRouter = require('./routes/api/users')
const filesRouter = require('./routes/api/files')

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())

app.use(express.static(path.join(__dirname, './public/avatars')))

app.use('/api/v1/contacts', contactsRouter)
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/users', usersRouter)
app.use('/api/v1/files', filesRouter, upload.single('avatar'), addAvatarFunc)

app.use((req, res, next) => {
  res.status(404).json({
    status: 'error',
    code: 404,
    message: 'Not found'
  })
})

app.use((error, _, res, __) => {
  const { code = 500, message = 'Server error' } = error
  res.status(code).json({
    status: 'fail',
    code,
    message,
  })
})

const { DB_HOST, PORT = 3000 } = process.env

mongoose
  .connect(DB_HOST, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    app.listen(PORT)
    console.log(`Server running. Use our API on port: ${PORT}`)
  })
  .catch((error) => console.log(`Server not running. Error message: ${error.message}`))
