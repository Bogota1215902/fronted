import mongoose from 'mongoose';

const MuestraSchema = new mongoose.Schema({
    solicitante: {
        type: mongoose.Schema.ObjectId,
        ref: "Usuario",
        required: true
    },
    contacto: {
        type: mongoose.Schema.ObjectId,
        ref: "Usuario",

    },
    codMuestra: {    ///  0001-2022
        type: String,

    },
    munRecoleccion: {

        type: mongoose.Schema.ObjectId,
        ref: "Ciudades",

    },
    direccionTomaMuestra: {
        type: String,
        required: true,
    },
    lugarTomaMuestra: {
        type: String,
        required: true
    },
    muestraRecolectadaPor: {
        type: String,
        required: true,

    },
    procedimientoMuestreo: {
        type: String,
        required: true,

    },
    tipoMuestra: {
        type: mongoose.Schema.ObjectId,
        ref: "tipoMuestra",
        required: true
    },
    matrizMuestra: {
        type: String,
        default: "Panela"
    },
    fechaRecoleccion: {
        type: Date,
        default: Date.now
    },
    cotizacion: {
        type: mongoose.Schema.ObjectId,
        ref: "Cotizacion",
        required: true
    },

    item: {
        type: String,
        default: "Item1"
    },

    estado: {
        type: Number,
        default: 1
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
})


//matriz de muestra=panella
// formato UTC   AH TENER EN CUENTA LA HORA DEBE SER EN FORMATO UTC

export default mongoose.model('Muestra', MuestraSchema)