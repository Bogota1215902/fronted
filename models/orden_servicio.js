import mongoose from "mongoose";

const Ordenshema = new mongoose.Schema({
    idMuestra: {
        type: mongoose.Schema.ObjectId,
        ref: "Muestra",
        requerid: true
    },
    itemsorden: [{
        ensayo: {
            type: mongoose.Schema.ObjectId,
            ref: "Ensayo",
            required: true
        },
        responsable: {
            type: mongoose.Schema.ObjectId,
            ref: "Usuario",
            required: true
        },
        supervisor: {
            type: mongoose.Schema.ObjectId,
            ref: "Usuario",
            required: true
        },
    }],
   
    
    observaciones: {
        type: String,
        default: ""
    },
    estado: {
        type: Number,
        default: 1
    },
    createdAt: {
        type: Date,
        default: Date.now
    }

})
export default mongoose.model('Orden', Ordenshema)



   //descuento:{sobre el subtotal
    //     type:String,
    //     requered:true,

    // export default mongoose.model('TipoMuestra', TipoMuestraSchema)