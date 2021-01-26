import React, { useState, useEffect } from 'react';
import { Card, Container, Button } from 'react-bootstrap';
import axios from 'axios'
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link
  } from "react-router-dom";
const ItemsList = (props) => {
	const [items, setItems] = useState([])
	const [loading, setIsLoading] = useState(false)
	let id = props.match.params.id

	const GetItems = async () => {
		setIsLoading(true)
		await axios.get(`/api/getitems`, {
			params: {
				restaurantId: id
			}
		})
		.then(function (response) {
			let data = response.data
			setItems(data)
			setIsLoading(false)
	
		})
		.catch(function (error) {
			console.log(error);
		})
		.finally(function () {
			setIsLoading(false)
	
		});
	}

	useEffect(() => {
		GetItems()
		
	}, [])
	return (
		<div>
				{
					!loading ? 
					
						items.map((item, i) => {
							return(
								<Card key={i} style={{ width: '100%' }}>
								<Card.Body>
								  <Card.Title>{item.name}</Card.Title>
								  <Card.Subtitle className="mb-2 text-muted">Id: {item.id}</Card.Subtitle>
								  <Card.Text>
									{item.description}
								  </Card.Text>
								  <Card.Text>
									{item.price}
								  </Card.Text>
								 <Link 
								 
								 to={{
									pathname: `/item/${item.id}`,
									state: {
									 restaurantId: id
									}
								 }}
								 
								 >
								 <Button >Tilaa</Button>
								 </Link> 
								</Card.Body>
							  </Card>
			
			
							)
						})
					
					
					:
					<h1>Loading </h1>
				}
			
			
			
		</div>
  );
}


export default ItemsList;
