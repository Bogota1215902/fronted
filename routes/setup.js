import {Router} from 'express'
import set from '../controllers/setup.js'
import {check} from "express-validator"
import { validarCampos } from "../middleware/validar-campos.js";
import { validarJWT } from '../middleware/validar-jwt.js';

const router = new Router()
router.get('/',set.setGet)
router.get('/:id',[
    check('id').isMongoId(),
    validarCampos
],set.setGetId)

router.post('/',[
   
    check('iva', 'El campo iva es obligatorio').not().isEmpty(),
    validarCampos
],set.setPost)

router.put('/:id',[
    validarJWT,
    check('id').isMongoId(),
    validarCampos
],set.setPut)


export default router