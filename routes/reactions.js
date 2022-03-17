const router = require('express').Router()
const { LikeAMemory, DislikeAMemory } = require('../controllers/reactions')

//routes
router.post('/like/:id', LikeAMemory)
router.post('/dislike/:id', DislikeAMemory)

module.exports = router;