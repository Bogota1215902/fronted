import calidad from "../models/calidad.js";

const helpersCalidad={
    existecalidadById : async (id) => {
        const existe = await calidad.findById(id)

        if (!existe) {
            throw new Error(`El id no existe ${id}`)
        }
    } 

}
export {helpersCalidad};