import React, { Component } from "react";
import { Container } from "react-bootstrap";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Home from "./Home";
import About from "./About";
import TestDataBase from "./TestDataBase";
import Order from "./Order";
import Drink from "./Drink";
import OrderSuccess from "./OrderSuccess";

class Body extends Component {
  render() {
    return (
      <Container>
        <Router>
          <Switch>
            <Route path="/" exact component={Home}></Route>
            <Route path="/about" exact component={About}></Route>
            <Route path="/testDataBase" exact component={TestDataBase}></Route>

            <Route path="/newOrder" exact component={Order}></Route>
            <Route path="/newOrder/:Table" exact component={Order}></Route>

            <Route path="/newDrink" exact component={Drink}></Route>
            <Route path="/orderSuccess" exact component={OrderSuccess}></Route>
          </Switch>
        </Router>
      </Container>
    );
  }
}

export default Body;
