const fs = require("fs");
const { Category, Product } = require("../models");
const { pubsub, PRODUCT_ADDED } = require("./pubsub");

module.exports = {

    Mutation: {
      
      createCategory: async (parent, { categoryInput }, context, info) => {
          const { name } = categoryInput;
          console.log("name", name);
          const category = new Category({
              name,
              products: []
          });
        const newCategory = await category.save();

        return {
            ...newCategory._doc,
            _id: newCategory.id
        }
      },

        createProduct: async (parent, { productInput }, context, info)  => {
    
            const { title, description, images, price, categories, date } = productInput;
            let promise, attachments = [];
            const dir = "assets";

            if (images.length) {

                promise = new Promise((resolve, reject) => {
    
                    images.forEach(async (image, index) => {
                        const { filename, mimetype, createReadStream } = await image;
                        const stream = await createReadStream();
                        if (!fs.existsSync(dir)) {
                            fs.mkdirSync(dir);
                        }
                        stream.pipe(fs.createWriteStream(`./${dir}/${filename}`));
                        attachments.push(filename);
                        if (index + 1 === images.length) {
                            resolve(attachments);
                        } 
                    });
                });
            } else {
                promise = Promise.resolve(images); 
            }
        
            console.log("does this work");
    
            return Promise.resolve(promise).then(async attachments => {
                
                const product = new Product({
                    title,
                    description,
                    images: attachments,
                    price,
                    categories,
                    date
                });
                const newProduct = await product.save();
    
                pubsub.publish(PRODUCT_ADDED, { productAdded: newProduct });
    
                return {
                    ...newProduct._doc,
                    _id: newProduct.id,
                    images: attachments,
                    date: newProduct.date.toString()
                }
            });    
        },

        deleteProduct: async (parent, { productId }, context, info) => {

            const product = await Product.findById(productId);
    
            if (!product) {
                const error = new Error('Product not found!');
                throw error;
            }
            
            await Product.remove({ _id: product.id });
    
            return {
                ...product._doc,
                _id: product.id,
                date: product.date.toString()
            }
        }
    }
}