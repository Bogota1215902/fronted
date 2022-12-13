import Ensayo from "../models/ensayo.js";

const ensayo = {

    ensayoGet: async (req, res)=>{
        const ensayo = await Ensayo.find()
        res.json({
            ensayo
        })
    },
    ensayoGetId: async (req, res)=>{
        const {id}=req.params
        const ensayo = await Ensayo.findById(id) 
    
        res.json({
           ensayo
        })
    },
    ensayoPut:async (req, res)=>{
        const {id}=req.params;
        const { _id,ensayo,metodo,tecnica, ...resto}=req.body;
        const ensa=await Ensayo.findByIdAndUpdate(id,resto);
    
        res.json({
            ensa
        })
    },
    ensayoPost: async (req, res)=>{
        const {ensayo,metodo,tecnica,valorMinimo,valorMaximo,unidades,costo,estado,descripcion,limiteCuantificacion,responsable}=req.body
        const ensa=new Ensayo({ensayo,metodo,tecnica,valorMinimo,valorMaximo,unidades,costo,estado,descripcion,limiteCuantificacion,responsable})
        ensa.save()
        res.json({ensa})
        
    },
    ensayoPutActive:async (req, res) => {   
        const { id } = req.params;
        const ensa = await Ensayo.findByIdAndUpdate(id, {estado:'Activo'});
    
        res.json({
            ensa
        })
    },
    ensayoPutDeActiv:async (req, res) => {   
        const { id } = req.params;
        const ensa = await Ensayo.findByIdAndUpdate(id, {estado:'Inactivo'});
    
        res.json({
            ensa
        })
    }
}





export{ensayo}