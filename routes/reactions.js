const router = require('express').Router()
const { LikeAMemory, DislikeAMemory } = require('../controllers/reactions')

//routes
router.post('/like', LikeAMemory)
router.post('/dislike', DislikeAMemory)

module.exports = router;