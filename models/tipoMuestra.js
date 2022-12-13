import mongoose from 'mongoose';

const tipoMuestraSchema= new mongoose.Schema({

    tipos:{
        type: String,
        required: true,
    },
    estado:{
        type: String,
        default: "Activo"
    }
})

export default mongoose.model("tipoMuestra",tipoMuestraSchema)

//En bloque
//Pulverizada