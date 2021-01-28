const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

let books = [];

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

// insert book detail
app.post('/books', (req,res) => {
    console.log(req.body); 
    var index = books.push(req.body);
    console.log(books);
    var new_index =  index - 1;
    res.send("data added with id " + new_index);
})
// retrive book details
app.get('/books/:id',(req,res) => {
    console.log(req.params.id);
    var book_id = req.params.id;
    console.log(books[book_id]);
    // var new_book_id = book_id - 1;
    // console.log("book id " + book_id);
    // console.log("book at position book id " + books[0]);
    /*if(books[book_id] != undefined){
        var book_details = books[book_id];
        res.send(book_details);
    }else{
        res.send("For this id book detail is not available");
    }*/

    res.send("get");
    
});

// delete book
app.delete('/books/:id',(req,res) => {
    var book_id = req.params.id;

    var fresh_books = books.filter( (book, index)  => {
        return index != book_id;   
    }
    );
    console.log(fresh_books);

    res.send("deleted");
    
});

app.get('/books',(req,res) => {
    
})

app.listen(port, () => console.log(`hey Arth the server is listening on the port ${port}`));