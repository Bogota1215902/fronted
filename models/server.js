import express from "express"
import cors from "cors"
import {dbConnection} from "../dataBase/config.js"
import infoDepartamento from "../routes/ciudad.js"
import infoCiudad from "../routes/ciudad.js"
import ensayo from "../routes/ensayo.js"
import informe from "../routes/informe_resultado.js"
import usuario from "../routes/usuario.js"
import muestra from "../routes/muestra.js"
import orden_servicio from "../routes/orden_servicio.js"
import servicio from "../routes/servicio.js" 
import setup from "../routes/setup.js"
import tipomuestra from "../routes/tipoMuestra.js"
import calidad from "../routes/calidad.js"
import bitacora from "../routes/bitacora.js"
 
class Server {
    constructor(){
        this.app = express()
        this.middlewares()
        this.port=process.env.PORT
        this.conectarBd()
        this.routes()
    }
routes () {
        this.app.use('/api/usuario', usuario)
        this.app.use('/api/muestra', muestra)
        this.app.use('/api/departamento',infoDepartamento)
        this.app.use('/api/ciudad', infoCiudad)
        this.app.use('/api/ensayo', ensayo)
        this.app.use('/api/informe_resultado', informe)
        this.app.use('/api/orden_servicio', orden_servicio)
        this.app.use('/api/servicio', servicio)
        this.app.use('/api/setup', setup)
        this.app.use('/api/tipomuestra', tipomuestra)
        this.app.use('/api/calidad', calidad)
        this.app.use('/api/bitacora',bitacora)
    }

    async conectarBd(){
        await dbConnection() 
    }

    
    middlewares(){
        this.app.use(express.json())
        this.app.use(cors())
    }
       
    
    escuchar() {
        this.app.listen(this.port, () => {
            console.log(`Servidor escuchando en el puerto ${this.port}`);
        })
    }
}
export {Server}