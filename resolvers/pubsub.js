const { PubSub } = require("graphql-subscriptions");

module.exports = {
    pubsub: new PubSub(),
    PRODUCT_ADDED: "PRODUCT_ADDED"
};