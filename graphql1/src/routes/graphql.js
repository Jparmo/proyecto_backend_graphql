const { graphqlHTTP } = require("express-graphql")
const { root, schemas } = require("../libs/graphql")


function graphql(app){
    
    //midleware
    app.use('/graphql', graphqlHTTP({
        graphiql:true,
        rootValue:root,
        schema:schemas
    }))
    
}


module.exports = graphql