const { gql } = require("apollo-server");

module.exports = gql`
  type Category {
        _id: ID!
        name: String!
        products: [Product!]
    }
    
    type Product {
        _id: ID!
        title: String!
        description: String!
        images: [String!]!
        price: Float!
        categories: [String!]!
        date: String!
    }
`;