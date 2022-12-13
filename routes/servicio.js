import {Router} from 'express';
import {servicio} from "../controllers/servicio.js";
import {check} from "express-validator";
import { validarCampos } from "../middleware/validar-campos.js";
import { helpersServicio } from '../helpers/servicio.js';
import { helpersUsuario } from '../helpers/usuario.js';
const router = new Router()

router.get('/',servicio.servicioGet)

router.get('/:id',[
    check('id').isMongoId(),
    validarCampos
],servicio.cotizacionGetId)

router.post('/', [
    check('idCliente').custom( helpersUsuario.existeUsuarioById),
    check('idCliente').isMongoId(),
    //check('validezOferta', 'Validez oferta es requerido').isDate(),
    check('entregaResultados', 'Entrega de resultados es requerido').not().isEmpty(),
    check('idElaboradoPor', 'El campo elaborado por es requerido').not().isEmpty(),
    validarCampos
], servicio.cotizacionPost)

router.put(':/:id',[
    check('id').isMongoId(),
    validarCampos
],servicio.cotizacionPut)



export default router