const multer = require('multer')
const path = require('path')


// set storage engine
const storage = multer.diskStorage({
    filename: (req, file, cb)=>{
        return cb(
            null,
            `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
        )
    }
})

const upload = multer({
    storage:storage,
    fileFilter:(req,file,cb)=>{
        let ext = path.extname(file.originalname)
        if(ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png"){
            return cb(new Error('File type is not supported'), false)
        }
        cb(null, true)
    },
})

module.exports = upload;