import React, { useState, useEffect } from 'react';
import { Card, Container, Button, Form } from 'react-bootstrap';
import axios from 'axios'
import { uuid } from 'uuidv4';

const Item = (props) => {
	const Info = {
		fields: [
			{
				fieldName: 'Eritysitoiveet kuten allergia',
				value: 'commentsKitchen',
				placeholder: ''
			},
			{
				fieldName: 'Tilaajan nimi',
				value: 'name',
				placeholder: 'Anna nimi joka näkyy toimitusosoiteessa'
			},
			{
				fieldName: 'Toimitusosoite',
				value: 'streetAddress',
				placeholder: ''
			},
			{
				fieldName: 'Postinumero',
				value: 'postalCode',
				placeholder: ''
			},
			{
				fieldName: 'Kaupunki',
				value: 'city',
				placeholder: ''
			},
			{
				fieldName: 'Tilaajan puhelinumero',
				value: 'phone',
				placeholder: ''
			},
			{
				fieldName: 'Tilaajan sähköpostiosoite',
				value: 'email',
				placeholder: ''
			},
			{
				fieldName: 'Kommentti kuljettajalle',
				value: 'commentsTransport',
				placeholder: 'esim. ovikoodi'
			},
		]
	}
	const [item, setItem] = useState({})
	const [loading, setIsLoading] = useState(false)
	const [fields, setFields] = useState(
			{
				name: '',
				streetAddress: '',
				postalCode: '',
				city: '',
				phone: '',
				email: '',
				commentsKitchen: '',
				commentsTransport: '',
				itemName: '',
				orderId: ''
			});
	

	let id = props.match.params.id

	

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
		setIsLoading(true)
		try {
			return await axios.get('/api/addorder',  {
				params: {
					customer_name: fields.name,
					customer_street: fields.streetAddress,
					customer_city: fields.city,
					customer_postal_code: fields.postalCode,
					customer_phone: fields.phone,
					customer_email: fields.email,
					comments_transport: fields.commentsTransport,
					comments_kitchen: fields.commentsKitchen,
					item_name: item.name,
					order_id: uuid(),
					order_paid: (new Date()).getHours() + ":" + (new Date()).getMinutes() + ":" + (new Date()).getSeconds() + "-" +	(new Date()).getDate() + "." + (new Date()).getMonth()+1 + "." + (new Date()).getFullYear()  			
				}	
			})
			
			.then(
				setIsLoading(false), 
				props.history.push(`/checkout/${fields.orderId}`)
			)
		} 
		catch (error) {
			if(error) {
				return alert(error.message)

			}
			console.error(error.message)
		}
	}
	const validateForm = () => {
		return fields.name.length > 0 && fields.streetAddress.length > 0 && fields.city.length > 0 && fields.postalCode.length > 0 && fields.phone.length > 0
	}
	const inputChange = e => {
		validateForm()
		const { name, value } = e.target;
		setFields ({ ...fields, [name]: value });
	};

	const Fields = () => {
		return (
			Info.fields.map((item, i) => {
				return (
					<Form key={i} >	
					<Form.Group controlId="formBasicEmail">
						<Form.Label>{item.fieldName}</Form.Label>
							<Form.Control 
								type="text" 
								name={item.value}
								onChange={inputChange}
								required
							/>
						<Form.Text className="text-muted" >
							{item.placeholder}
						</Form.Text>
					</Form.Group>
				</Form>
				)
			})
		)
		
	}

	useEffect(() => {
		GetItem()
		setFields({...fields, orderId: uuid()})
	}, [])
	return (
		<Container>
			<h3>{item.name}</h3>
			<h4>{item.description}</h4>
			<h5>{item.price}</h5>
			{Fields()}

			<Button variant="primary" type="submit" onClick={e => handleSubmit(e)}  disabled={!validateForm()}>
				Siirry maksamaan
			</Button>

				
			
			</Container>
  );
}


export default Item;
