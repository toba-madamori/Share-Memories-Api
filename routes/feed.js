const router = require('express').Router()
const {
    initialLikesFeed,
    finalLikesFeed,
}= require('../controllers/feed')

router.get('/initial-feed', initialLikesFeed)
router.get('/final-feed', finalLikesFeed)

module.exports = router;