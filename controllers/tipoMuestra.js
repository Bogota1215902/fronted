import TipoMuestra from "../models/tipoMuestra.js";

const tipoMuestra = {
    tipoMuestraGet: async (req, res)=>{
        const tipoMuestra = await TipoMuestra.find()
        res.json({
            tipoMuestra
        })
    },
    tipoMuestraGetId:async (req, res)=>{
        const {id}=req.params
        const tipomuestra = await TipoMuestra.findById(id) 
    
        res.json({
           tipomuestra
        })
    },
  
    tipoMuestraPost: async (req, res)=>{
        const { tipos}=req.body
        const tipoMuestra=new TipoMuestra({tipos})
        tipoMuestra.save()
        res.json({tipoMuestra})
        console.log(tipoMuestra)
        
    },

    tipoMuestraPut: async (req, res)=>{
        const {id}=req.params;
        const { tipos}=req.body;
        const tipomuestra=await TipoMuestra.findByIdAndUpdate(id,{tipos});
    
        res.json({
            tipomuestra
        })
    },

    tipoMuestraPutActive:async (req, res) => {   
        const { id } = req.params;
        const tipomuestra = await TipoMuestra.findByIdAndUpdate(id, {estado: "Activo"});
    
        res.json({
            tipomuestra
        })
    },

    tipoMuestraPutDeActiv:async (req, res) => {   
        const { id } = req.params;
        const tipomuestra = await TipoMuestra.findByIdAndUpdate(id, {estado: "Inactivo"});
    
        res.json({
            tipomuestra
        })
    }


}



export{tipoMuestra}