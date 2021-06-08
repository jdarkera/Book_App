module.exports = function(app){
    
    var books = require('../controllers/book.controller.js');

    app.post('/api/book', books.createBook); // post an inventory to MongoDB database
    app.get('/api/book/:id', books.getBook); //retrieve an inventory from MongoDB database with a given id
    app.get('/api/books', books.books); //retrieve all inventories from MongoDB database
    app.put('/api/book', books.updateBook);//to update an inventory from MongoDB database
    app.delete('/api/book/:id',books.deleteBook); //to remove an inventory based on an id from MongoDB database

}