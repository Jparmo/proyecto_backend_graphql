const Alojamientos = require("../services/alojamiento");
const{Router} = require("express")

function alojamientos(app){
    const router = Router()
    const alojamientoServ = new Alojamientos()

    app.use("/api/alojamientos", router)

    router.get("/", async (req, res)=>{
        const alojamientos = await alojamientoServ.getAll()
        return res.json(alojamientos)
    })

    router.get("/:id", async (req,res)=>{
        const {id} = req.params
        const alojamiento = await alojamientoServ.get({id})
        return res.json(alojamiento)
    })

    router.post("/", async (req, res) => {
            const alojamiento = await alojamientoServ.create(req.body)
            return res.json(alojamiento)
        })
    
    router.delete("/:id", async(req, res)=> {
        const {id} = req.params
        const alojamiento = await alojamientoServ.delete({id})
        return res.json(alojamiento)
    })
}

module.exports = alojamientos