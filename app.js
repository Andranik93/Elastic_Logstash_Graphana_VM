const express = require('express');
const mysql = require('mysql');
const port = '3306'
const app = express();

const db = mysql.createConnection({
    host: '192.168.36.136', //192.168.36.136 || localhost
    user: 'root',
    password: 'root',
  //  database: 'logStack'
});

db.connect( (err) => {
    if(err) throw err;
    console.log('**** MySQL connect *****');
});

app.get('/', (req,res) => {
    res.send('Ok ...... ********** ')
});

/**
 * @CreateDataBase
 */

app.get('/createdb', (req, res) => {
    let sql = 'CREATE DATABASE logStack';
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Database created...');
    });
});

/**
 * @CreateTabe
 */

app.get('/createtable', (req, res) => {
    let sql = 'CREATE TABLE posts(id int AUTO_INCREMENT, title VARCHAR(255), body VARCHAR(255), PRIMARY KEY(id))';
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(`Result table = ${result}`);
        res.send('Posts table created...');
    });
});

/**
 * @InsertPostQuery
 */

 app.get('/addpost' , (req,res) => {
     //const post = {title:'ElasticSearch Logg', body:'This is log is very gooooooood .. ..  ... . . .'};
     const postTow = {title: 'Hello Loger', body: 'this is ....'}
     let sql = 'INSERT INTO posts SET ?';
     let query = db.query(sql, postTow, (err, result) => {
         if(err) throw err;
         console.log(`First Post end log => ${result}`);
         res.send('Post is ok... log')
     });
 });



app.listen(port, () => {
    console.log(`Server is run in ${port} port`);
});