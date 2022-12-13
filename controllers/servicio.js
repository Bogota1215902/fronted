import Cotizacion from '../models/servicio.js'
import Setup from '../models/setup.js'

const servicio = {
  servicioGet: async (req, res) => {
    const cotizacion = await Cotizacion.find()
    res.json({
      cotizacion
    })
  },

  cotizacionGetId: async (req, res) => {
    const { id } = req.params
    try {
      const servicio = await Cotizacion.findById(id)

      res.json({
        servicio
      })

    } catch (error) {
      return res.status(500).json({ msg: "Hable con el WebMaster" });
    }

  },

  cotizacionPost: async (req, res) => {
    const {
      fechaEmision,
      idCliente,
      validezOferta,
      entregaResultados,
      idElaboradoPor,
      items,
      observaciones,
      descuento
    } = req.body
    try {
      const sum = items.item1.itemsEnsayo.reduce((acc, it) => {
        return (acc += it.costoEnsayo);
      }, 0)

      items.costoitem = 0
      if (items.item1) {
        console.log(items);
        items.item1.costo = sum;
        items.costoitem += items.item1.costo;
        console.log('ite1 costo' + items.item1.costo)
        console.log('costoItemi' + items.costoitem)
      }
      if (items.item2) {
        const sum = items.item2.itemsEnsayo.reduce((acc, it) => {
          return (acc += it.costoEnsayo);

        }, 0)
        items.item2.costo = sum;
        items.costoitem += items.item2.costo;
      };
      if (items.item3) {
        const sum = items.item3.itemsEnsayo.reduce((acc, it) => {
          return (acc += it.costoEnsayo);

        }, 0);
        items.item3.costo = sum;
        items.costoitem += items.item3.costo;
      };
      console.log('costoItemi' + items.costoitem)
      let subT = items.costoitem - descuento

      console.log('subtotal: ' + subT)
      const consecutivo = await Setup.findOne();
      console.log('consecutivoIva' + consecutivo.iva)
      let to = Math.round(subT + subT * (consecutivo.iva / 100))
      console.log('total: ' + to);
      let conse = "";
      if (consecutivo.consecutivoOferta.toString().length == 1) {
        conse = `000${consecutivo.consecutivoOferta}`;
      } else if (consecutivo.consecutivoOferta.toString().length == 2) {
        conse = `00${consecutivo.consecutivoOferta}`;
      } else if (consecutivo.consecutivoOferta.toString().length == 3) {
        conse = `0${consecutivo.consecutivoOferta}`;
      } else {
        conse = consecutivo.consecutivoOferta;
      }
      const d = new Date();
      let year = d.getFullYear();
      let cotiNumero = "".concat(conse, "-", year, "V1");
      /* console.log(''.concat(conse,'-',year,'V1')); */
      console.log("conca: " + cotiNumero);
      /* consecutivo.consecutivoOferta++ */
      let consecutivooferta = consecutivo.consecutivoOferta + 1;
      const guardar = await Setup.findByIdAndUpdate(consecutivo._id, {
        consecutivoOferta: consecutivooferta,
      });
      if (!guardar) {
        return res
          .status(400)
          .json({
            msg: "No se pudo actualizar la informacion del consecutivo oferta",
          });
      }

      const cotizacion = new Cotizacion({
        numCotizacion: cotiNumero,
        fechaEmision,
        idCliente,
        validezOferta,
        entregaResultados,
        idElaboradoPor,
        items,
        observaciones,
        subTotal: items.costoitem,
        descuento,
        total: to,
      });
      if (!cotizacion) {
        return res
          .status(400)
          .json({ msg: " No se puedo registrar la oferta de servicio" });
      }
      cotizacion.save();
      res.json({ cotizacion }); 
    } catch (error) {
      return res
        .status(500)
        .json({ msg: " Hable con el WebMaster" });
    }


  },

  cotizacionPut: async (req, res) => {
    const { id } = req.params;
    try {
      const cotiVieja = await Cotizacion.findById(id);
      const usuario = await Cotizacion.findByIdAndUpdate(id, { estado: 0 })

      let consecutivo = await Cotizacion.findOne()
      let version = consecutivo.numCotizacion
      console.log(version.split('V')[1]);
      let primeraParte = version.split('V')[0]
      let versionNew = Number(version.split('V')[1]) + 1
      console.log("version nueva" + versionNew);
      console.log("version" + version);
      let concaNueva = `${primeraParte}-V${versionNew}`
      console.log(concaNueva);

      const {
        fechaEmision,
        idCliente,
        idContacto,
        validezOferta,
        entregaResultados,
        idElaboradoPor,
        items,
        observaciones,
        subTotal,
        descuento,
        iva,
        total,
      } = req.body;

      const cotizacion = new Cotizacion({
        numCotizacion: concaNueva,
        fechaEmision,
        idCliente,
        idContacto,
        validezOferta,
        entregaResultados,
        idElaboradoPor,
        items,
        observaciones,
        subTotal,
        descuento,
        iva,
        total,
      });

      cotizacion.save()

    } catch (error) {
      return res.status(500).json({ msg: "Hable con el WebMaster" });
    }
  },
}

export { servicio } 
