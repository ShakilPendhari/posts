const mongoose = require("mongoose");

const connection = mongoose.connect("mongodb://127.0.0.1:27017/postDataBase")

module.exports = {
    connection
}