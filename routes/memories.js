const router = require('express').Router()
const upload = require('../utils/multer')
const { 
    getAllMemories,
    getAMemory,
    createMemory,
    updateAMemory,
    deleteAMemory, 
    memorySearch,
} = require('../controllers/memories')


router.get('/get-all-memories', getAllMemories)
router.get('/get-a-memory/:id', getAMemory)
router.post('/create-a-memory', upload.single('memory'), createMemory)
router.patch('/update-a-memory/:id', upload.single('memory'), updateAMemory)
router.delete('/delete-a-memory/:id', deleteAMemory)

//memory search route
router.get('/search', memorySearch)


module.exports = router;