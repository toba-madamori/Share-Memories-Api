const router = require('express').Router()
const { register, login, getUser, updateUser, deleteUserAccount } = require('../controllers/user')
const upload = require('../utils/multer')
const authMiddleware = require('../middleware/auth')


router.post('/register', upload.single('avatar'), register)
router.post('/login', login)

// all the routes below will be authenticated as they concern the user's profile
router.get('/get-user', authMiddleware, getUser)
router.patch('/update-user', authMiddleware, upload.single('avatar'), updateUser)
router.delete('/delete-user', authMiddleware, deleteUserAccount)

module.exports = router;