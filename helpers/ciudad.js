
import Ciudad from "../models/ciudad.js"

const helpersCiudad ={
    existeCiudad: async (infoCiudad) => {
        const existe = await Ciudad.findOne({ infoCiudad });
    
        if (existe) {
          throw new Error(`La ciudad ya está registrada`);
        }
      },

}
export {helpersCiudad}
