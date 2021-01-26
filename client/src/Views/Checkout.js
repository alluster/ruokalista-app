import React, {useEffect, useState } from 'react';
import { Table, Container, Jumbotron, InputGroup, Image, Form, FormGroup, Button } from 'react-bootstrap';
import axios from 'axios';

const Checkout = (props) => {
	const [paymentMethods, setPaymentMethods] = useState([])
	const [loading, setIsLoading] = useState(false)
	const [maksutapa, setMaksutapa] = useState('')

	const GetPaymentMethods = async () => {
		setIsLoading(true)

		await axios.get(`/api/getpaymentmethods`, {
		})
		.then(function (response) {
			let data = response.data
			setPaymentMethods(data)
			setIsLoading(false)
	
		})
		.catch(function (error) {
			console.log(error);
		})
		.finally(function () {
			setIsLoading(false)
	
		});

	}
	const validateForm = () => {
		return (maksutapa.length > 0)
	}

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsLoading(true)
		return (
			setIsLoading(false), 
			props.history.push({
					
				pathname: `/${props.location.state.restaurantId}`
				
			}),
			alert("Kiitos tilauksestasi")
		)	
	} 
		
	
	useEffect(() => {
		GetPaymentMethods()
		console.log(props)
	}, [])
	return (
		<Container>
		{console.log(paymentMethods)}

		{
			!loading ?
			<fieldset>
				<Form.Group>

				{paymentMethods.map((item, i) => {
					return (
						<div>
							<Form.Check id={item.id} type="radio" aria-label={item.id} name="maksutapa" onChange={() => setMaksutapa(item.id)}/>
							<Image fluid src={item.icon} /> 
						</div>
					)
				
	
				})	
			}
							</Form.Group>

			</fieldset>
			 
			:
				<h1>Loading...</h1>
		}
			<Button variant="primary" type="submit" onClick={e => handleSubmit(e)}  disabled={!validateForm()}>
				Tee tilaus
			</Button>
   
		</Container>
  );
}


export default Checkout;
