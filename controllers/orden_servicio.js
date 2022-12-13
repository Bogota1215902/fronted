import Orden from "../models/orden_servicio.js"

const orden = {

    ordenGet : async (req, res)=>{
        const orden = await Orden.find()
        .populate({path:"idMuestra"})
        .populate({path:"itemsorden.ensayo"})
        
        res.json({
            orden
        })
    },
    
    ordenGetId : async (req, res)=>{
        const {id}=req.params
        const orden = await Orden.findById(id)
    
        res.json({
           orden
        })
    }, 
    
    ordenPost : async (req, res)=>{
        const {idMuestra, ensayo, responsable,supervisor, observaciones,estado}=req.body
        const orden = new Orden({idMuestra, ensayo, responsable,supervisor, observaciones,estado})
        orden.save()
        res.json({orden})
    },
    
    ordenPutActive:async (req, res) => {   
        const { id } = req.params;
        const orden = await Orden.findByIdAndUpdate(id, {estado:1});
    
        res.json({
            orden
        })
    },
    ordenPutDeActiv:async (req, res) => {   
        const { id } = req.params;
        const orden = await Orden.findByIdAndUpdate(id, {estado:0});
    
        res.json({
            orden
        })
    }
    
}



export default orden