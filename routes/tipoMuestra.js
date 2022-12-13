import { Router } from "express";
import { tipoMuestra } from "../controllers/tipoMuestra.js";
import {check} from "express-validator"
import { validarCampos } from "../middleware/validar-campos.js";
import { helpersTipoMuestra } from "../helpers/tipoMuestra.js";
import { validarJWT } from '../middleware/validar-jwt.js'

const router = new Router()

router.get('/',[validarJWT],tipoMuestra.tipoMuestraGet)
router.get('/:id',[
    check('id').isMongoId(),
    validarCampos
],tipoMuestra.tipoMuestraGetId)

router.post('/',[
  
    check( 'tipos', 'El campo es obligatorio').not().isEmpty(),
    validarCampos
],tipoMuestra.tipoMuestraPost)

router.put('/:id',[
    validarJWT,
    check('id').isMongoId(),
    validarCampos
],tipoMuestra.tipoMuestraPut)

router.put('/activar/tipo/:id',[
    check('id').isMongoId(),
    validarCampos
],tipoMuestra.tipoMuestraPutActive)

router.put('/desactivar/:id',[
    check('id').isMongoId(),
    validarCampos
],tipoMuestra.tipoMuestraPutDeActiv)

export default router
