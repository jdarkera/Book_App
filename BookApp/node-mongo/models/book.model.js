// defines the schema (data type or default values) for each data

const mongoose  = require('mongoose');

const BookSchema = new mongoose.Schema({
    title: String,
    author: String
});

module.exports = mongoose.model("Book", BookSchema );