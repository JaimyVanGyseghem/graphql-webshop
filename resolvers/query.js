const { Category, Product } = require('../models');

module.exports = {
    Query: {
        getAllProducts: async (parent, args, context) => {
            const products = await Product.find({});
            return products.map(product => ({
                ...product._doc, 
                _id: product.id,  
                date: product.date.toString(), 
                images: product.images.map(image => `http://localhost:4001/${image}`) 
            }));
            
        },
        getAProducts: async (parent, { productId }, context, info) => {
          const product = await Product.findById(productId);
          // console.log("product", product._doc);
          return {
            ...product._doc,
            _id: product.id, 
          }
        },
        getAllCategories: async (parent, args, context, info) => {

          const categories = await Category.find({}).populate("products");

          if (!categories) {
            const error = new Error("Categories not found!");
            throw error;
          }

          return categories.map(category => ({
            ...category._doc,
            _id: category.id,
            products: category.products.map(product => ({
              ...product._doc,
              _id: product.id,
              date: product.date.toString(),
              images: product.images.map(image => `http://localhost:4001/${image}`)
            }))
          }));

        },

        filterProductsByCategory: async (parent, { categoryId }, context, info) => {

          const category = await Category.findById(categoryId).populate("products");

          if (!category) {
            const error = new Error("Category doesn't exist!");
            throw error;
          }
          
          const products = category.products;

          return products.map(product => ({
            ...product._doc,
            _id: product.id,
            date: product.date.toString(),
            images: product.images.map(image => `http://localhost:4001/${image}`)
          }));

        },
    }
}