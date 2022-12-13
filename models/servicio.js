import mongoose from "mongoose";

const ServicioShema = new mongoose.Schema({

  numCotizacion: {
    type: String,     ///ej: 0001-2022V1 

  },

  fechaEmision: {
    type: Date,
    default: Date.now
  },
  idCliente: {
    type: mongoose.Schema.ObjectId,
    ref: "Usuario",
    requered: true,
  },
  idContacto: {
    type: mongoose.Schema.ObjectId,
    ref: "Usuario",

  },
  validezOferta: {
    type: Date,
    requered: true,
  },

  entregaResultados: {
    type: Date,
    requered: true,
  },

  idElaboradoPor: {
    type: mongoose.Schema.ObjectId,
    ref: "Usuario",

  },
  items: {
    item1: {
      itemsEnsayo: [{

        idensayo: {
          type: mongoose.Schema.ObjectId,
          ref: "Ensayo",

        },
        costoEnsayo: {
          type: Number, 

        },
      }],
      costo: {
        type: Number,
        default: 0
      }
    },
    item2: {
      itemsEnsayo: [{
        ensayo: {
          type: mongoose.Schema.ObjectId,
          ref: "Ensayo",

        },
        costoEnsayo: {
          type: Number,

        },
      }],
      costo: {
        type: Number,
        default: 0
      }
    },
    item3: {
      itemsEnsayo: [{
        ensayo: {
          type: mongoose.Schema.ObjectId,
          ref: "Ensayo",

        },
        costoEnsayo: {
          type: Number,

        },
      }],
      costo: {
        type: Number,
        default: 0
      }
    },
    costoitem: {
      type: Number,
      default: 0,
      required:true
    }
  },
  observaciones: {
    type: String,
    default: ""
  },
  subTotal: {
    type: Number,
    required: true
  },
  descuento: {///descuento sobre el subtotal
    type: Number,
    default: ""
  },
  iva: {
    type: Number,
    
  },
  total: {
    type: Number,
    required:true
  },
  estado: {
    type: Number,
    default: 1   //0 anulada   1:vigente
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("Servicio", ServicioShema);

