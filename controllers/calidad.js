import Calidad from "../models/calidad.js";

const calidad = {

    calidadPost: async (req, res)=>{
        const {formato,codigo,aprobacion,version}=req.body
        const calidad=new calidad({formato,codigo,aprobacion,version})
        Calidad.save()
        res.json({calidad})
        console.log(calidad)
        
    },

    calidadGet: async (req, res)=>{
        const calidad = await Calidad.find()
        res.json({
            calidad
        })
    },

    calidadPutActive:async (req, res) => {   
        const { id } = req.params;
        const calidad = await calidad.findByIdAndUpdate(id, {estado:1});
    
        res.json({
            calidad
        })
    },
}

export default calidad