const { pubsub, PRODUCT_ADDED } = require("./pubsub");

module.exports = {
    Subscription: {
        productAdded: {
            subscribe: () => pubsub.asyncIterator([PRODUCT_ADDED])
        },
    }
}

