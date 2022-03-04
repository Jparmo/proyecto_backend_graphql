const { Router } = require("express");
const Users = require("../services/users")

function users(app){
    const router = Router()
    // Utilizando el servicio
    const userServ = new Users()

    app.use("/api/users",router)

    router.get("/", async (req, res)=>{
        const users = await userServ.getAll()
        return res.json(users)
    })

    router.get("/:email", async (req, res)=>{
        const {email} = req.params
        const user = await userServ.get(email)
        return res.json(user)
    })

    router.get("/:id",(req,res)=>{
        return res.send("GET user")
    })

    router.post("/creater", async (req, res)=>{
        //    el body de una peticion contiene nuestra info, sera transformada por el middelware
            const user = await userServ.create(req.body)
            return res.json(user)
        })

    router.put("/:id", async (req, res)=>{
        //    el body de una peticion contiene nuestra info, sera transformada por el middelware
            const user = await userServ.update({id:req.params.id,user:req.body})
            return res.json(user)
        })
}

module.exports =  users