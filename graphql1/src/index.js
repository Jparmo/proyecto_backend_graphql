const express =  require('express')
const cors = require("cors")
const cookie = require("cookie-parser")
const { connection } = require('./config/db')

connection()


const app = express()

const graphql = require('./routes/graphql')
const users = require('./routes/users')
const alojamientos = require('./routes/alojamiento')
const apollo = require('./routes/apollo')
const auth = require('./routes/auth')



app.use(express.json())
app.use(cors({
    // permite el origen de cualquier lugar
    origin:['http://localhost:3000','https://studio.apollographql.com'],
    credentials:true
}))
app.use(cookie())


graphql(app)
users(app)
alojamientos(app)
apollo(app)
auth(app)



app.get('/', (req, res)=>{
    return res.send('hola mundo')
})

app.listen(4000,()=>{
    console.log("lisenting on port 4000")
})

