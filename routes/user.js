const router = require('express').Router()
const { register, login } = require('../controllers/user')

router.post('/register', register)
router.post('/login', login)

module.exports = router