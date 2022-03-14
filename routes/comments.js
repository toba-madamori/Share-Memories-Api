const router = require('express').Router()
const {
    createComment,
    updateComment,
    deleteComment,
} = require('../controllers/comments')

// comment routes

router.route('/:id').post(createComment).patch(updateComment).delete(deleteComment)

module.exports = router;