import React, { useState, useEffect } from 'react';
import { Card, Container, Button, Form } from 'react-bootstrap';
import axios from 'axios'

const Item = (props) => {

	const [item, setItem] = useState({})
	const [loading, setIsLoading] = useState(false)
	const [name, setName] = useState("")
	const [address, setAddress] = useState("")
	const [comments, setComments] = useState("")
	let id = props.match.params.id
	console.log(item)

	const GetItem = async () => {
		setIsLoading(true)
		await axios.get(`/api/getitem/${id}`)
		.then(function (response) {
			let data = response.data[0]
			setItem(data)
			setIsLoading(false)

	
		})
		.catch(function (error) {
			console.log(error);
		})
		.finally(function () {
			setIsLoading(false)
	
		});
	}
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			return await axios.get('/api/addorder',  {
				params: {
					order_address: address,
					comments: comments,
					item_name: item.name
					
				}	
			})
		
			.then(alert("Tuote tilattu, kiitos tilauksestanne"),
			props.history.push('/')
		)
		} 
		catch (error) {
			console.error(error.message)
		}
	}
	useEffect(() => {
		GetItem()
	}, [])
	return (
		<div>
				<h1>{item.name}</h1>
				<h2>{item.description}</h2>
				<h3>{item.price}</h3>
				<Form>
				<Form.Group controlId="formBasicEmail">
					<Form.Label>Full name</Form.Label>
					<Form.Control type="text" placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)} />
						<Form.Text className="text-muted" >
							First Name Family name
						</Form.Text>
				</Form.Group>
				<Form.Group controlId="formBasicEmail">
					<Form.Label>Address</Form.Label>
					<Form.Control type="text" placeholder="Please give your address" value={address} onChange={(e) => setAddress(e.target.value)} />
					<Form.Text className="text-muted">
						Street address so we can find you
					</Form.Text>
				</Form.Group>
				<Form.Group >
					<Form.Label>Comments</Form.Label>
					<Form.Control type="text" placeholder="Door code" value={comments} onChange={(e) => setComments(e.target.value)} />
					<Form.Text className="text-muted">
						Door code etc.
					</Form.Text>
				</Form.Group>
		
				<Button variant="primary" type="submit" onClick={e => handleSubmit(e)}>
					Order meal
				</Button>
			</Form>
			
			</div>
  );
}


export default Item;
