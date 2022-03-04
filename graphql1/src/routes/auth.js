const {Router} = require("express")
const Auth = require("../services/auth")
// const passport = require("passport")


function auth(app){
    const router =  Router() // nos va devolver una instancia de un router
    // Utilizando el servicio
    const authServ = new Auth()

    app.use("/api/auth",router)

    router.post("/login",async (req,res)=>{
        const details = await authServ.login(req.body)
        // las rutas gestionan la respuesta al usuario y podemos implementar las cookies
        // entonces queremos hacer que cuando de la respuesta lo haga con una cookie con nuestro token
        if(details.logged){
            const now = new Date().getDate()//esta te fija la fecha actual
            const expires = new Date(new Date().setDate(now+7)) //esta esta fijando una nueva fecha 
            return res.cookie("token",details.token,{
            // nosotros desde el servidor vamos a poder definir estas propiedades para el cliente, solo el http del origen que definio esa cookie puede modificarla
                httpOnly:true,
            // cuando colocamos secure estamos indicando que estamos trabajando sobre https
                sameSite:"none",
                secure:true,
                // expires // para que la expire en cierto tiempo
            }).json(details)
        }
        
        return res.status(401).json(details)
    })

    router.post("/logout", (req, res)=>{
        const details ={
            loggedOut:true
        }
        return res.cookie("token","",{
            // nosotros desde el servidor vamos a poder definir estas propiedades para el cliente, solo el http del origen que definio esa cookie puede modificarla
                httpOnly:true,
            // cuando colocamos secure estamos indicando que estamos trabajando sobre https
                sameSite:"none",
                secure:true,
                expires: new Date() //la expria la cookie ahora mismo
            }).json(details)
        })

    router.post("/validate",async (req,res)=>{
        console.log(req)
        if(req.cookies.token){
            // leer de las cookies
            const details = await authServ.verify(req.cookies.token)
            // verificamos las cookies
            if(details.role==="ADMIN"){
                return res.json({allowed:true})
            }
        }

        return res.status(403).json({allowed:false})
        // configurar cookie parser es un midleware
        // return res.json(details)
    })

    // crear una ruta para passport se necesitan dos rutas

    // router.get("/google",passport.authenticate("google",{
    //     scope:['email','profile']
    // }))

    // router.get("/google/callback",(req,res)=>{
    //     return passport.authenticate("google",async (data)=>{
    //         // llamar al servicio de auth para que guarde a los usuarios y gestione las respuestas
    //         const details = await authServ.google(data.profile)
    //         return res.cookie("token",details.token,{
    //             // nosotros desde el servidor vamos a poder definir estas propiedades para el cliente, solo el http del origen que definio esa cookie puede modificarla
    //                 httpOnly:true,
    //             // cuando colocamos secure estamos indicando que estamos trabajando sobre https
    //                 sameSite:"none",
    //                 secure:true
    //             }).redirect("http://localhost:3000") //sin blank // .json(details) anterior
    //             //  }).send("<script>window.close()</script>") //con blank 
    //             // return res.json(user) //este return devuelve el authenticate devuelve una res
    //     })(req,res) // asegurandonos que res y req esten en el scope
    // })


}

module.exports = auth