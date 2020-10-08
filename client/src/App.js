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

function App() {
  return (
    <Router>
      <div>
	
       

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
		<Route path="/item/:id" render={(props) => <Item {...props} />}/> 
          <Route path="/">
            <ItemsList />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
