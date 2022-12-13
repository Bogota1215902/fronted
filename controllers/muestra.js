import Muestra from "../models/muestra.js"
import Setup from "../models/setup.js"
import Orden from "../models/orden_servicio.js"
import Servicio from "../models/servicio.js"
import Ensayo from "../models/ensayo.js"
import Usuario from "../models/usuario.js"
import helpersBitacora from "../helpers/bitacora.js"


const muestra = {
  muestraGet: async (req, res) => {
    const muestras = await Muestra.find()
    res.json({
      muestras
    })
  },
  muestraGetId: async (req, res) => {
    const { id } = req.params
    const muestras = await Muestra.findById(id)

    res.json({
      muestras
    })
  },
  muestraPost: async (req, res) => {
    const {
      solicitante,
      contacto,
      munRecoleccion,
      direccionTomaMuestra,
      lugarTomaMuestra,
      muestraRecolectadaPor,
      procedimientoMuestreo,
      tipoMuestra,
      matrizMuestra,
      fechaRecoleccion,
      cotizacion,
      item
    } = req.body
   

      const consecutivo = await Setup.findOne();
      let conse = "";
      if (consecutivo.consecutivoMuestra.toString().length == 1) {
        conse = `000${consecutivo.consecutivoMuestra}`;
      } else if (consecutivo.consecutivoMuestra.toString().length == 2) {
        conse = `00${consecutivo.consecutivoMuestra}`;
      } else if (consecutivo.consecutivoMuestra.toString().length == 3) {
        conse = `0${consecutivo.consecutivoMuestra}`;
      } else {
        conse = consecutivo.consecutivoMuestra;
      }
      const d = new Date();
      let year = d.getFullYear();
      let cotiNumero = "".concat(conse, "-", year, "-" + "V1");
      /* console.log(''.concat(conse,'-',year,'V1')); */
      console.log("conca: " + cotiNumero);
      /* consecutivo.consecutivoOferta++ */
      let consecutivomuestra = consecutivo.consecutivoMuestra + 1;
      const guardar = await Setup.findByIdAndUpdate(consecutivo._id, {
        consecutivoMuestra: consecutivomuestra,
      });
      if (!guardar) {
        return res
          .status(400)
          .json({
            msg: "No se pudo actualizar la informacion del consecutivo muestra",
          });
      };
      const muestras = new Muestra({
        solicitante,
        contacto,
        codMuestra: cotiNumero,
        munRecoleccion,
        direccionTomaMuestra,
        lugarTomaMuestra,
        muestraRecolectadaPor,
        procedimientoMuestreo,
        tipoMuestra,
        matrizMuestra,
        fechaRecoleccion,
        cotizacion,
        item,
      });

      if (!muestras) {
        return res
          .status(400)
          .json({ msg: "No se puedo registrar la oferta de servicio" });
      }
      muestras.save();
      const usuario = req.usuario;
      console.log(usuario)
      let idPersona = usuario._id;
      let mensaje = `la muestra fue registrada exitosamente, por ${usuario.nombre}`;
     
      
      


      const cotizacion1 = await Servicio.findById(cotizacion);
      let cotilla = "";
      if (item == "Item1") {
        cotilla = cotizacion1.items.item1.itemsEnsayo;
      } else if (item == "Item2") {
        cotilla = cotizacion1.items.item2.itemsEnsayo;
      } else {
        cotilla = cotizacion1.items.item3.itemsEnsayo;
      }
      const itemsOrden = [];

     
        for (let i = 0; i < cotilla.length; i++) {
          const elemento = cotilla[i];
          console.log(elemento.idensayo);
          const itemOrden = {};
          itemOrden.ensayo = elemento.idensayo;

          const person = await Ensayo.findById(elemento.idensayo)
            .populate({ path: "responsable.titular" })
            .populate({ path: "responsable.suplente" });

            console.log("persona: "+person);

          if (person.responsable.titular.estado == 0 || person.responsable.titular.estado == 2) 
          {
            console.log("suplente por inactividad: ");
            if (person.responsable.suplente.estado == 0 || person.responsable.suplente.estado == 2) {

              itemOrden.responsable = person.responsable.suplente._id;
            } else {
              itemOrden.responsable = person.responsable.suplente._id;
            }
          } else {
            itemOrden.responsable = person.responsable.titular._id;
          }

          const supervisor = await Usuario.findOne({ rol: "supervisor" });
          if (supervisor) {
            itemOrden.supervisor = supervisor._id;
          }
          itemsOrden.push(itemOrden);
        }
     

      try {

        const idMuestra = muestras._id;
        const orden = new Orden({ idMuestra, itemsorden: itemsOrden });
        /* console.log(itemsOrden); */
        orden.save(); 
        res.json({ orden });

      } catch (error) {
        return res.status(500).json({ msg: "No se pudo crear la orden de servicio" })
      }


     


      helpersBitacora.guardarBitacora(idPersona, mensaje)
    


  },


  muestraPutActive: async (req, res) => {
    const { id } = req.params;
    const muestra = await Muestra.findByIdAndUpdate(id, { estado: 1 });

    res.json({
      muestra
    })
  },
  muestraPutDeActiv: async (req, res) => {
    const { id } = req.params;
    const muestra = await Muestra.findByIdAndUpdate(id, { estado: 0 });

    res.json({
      muestra
    })
  }

} 

export { muestra }