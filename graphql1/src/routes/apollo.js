const {schema,resolvers,context} = require('../libs/apollo')
const { ApolloServer } = require("apollo-server-express") 


function apollo(app){
    // crear una instancia
    const server = new ApolloServer({
        typeDefs:schema,
        resolvers,
        context
    })
    server.start()
    // promesas
    .then((res)=>{
        server.applyMiddleware({
            app,
            path:"/apollo",
            cors:{
                credentials:true,
                origin:["http://localhost:3000","https://studio.apollographql.com"]
            }
        })
        console.log(server.graphqlPath) 
    })

    
} 

module.exports = apollo