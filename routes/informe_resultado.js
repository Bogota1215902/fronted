import {Router} from 'express'
import {informe} from '../controllers/informe_resultado.js'
import { validarCampos } from '../middleware/validar-campos.js'
import {check} from 'express-validator'

const router = new Router()

router.get('/',informe.informeGetId)

router.post('/', informe.informePost)

router.put('/:id', [
    check('id').isMongoId(),
   validarCampos
], informe.informePut)




export default router