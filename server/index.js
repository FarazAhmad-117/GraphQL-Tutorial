const express = require('express');
const { ApolloServer } = require('@apollo/server')
const { expressMiddleware } = require('@apollo/server/express4')
const bodyParser = require('body-parser');
const cors = require('cors');

async function startServer(){
    const app = express();
    const server = new ApolloServer({
        typeDefs:`
            type Todo {
                id: ID!
                title: String!
                completed: Boolean
            }

            type Query {
                getTodos: [Todo]
            }
        `,
        resolvers:{}
    });

    // Using middlewares;
    app.use(cors());
    app.use(bodyParser.json());

    await server.start();

    app.use('/graphql', expressMiddleware(server));

    app.listen(8000,()=>{
        console.log('Server is listening at http://localhost:8000/');
    })
}

startServer();




