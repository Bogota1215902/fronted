import Usuario from '../models/usuario.js';
import { generarJWT } from '../middleware/validar-jwt.js';
import bcryptjs from 'bcryptjs'

const usuario ={
    usuarioGet:async (req, res) => {
        const usuario = await Usuario.find()
        res.json({
            usuario
        })
    },
    usuarioGetId:async (req, res) => {
        const { id } = req.params
        const usuario = await Usuario.findById(id)
    
        res.json({
            usuario
        })
    },
    usuarioGetIdent:async (req, res) => {

        const { documento } = req.params
        const usuario= await Usuario.find({documento})
    .populate("documento",["nombre"])
    console.log(documento)
        res.json({
            usuario
        })
        console.log(usuario)
    },
    usuarioPut: async (req, res) => {
        const { id } = req.params;
        const { _id, createAdt, estado, ...resto } = req.body;
        const usuario = await Usuario.findByIdAndUpdate(id, resto);
    
        res.json({
            usuario
        })
    },
    usuarioPost:async (req, res) => {
        const {tipoPersona,nombre,tipoDocumento,documento, direccion, departamento, ciudad, contacto, telefono, email,password, rol, estado } = req.body
        const usuario = new Usuario({ tipoPersona,nombre,tipoDocumento, documento, direccion, departamento, ciudad, contacto, telefono, email, password, rol, estado })
        const salt = bcryptjs.genSaltSync(10)
        usuario.password = bcryptjs.hashSync(password, salt)
        usuario.save()
        
        res.json({ usuario })
        console.log(departamento)
        console.log(ciudad)
    
    },
    usuarioPutActiv:async (req, res) => {
        const { id } = req.params;
        const usuario = await Usuario.findByIdAndUpdate(id, { estado: 1 });
    
        res.json({
            usuario
        })
    },
    usuarioPutDesactivar:async (req, res) => {
        const { id } = req.params;
        const usuario = await Usuario.findByIdAndUpdate(id, { estado: 0 });
    
        res.json({
            usuario
        })
    },
    usuarioPutVacaciones:async (req, res) => {
        const { id } = req.params;
        const usuario = await Usuario.findByIdAndUpdate(id, { estado: 2 });
    
        res.json({
            usuario
        })
    },
    usuarioGetlogin: async (req, res) => {
        const { email, password } = req.body;
        console.log(email, password);
        try {
            const usuario = await Usuario.findOne({ email })
            if (!usuario) {
                return res.status(400).json({
                    msg: "Usuario / Password no son correctos"
                })
            }
    
    
            if (usuario.estado === 0) {
                return res.status(400).json({
                    msg: "Usuario Inactivo"
                })
            }
    
            const validPassword = bcryptjs.compareSync(password, usuario.password);
            if (!validPassword) {
                return res.status(400).json({
                    msg: "Usuario / Password no son correctos"
                })
            }
    
            const token = await generarJWT(usuario.id);
    
            res.json({
                usuario,
                token
            })
    
        } catch (error) {
            return res.status(500).json({
                msg: "Hable con el WebMaster"
            })
        }
    },

    usuarioDelete:async (req, res)=>{
        const {id}= req.params;
       const persona= await Usuario.findByIdAndDelete(id);
       res.json({
           persona
       })
    }

}



export { usuario }