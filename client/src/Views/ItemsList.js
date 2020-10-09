import React, { useState, useEffect } from 'react';
import { Card, Container, CloseButton } from 'react-bootstrap';
import axios from 'axios'

const ItemsList = () => {
	const [items, setItems] = useState([])
	const [loading, setIsLoading] = useState(false)
	const GetItems = async () => {
		setIsLoading(true)
		await axios.get('/api/getitems', {
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
								  <Button href={`/item/${item.id}`}>Tilaa</Button>
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
