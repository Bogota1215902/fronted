import Informe from '../models/informe_resultado.js'

const informe = {
    informeGetId: async (req, res)=>{
        const {id}=req.params
        const inform = await Informe.findById(id)
    
        res.json({
            inform
        })
    },

    informePost: async (req, res)=>{
        const {idMuestra,informeResulNumero,fechaEmisionInforme,analisisMuestra,observaciones}=req.body
        const inform = new Informe({idMuestra,informeResulNumero,fechaEmisionInforme,analisisMuestra,observaciones})
        informe.save()
        res.json({inform})
    },

    informePut: async (req, res) => {
        const { id } = req.params;
        const { _id,idMuestra,informeResulNumero,fechaEmisionInforme,analisisMuestra,observaciones} = req.body;
        const inform = await Informe.findByIdAndUpdate(id, idMuestra,informeResulNumero,fechaEmisionInforme,analisisMuestra,observaciones);
    
        res.json({
            inform
        })
    }

}


export {informe}