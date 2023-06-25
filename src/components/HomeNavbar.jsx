import React, { Component } from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
class HomeNavbar extends Component {
  render() {
    return (
      <Container>
        <Navbar bg="light" expand="lg" data-bs-theme="primary" collapseOnSelect>
          <Navbar.Brand href="/"><h1>COFFEE ROS ROBOT</h1></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="/testDataBase"><h6>LIST ORDER</h6></Nav.Link>
              <Nav.Link href="/newDrink"><h6>NEW REFRESHMENT</h6></Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </Container>
    );
  }
}

export default HomeNavbar;
