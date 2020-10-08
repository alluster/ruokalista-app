require('dotenv').config()
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const mysql = require('mysql');
const SQL = require('sql-template-strings')
const sslRedirect = require('heroku-ssl-redirect');
const bodyParser = require('body-parser')
const path = require('path')
app.use(sslRedirect());

app.use(express.static(path.join(__dirname, 'client/build')));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}));
const pool = mysql.createPool({
	host: process.env.REACT_APP_DATABASE_HOST,
	user: process.env.REACT_APP_DATABASE_USERNAME,
	password: process.env.REACT_APP_DATABASE_PASSWORD,
	database: process.env.REACT_APP_DATABASE
});
 
app.get('/api/addorder', (req, res) => {
	pool.getConnection(function(err, connection) {
		if (err) throw err; 
		query = SQL`INSERT INTO orders (item_name, order_address, comments) VALUES (${req.query.item_name}, ${req.query.order_address},${req.query.comments})`
		connection.query(
			query,
			function (error, results, fields) {
				res.send(results)

			connection.release();
			if (error) throw error;
		});
	});

})

app.get('/api/getitem/:id', (req, res) => {
	pool.getConnection(function(err, connection) {

		if (err) throw err; 
		query = SQL`SELECT * FROM items WHERE id=${req.params.id}`
		connection.query(
			query,
			function (error, results, fields) {
				res.send(results)
				connection.release();
				if (error) throw error;
			}
		);
	});
})
app.get('/api/getitems', (req, res) => {
	pool.getConnection(function(err, connection) {

		if (err) throw err; 
		query = SQL`SELECT * FROM items`
		connection.query(
			query,
			function (error, results, fields) {
				res.send(results)
				connection.release();
				if (error) throw error;
			}
		);
	});
})
app.get('/api/getorders', (req, res) => {
	pool.getConnection(function(err, connection) {

		if (err) throw err; 
		query = SQL`SELECT * FROM orders`
		connection.query(
			query,
			function (error, results, fields) {
				res.send(results)
				connection.release();
				if (error) throw error;
			}
		);
	});
})


app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
});
app.listen(process.env.PORT || 5000, 
	() => console.log("Server is running..."));

