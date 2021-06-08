const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false); 
const Book = mongoose.model('Book');


// Custom functions for DELETE, GET, CREATE

exports.createBook = (req,res) =>{ //create a new book (post request processing)
    const book = new Book({
        title: req.body.title,
        author: req.body.author,
    });
    //Save a Inventory in the MongoDB
    book.save().then(data => {
        res.status(200).json(data);
    }).catch(err => {
        res.status(500).json({
            message: "Fail!",
            error: err.message
        }); 
    });
}; 

exports.getBook = (req, res) => {//retrieve an book with a given id from MongoDB database(get request)
    Book.findById(req.params.id).select('-__v') //__v means version from the database 
        .then(book => {
            res.status(200).json(book);
        }).catch(err => {
            if(err.kind === "ObjectId"){
                return res.status(404).send({
                    message: "Book not found with id " + req.params.id,
                    error: err
                });
            }
            return res.status(500).send({
                message: "Error retrieving book with id " + req.params.id,
                error: err
            })
        })
}
exports.books = (req, res ) => { //retrieves all Book objects from MongoDB database.
    Book.find().select('-__v').then(bookInfos => {
        res.status(200).json(bookInfos);
    }).catch(error => {
        console.log(error);

        res.status(500).json({
            message: "Error!",
            error: error
        });
    });
};

exports.deleteBook = (req, res ) => {
    Book.findByIdAndRemove(req.params.id).select('-__v-_id')
        .then(book => {
            if(!book){
                res.status(404).json({
                    message: "No book found with id = " + req.params.id,
                    error: "404",
                });
            }
        res.status(200).json({});
    
    }).catch(err => {
        return res.status(500).send({
            message: "Error => Can't delete book with id= "+ req.params.id,
            error: err.message
        });
    });
};

exports.updateBook = (req, res) => {
    Book.findIdAndUpdate(
        req.body._id,
        {
            title: req.body.title,
            author: req.body.author,
        },
        {new: false}
    ).select('-__v')
        .then(book => {
            if(!book){
                return res.status(404).send({
                    message: "Error -> Can't update a book with id = " + req.params.id,
                    error: "Not found"
                });
            }
            res.status(200).json(book);
        }).catch(err => {
            return res.status(500).send({
                message: "Error -> Can't update a book with id " + req.params.id,
                error: err.message
            });
        });
    };

