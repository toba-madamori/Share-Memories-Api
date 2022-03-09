const router = require('express').Router()
const { register, login, getUser } = require('../controllers/user')
const upload = require('../utils/multer')


router.post('/register', upload.single('avatar'), register)
router.post('/login', login)
router.get('/get-user', getUser) // cannot get a particular user/profile if you are not authenticated

module.exports = router;