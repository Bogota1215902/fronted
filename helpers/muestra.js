import Muestra from "../models/muestra.js"



const helpersMuestra ={
    existeMuestra: async (muestra) => {
        const existe = await Muestra.findOne({ muestra });
    
        if (existe) {
          throw new Error(`La muestra ya está registrada`);
        }
      }

}
export {helpersMuestra}