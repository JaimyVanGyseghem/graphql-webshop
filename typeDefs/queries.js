const { gql } = require("apollo-server");

module.exports = gql`
    type Query {
        getAllProducts: [Product]
        getAProducts(productId:String): Product
        getAllCategories: [Category]
        filterProductsByCategory(categoryId: String!): [Product]
    }
`;