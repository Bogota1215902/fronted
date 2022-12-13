import Servicio from "../models/servicio.js";


const helpersServicio={
    existeServicioById : async (id) => {
        const existe = await Servicio.findById(id)

        if (!existe) {
            throw new Error(`El id no existe ${id}`)
        }
    } 

}
export {helpersServicio};