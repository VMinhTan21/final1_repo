import React, { Component } from "react";
import Connection from "./Connection";
import RobotState from "./RobotState";
import Teleoperation from "./Teleoperation";
import Map from "./Map";
import SetGoal_1 from "./SetGoal_1";
import SetGoal_2 from "./SetGoal_2";
import HomeNavbar from "./HomeNavbar";

import { Row, Col, Container, Button } from "react-bootstrap";

import { Server, Socket } from 'socket.io'
import { createServer } from 'http'

class Home extends Component {
  state = {};

  constructor() {
    super()

    this.initWebSocket = this.initWebSocket(this)
  }

  initWebSocket() {
    
  }

  render() {
    return (
      <div>
        <HomeNavbar />
        <Container>
          <h1 className="text-center mt-3">Robot Control Page</h1>
          <Row>
            <Col>
              <Connection />
            </Col>
          </Row>
          <Row>
            <Col>
              <Teleoperation />
              <SetGoal_1 />
              <SetGoal_2 />
            </Col>
          </Row>
          <Row>
            {" "}
            <Col>
              <RobotState />
            </Col>
            <Col>
              <h1>MAP</h1>
              <Map></Map>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Home;
