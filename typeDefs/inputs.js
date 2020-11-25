const { gql } = require("apollo-server");

module.exports = gql`
    input CategoryInputData {
        name: String!
    }

    input ProductInputData {
        title: String!
        description: String!
        images: [Upload!]!
        price: Float!
        categories: [String!]!
        date: String
    }
`;