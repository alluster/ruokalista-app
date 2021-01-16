require('dotenv').config()
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const mysql = require('mysql');
const SQL = require('sql-template-strings')
const sslRedirect = require('heroku-ssl-redirect');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const fetch = require('node-fetch');
const path = require('path');

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
		query = SQL`INSERT INTO orders (customer_name,customer_street,customer_city,customer_postal_code,customer_phone,customer_email,comments_transport,comments_kitchen,item_name, order_id) VALUES (
			${req.query.customer_name}, 
			${req.query.customer_street},
			${req.query.customer_city},
			${req.query.customer_postal_code}, 
			${req.query.customer_phone},
			${req.query.customer_email},
			${req.query.comments_transport}, 
			${req.query.comments_kitchen},
			${req.query.item_name},
			${req.query.order_id}
			)`
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

// OP Checkout test


const ACCOUNT = '375917';
const SECRET = 'SAIPPUAKAUPPIAS';

const calculateHmac = (secret, params, body) => {
	const hmacPayload =
	Object.keys(params)
		.sort()
		.map((key) => [ key, params[key] ].join(':'))
		.concat(body ? JSON.stringify(body) : '')
		.join("\n");

	return crypto
	.createHmac('sha256', secret)
	.update(hmacPayload)
	.digest('hex');
};

const headers = {
	'checkout-account': ACCOUNT,
	'checkout-algorithm': 'sha256',
	'checkout-method': 'GET',
	'checkout-nonce': '564635208570151',
	'checkout-timestamp': '2018-07-06T10:01:31.904Z'
};

app.get('/api/getpaymentmethods', (req, res) => {
	
	const getMethods = () => {
		fetch('https://api.checkout.fi/merchants/payment-providers?groups=mobile,creditcard', 
			{ 
				method: 'get', 
				headers: {
					'checkout-account': ACCOUNT,
					'checkout-algorithm': 'sha256',
					'checkout-method': 'GET',
					'checkout-nonce': '564635208570151',
					'checkout-timestamp': '2018-07-06T10:01:31.904Z',
					'signature': calculateHmac(SECRET, headers)
			}, 
			})
			.then(res => res.json()) // expecting a json response
			.then(json => res.send(json));
	}
		getMethods()
});
app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
});
app.listen(process.env.PORT || 5000, 
	() => console.log("Server is running..."));

