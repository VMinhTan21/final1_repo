import React, { Component } from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
class HomeNavbar extends Component {
  render() {
    return (
      <div >
        <Container style={{padding: "0", borderTop: "1px solid", borderRight: "1px solid", borderLeft: "1px solid"}}>
        <Navbar expand="lg" collapseOnSelect 
          style={{
            backgroundColor: "#DFFFCC"
          }}>
          <Navbar.Brand href="/" style={{marginLeft: "25px"}}><h1>COFFEE ROS ROBOT</h1></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="/testDataBase"><h6>LIST ORDER</h6></Nav.Link>
              <Nav.Link href="/newDrink"><h6>NEW REFRESHMENT</h6></Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </Container>
      </div>      
    );
  }
}

export default HomeNavbar;

//data-bs-theme="primary" bg="#CCFFE5"