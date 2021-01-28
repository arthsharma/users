const express = require('express');

const app = express();
const port = 3000;

app.get('/hey',(req,res) => {
    res.send("Hello Arth");
});

app.listen(port, () =>console.log(`hello Arth App listining on port ${port}`));