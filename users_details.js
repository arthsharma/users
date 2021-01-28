var express = require('express');
var app = express();
const bodyParser = require('body-parser');
// const cors = require('cors');

var mysql = require('mysql');
var conn = mysql.createConnection({
    host: "localhost",
    user:"root",
    password : "",
    database : "test"
});


var port = 4000;
conn.connect(function(err){
    if(err){
        throw err;
    }else{
        console.log("Connected!");
    }
});
// app.use(cors());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

// create a user
app.post('/api/users', (req,res) => {
    console.log(req.body); 
    var insert_data = [];
    let name = req.body.name;
    let email = req.body.email;
    let age = req.body.age;
    let mobile = req.body.mobile;
    let short_description = req.body.short_description.toString();
    var insert = `INSERT INTO users (name,email,age,mobile,short_description) VALUES('${name}','${email}',${age},${mobile},'${short_description}')`;
    conn.query(insert, function(err,result,fields){
        if(err) throw err;
        console.log(result.insertId);
        res.send("Your data has been added on id " + result.insertId);
    });
    // console.log("name " + name + " age " + age + " email " + email + " mobile " + mobile + " short desc " + `${short_description}` );

});

//get all user details
app.get('/api/users',(req,res) => {
    var getUser = "Select * from users";
    conn.query(getUser, function(err,result,fields){
        if(err) throw err;
        console.log(result);
        res.send(result);
    });
    
});

// get the details of a particular user
app.get('/api/users/:id', (req,res) => {
    var id = req.params.id;
    var getUser = "Select * from users where id = " + id;
    conn.query(getUser, function(err,result,fields){
        if(err) throw err;
        console.log(fields);
        res.send(result);
    });
});

// delete particular user detail
app.delete('/api/users/:id', (req,res) => {
    var id = req.params.id;
    var removeUser = "DELETE FROM users where id = " + id;
    conn.query(removeUser, function(err,result,fields){
        if(err) throw err;
        console.log(result);
        res.send("Your data has been removed for id " + id);
    });
});

// update the user details
app.put('/api/users/:id',(req,res) => {
    var id = req.params.id;
    let name = req.body.name;
    let email = req.body.email;
    let age = req.body.age;
    let mobile = req.body.mobile;
    let short_description = req.body.short_description.toString();

    var EditData = `UPDATE users set name = '${name}', email = '${email}', age = ${age}, mobile = ${mobile}, short_description = '${short_description}' where id = ` + id;
    conn.query(EditData, function(err,result,fields){
        if(err) throw err;
        console.log(result);
        res.send("Your data has been updated for id " + id);
    });
});

app.listen(port, () => {
    console.log(`ur server is listening at ${port}`);
});