import TipoMuestra from "../models/tipoMuestra.js";

const helpersTipoMuestra={
    existeTipoMuestraById : async (id) => {
        const existe = await TipoMuestra.findById(id)

        if (!existe) {
            throw new Error(`El id no existe ${id}`)
        }
    } 

}
export {helpersTipoMuestra};