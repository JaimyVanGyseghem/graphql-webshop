const dotenv = require("dotenv");
dotenv.config();

module.exports = {
    port: process.env.PORT,
    port2: process.env.PORT2,
    link: process.env.LINK,
}