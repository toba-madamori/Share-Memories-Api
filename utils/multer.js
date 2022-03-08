const multer = require('multer')
const path = require('path')

multer({
    storage:multer.diskStorage({}),
    fileFilter:(req,file,cb)=>{
        let ext = path.extname(file.originalname)
        if(ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png"){
            return cb(new Error('File type is not supported'), false)
        }
        cb(null, true)
    },
})

module.exports = multer