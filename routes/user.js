const router = require('express').Router()
const { 
    register,
    login, 
    getUser, 
    updateUser, 
    deleteUserAccount,
    userGeneralSearch, 
    userSpecificSearch,
    usersLikedMemories,
    usersDislikedMemories,
    resetPassword,
    forgotPassword,
    validatingNewUser,
 } = require('../controllers/user')
const upload = require('../utils/multer')
const authMiddleware = require('../middleware/auth')


router.post('/register', upload.single('avatar'), register)
router.post('/confirm-registration/:id/:token', validatingNewUser)
router.post('/login', login)

// password reset routes
router.post('/forgot-password', forgotPassword)
router.post('/reset-password/:id/:token', resetPassword)

// all the routes below will be authenticated as they concern the user's profile
router.get('/get-user', authMiddleware, getUser)
router.patch('/update-user', authMiddleware, upload.single('avatar'), updateUser)
router.delete('/delete-user', authMiddleware, deleteUserAccount)

// user search routes
// note:the routes are authenticated, this can be easily modified if needed
router.get('/user-general-search', authMiddleware, userGeneralSearch)
router.get('/user-specific-search', authMiddleware, userSpecificSearch)

// other user related routes
router.get('/users-liked-memories', authMiddleware, usersLikedMemories)
router.get('/users-disliked-memories', authMiddleware, usersDislikedMemories)

module.exports = router;