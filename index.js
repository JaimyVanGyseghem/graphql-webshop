const { ApolloServer } = require("apollo-server");
const typeDefs = require("./typeDefs");
const resolvers = require("./resolvers");

const bodyParser = require('body-parser');
const express = require('express');
const path = require("path");
const app = express();

const mongoose = require("mongoose");
const { port, port2 } = require("./config");

mongoose.connect("mongodb+srv://webpgm4:webpgm4@cluster0.pesk7.mongodb.net/cluster0?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log("mongodb is connected successfully!");
});

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
        return { req };
    },
    introspection: true,
    playground: true
});

server.listen({ port }).then(({ url }) => {
    console.log(`GraphQL API server is running at url: ${url}`);
});


app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "assets")));

app.listen(port2, error => {
  if(error) return console.log(error);
  console.log(`Server started on http://localhost:${port2}`);
});