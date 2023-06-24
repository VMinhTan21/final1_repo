import React, { Component } from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
class HomeNavbar extends Component {
  render() {
    return (
      <Container>
        <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
          <Navbar.Brand href="#home">COFFEE ROS ROBOT</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="/">HOME</Nav.Link>
              <Nav.Link href="/testDataBase">LIST ORDER</Nav.Link>
              <Nav.Link href="/newDrink">NEW REFRESHMENT</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </Container>
    );
  }
}

export default HomeNavbar;
