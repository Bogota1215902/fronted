import Setup from "../models/setup.js"

const set = {

    setGet: async (req, res) => {
        try {
            const setcod = await Setup.find()
            res.json({
                setcod
            })
        } catch (error) {
            res.status(500).json({ msg: "Hable con el web master" })
        }

    },
    setGetId: async (req, res) => {
        try {
            const { id } = req.params
            const setcod = await Setup.findById(id)

            res.json({
                setcod
            })
        } catch (error) {
            res.status(500).json({ msg: "Habla con el web master" })
        }
    },

    setPost: async (req, res) => {
        try {
            const { consecutivoMuestra, consecutivoOferta, iva, consecutivoInforme } = req.body
            const setcod = new Setup({ consecutivoMuestra, consecutivoOferta, iva, consecutivoInforme })
            setcod.save()
            res.json({
                setcod
            })
        } catch (error) {
            res.status(500).json({msg: "Habla con el web master" })
        }

    },

    setPut: async (req, res) => {
        try {
            const { id } = req.params;
            const { _id, createAdt, ...resto } = req.body;
            const setcod = await Setup.findByIdAndUpdate(id, resto);

            res.json({
                setcod
            })
        } catch (error) {
            res.status(500).json({ msg: "Habla con el web master" })

        }
    },

}

export default set