import {Router} from 'express'
import orden from '../controllers/orden_servicio.js'
import { validarCampos } from '../middleware/validar-campos.js'
import {check} from "express-validator"
import { helpersOrden } from "../helpers/orden_servicio.js";

const router = new Router()

router.get('/',orden.ordenGet)

router.get('/:id',[
    check('id').isMongoId(),
    validarCampos
],orden.ordenGetId)

router.post('/',orden.ordenPost)

router.put('/activar/:id',[
    check('id').isMongoId(),
    validarCampos
],orden.ordenPutActive)

router.put('/desactivar/:id',[
    check('id').isMongoId(),
    check('id').custom(helpersOrden.existeOrdenById),
    validarCampos
],orden.ordenPutDeActiv)


export default router