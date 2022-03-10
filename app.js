const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const { CLIENT_MULTI_RESULTS } = require('mysql/lib/protocol/constants/client');
const PORT = process.env.PORT || 3000;
const app = express();

app.use(bodyParser.json());

//MYSQL
const connection = mysql.createConnection({

    host: 'localhost',
    user: 'root',
    password: '#Root2022',
    database: 'node20_mysql'
});

//ROUTE

app.get('/', (req, res) =>{
    res.send(`Welcome to page`);
});

app.get('/customers', (req, res) =>{

    const sql = 'SELECT * FROM customers';
    connection.query(sql, (error, results) =>{
        if (error) throw error;
        if (results.length > 0){
            res.json(results);
        }else {
            res.send('Not result');
        }
    });

});

app.get('/customers/:id', (req, res) =>{

    const {id}= req.params;
    const sql = `SELECT * FROM customers WHERE id = ${id}`;
    connection.query(sql, (error, result) =>{
        if (error) throw error;
        if (result.length > 0){
            res.json(result);
        }else {
            res.send('Not result');
        }
    });

});

app.post('/add', (req, res) =>{

    const sql = 'INSERT INTO customers SET ?';
    const customersObj = {
        name: req.body.name,
        city: req.body.city
    }
    connection.query(sql, customersObj, error =>{
        if (error) throw error;
        res.send('Customer created');
    });

});

app.put('/update/:id', (req, res) =>{
    const {id}= req.params;
    const {name, city} = req.body;
    const sql = `UPDATE customers SET name ='${name}', city = '${city}' WHERE id = ${id}`;
    connection.query(sql, error =>{
        if (error) throw error;
        res.send('Customer update');
    });

});

app.delete('/delete/:id', (req, res) =>{
    const { id } = req.params;
    const sql = `DELETE FROM customers WHERE id = ${id}`;

    connection.query(sql, error =>{
        if (error) throw error;

        res.send('Delete customer');
    });
});

//Check connect

connection.connect(error =>{
    if (error) throw error;
    console.log('Database server running');
});

app.listen(PORT, ()=> console.log(`Server running on Port${PORT}`));