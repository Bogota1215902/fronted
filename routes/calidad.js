import {Router} from 'express'
import calidad from '../controllers/calidad.js'
import { validarCampos } from "../middleware/validar-campos.js";
import {check} from "express-validator" 


const router = new Router()

router.post('/',[

check('formato', 'El campo es obligatorio').not().isEmpty(),
check('codigo', 'El campo es obligatorio').not().isEmpty(),
check('aprobacion', 'El campo es obligatorio').not().isEmpty(),
check('version', 'El campo es obligatorio').not().isEmpty(), 

validarCampos
],calidad.calidadPost )
router.get('/',calidad.calidadGet)
router.put('/',calidad.calidadPutActive)


export default router