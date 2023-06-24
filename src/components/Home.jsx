import React, { Component } from "react";
import Connection from "./Connection";
import RobotState from "./RobotState";
import Teleoperation from "./Teleoperation";
import Map from "./Map";
import SetGoal_1 from "./SetGoal_1";
import SetGoal_2 from "./SetGoal_2";
import HomeNavbar from "./HomeNavbar";

import { Row, Col, Container } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";

class Home extends Component {
  componentDidMount() {
    const channel = new BroadcastChannel("6B29FC40-CA47-1067-B31D-00DD010662DA");

    const handleMessage = (event) => {
      toast.success("NEW ORDER FROM CLIENT", {
        position: toast.POSITION.TOP_RIGHT,
      });
    };

    channel.addEventListener("message", handleMessage);

    this.channel = channel;
  }

  componentWillUnmount() {
    if (this.channel) {
      this.channel.removeEventListener("message", this.handleMessage);
    }
  }

  render() {
    return (
      <div>
        <HomeNavbar />
        <Container>
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
            <Col>
              <RobotState />
            </Col>
            <Col>
              <h1>MAP</h1>
              <Map />
            </Col>
          </Row>
          <ToastContainer />
        </Container>
      </div>
    );
  }
}

export default Home;
