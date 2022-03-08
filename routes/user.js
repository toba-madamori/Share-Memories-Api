const router = require('express').Router()
const { register, login } = require('../controllers/user')
const upload = require('../utils/multer')


router.post('/register', upload.single('avatar'), register)
router.post('/login', login)

module.exports = router;