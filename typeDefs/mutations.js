const { gql } = require("apollo-server");

module.exports = gql`
    type Mutation {
        createProduct(productInput: ProductInputData): Product
        deleteProduct(productId: String): Product
        createCategory(categoryInput: CategoryInputData): Category
    }
`;