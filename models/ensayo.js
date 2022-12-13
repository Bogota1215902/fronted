//tipo de esayos que se le realizan a las muestras
import mongoose from 'mongoose';

const EnsayoSchema= new mongoose.Schema({

    ensayo:{
        type: String,
        required: true,
        unique:true
    }, 
    metodo:{
        type: String,
        required: true,
    },
    tecnica:{
        type: String,
        required: true,
    },
    valorMinimo:{
        type: String ,
        default:"N.A."
    }    ,
    valorMaximo:{ 
        type: String,
        default: " N.A."
    },
    unidades:{
        type: String,
        required: true,
        default:"fracción en masa en %"
    },
    costo:{
        type: Number,
        required: true,
        default:0
    },
    estado:{
        type: String,
        default:'Activo',
    },
    descripcion:{
        type: String,
    },
    limiteCuantificacion:{
        type:Number,
        requiered:true,
    },
    responsable:{
        titular:{
            type: mongoose.Schema.ObjectId,
            ref:"Usuario",

        },
        suplente:{
            type: mongoose.Schema.ObjectId,
            ref: "Usuario",
        }
    }

})

export default mongoose.model("Ensayo",EnsayoSchema)
