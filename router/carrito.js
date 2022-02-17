import express  from 'express'
import controller from '../controller/carrito.js'
import pago from '../controller/pago.js' 

const router = express.Router()

/* ------------------------ RUTAS POST -------------------------- */
router.post('/', controller.postCarrito)

router.get('/feedback', pago.feedBack)

export default router


