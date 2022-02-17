import express  from 'express'
const router = express.Router()

//https://www.npmjs.com/package/multer
import multer from 'multer'

const storage = multer.diskStorage({
    destination: function(req,file,cb) {
        cb(null, 'public/uploads')
    },
    filename: function(req,file,cb) {
        cb(null,`${Date.now()}-${file.originalname}`)
    }
})

const upload = multer({ storage: storage })

/* ------------------------ RUTAS POST -------------------------- */
router.post('/', upload.single('foto'), (req,res,next) => {
    const file = req.file

    console.log(file)

    if(!file) {
        const error = new Error('Error subiendo el archivo')
        error.httpStatuscode = 400
        return next(error)
    }

    res.json({ nombre: file.filename })
})

export default router
