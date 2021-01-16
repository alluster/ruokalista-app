import React, {useEffect, useState } from 'react';
import { Table, Container, Jumbotron } from 'react-bootstrap';
import axios from 'axios';

const PaymentMethods = () => {
	const [paymentMethods, setPaymentMethods] = useState()
	const [loading, setIsLoading] = useState(false)


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
	useEffect(() => {
		GetPaymentMethods()
	}, [])
	return (
		<Container>
			{console.log(paymentMethods)}
			{
				!loading ?
					paymentMethods.map((i, item) =><a key={i} href={`/checkout/${item.id}`}><img src={item} /> </a> )
					:
					<h1>Loading...</h1>
			}
		</Container>
  );
}


export default PaymentMethods;
