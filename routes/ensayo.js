import { Router } from "express";
import {ensayo}  from "../controllers/ensayo.js";
import {check} from "express-validator"
import {validarCampos} from "../middleware/validar-campos.js";
import {helpersEnsayo} from "../helpers/ensayo.js";

const router = new Router()

router.get('/',ensayo.ensayoGet)
router.get('/:id',[
    check('id').isMongoId(),
    validarCampos
],ensayo.ensayoGetId)

router.post('/',[
    check('ensayo', 'El campo es obligatorio').not().isEmpty(),
    check('metodo', 'El campo es obligatorio').not().isEmpty(),
    check('tecnica', 'El campo es obligatorio').not().isEmpty(),

    validarCampos
],ensayo.ensayoPost)

router.put('/edit/item/:id',[
    check('id').isMongoId(),
    validarCampos
],ensayo.ensayoPut)

router.put('/activar/:id',[
    check('id').isMongoId(),
    validarCampos
],ensayo.ensayoPutActive)

router.put('/desactivar/:id',[
    check('id').isMongoId(),
   
    validarCampos
],ensayo.ensayoPutDeActiv)

export default router
