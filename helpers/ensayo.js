import ensayo from "../models/ensayo.js";

const helpersEnsayo={
    existeEnsayoById : async (id) => {
        const existe = await Ensayo.findById(id)

        if (!existe) {
            throw new Error(`El id no existe ${id}`)
        }
    } 

}
export {helpersEnsayo};