import React, { Component } from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
class HomeNavbar extends Component {
  render() {
    return (
      <Container>
        <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
          <Navbar.Brand href="#home">React ROS Robot</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/about">About</Nav.Link>
              <Nav.Link href="/testDataBase">Database</Nav.Link>
              <Nav.Link href="/newOrder">New Order</Nav.Link>
              <Nav.Link href="/newDrink">New Drink</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </Container>
    );
  }
}

export default HomeNavbar;
