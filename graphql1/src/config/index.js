require("dotenv").config({
    path:process.cwd()+'/src/.env'
})

const config = {
    jwt_secret: process.env.JWT_SECRET
}

module.exports=config