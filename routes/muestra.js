import {Router} from "express"
import { muestra} from "../controllers/muestra.js"
import { check } from "express-validator"
import { validarCampos } from "../middleware/validar-campos.js"
import { helpersMuestra } from "../helpers/muestra.js";
import { validarJWT } from "../middleware/validar-jwt.js";


const router =new Router()

router.get('/',[
    validarCampos
],muestra.muestraGet)

router.get('/:id',[
    check('id').isMongoId(),
    validarCampos
],muestra.muestraGetId)

router.post('/',[
    validarJWT,
    check('solicitante', 'Se requiere un solicitante').not().isEmpty(),
    check('contacto', 'el contacto es requerido').not().isEmpty(),
    check('codMuestra', 'este campo es requerido').not().isEmpty(),
    check('munRecoleccion', 'Favor ingrese el municipio de recoleccion').isMongoId(),
    
    
    check('rol', 'este campo es requerido').not().isEmpty(),
], muestra.muestraPost)

router.put('/activar/:id',[
    check('id').isMongoId(),
    validarCampos
],muestra.muestraPutActive)

router.put('/desactivar/:id',[
    check('id').isMongoId(),
    validarCampos
],muestra.muestraPutDeActiv)

export default router