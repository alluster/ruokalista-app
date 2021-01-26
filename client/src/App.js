import React from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link
  } from "react-router-dom";
import ItemsList from './Views/ItemsList';
import Item from './Views/Item';
import Checkout from './Views/Checkout';

function App() {
  return (
    <Router>
      <div style={{background: "transparent"}}>
        <Switch>
			<Route exact path="/item/:id" render={(props) => <Item {...props} />}/> 
          	<Route exact path="/:id" render={(props) => <ItemsList {...props} />} />
			<Route exact path="/checkout/:id" render={(props) => <Checkout {...props} />} />

        </Switch>
      </div>
    </Router>
  );
}

export default App;
