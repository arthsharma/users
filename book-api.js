const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

let books = [];

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

app.post('/books', (req,res) => {
    const book = req.body.book_name;

    console.log(book);
    books.push(book);

    res.send("your book has been added to the database");
});

app.listen(port, () => console.log(`hey Arth the server is listening on the port ${port}`));