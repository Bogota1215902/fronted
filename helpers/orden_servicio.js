import Orden from "../models/orden_servicio.js"

const helpersOrden ={
    existeMuestra: async (orden) => {
        const existe = await Orden.findOne({ orden });
    
        if (existe) {
          throw new Error(`La ciudad ya está registrado`);
        }
      },

}
export {helpersOrden}