import React, { Component } from "react";
import Connection from "./Connection";
import RobotState from "./RobotState";
import Teleoperation from "./Teleoperation";
import Map from "./Map";
import SetGoal_1 from "./SetGoal_1";
import SetGoal_2 from "./SetGoal_2";
import SetGoal_3 from "./SetGoal_3";
import SetGoal_4 from "./SetGoal_4";
import SetGoal_5 from "./SetGoal_5";

import HomeNavbar from "./HomeNavbar";
import ViewOrder from "./ViewOrder";
import CurrentOrder from "./CurrentOrder";

import { Row, Col, Container, Card } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";

class Home extends Component {
  componentDidMount() {
    const server = new WebSocket('wss://localhost:3000')
    // server.addEventListener("open", (event) => {
    //   console.log('WEBSOCKET OPENED')
    // })
    server.onopen = (event) => {
      console.log("WS EVENT EMIT")
    }

    server.onmessage = (message) => {
      console.log("NEW MESSAGE", message)
    }

    const channel = new BroadcastChannel("6B29FC40-CA47-1067-B31D-00DD010662DA");

    const handleMessage = (event) => {
      toast.success("NEW ORDER FROM CLIENT! REFRESH IF YOU WANNA DELIVER THIS", {
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
    const cusStyle = {
      position: "relative",
      float: "right"
    }
    return (
      <div>
        <HomeNavbar />
        <Container>
          <Row>
            <Col>
              <div className="text-center"
                style={
                  {
                    marginTop: "8%"
                  }
                }>
                <h4>
                  ROBOT CONTROLS
                </h4>
              </div>
              <Row style={{ marginTop: "5%" }}>
                <Col>
                  <SetGoal_2 />
                </Col>
                <Col>
                  <SetGoal_3 />
                </Col>
                <Col>
                  <SetGoal_4 />
                </Col>
                <Col>
                  <SetGoal_5 />
                </Col>
              </Row>
              <Row>
                <Col>
                  <SetGoal_1 />
                </Col>
                <Col>
                  <Connection />
                </Col>
              </Row>
            </Col>
            <Col>
              <div className="text-center"
                style={
                  {
                    marginTop: "8%"
                  }
                }>
                <h4>
                  CURRENTLY ORDER
                </h4>
              </div>
              <Row style={cusStyle}>
                <div>
                  <CurrentOrder />
                </div>
              </Row>
            </Col>
          </Row>

          <Row>
            <Col sm={4}>
              <Row>
                <RobotState />
              </Row>
              <Row>
                <div style={{ top: "30%", position: "relative", left: "5%" }}>
                  <h4>CONTROL</h4>
                  <Teleoperation />
                </div>
              </Row>
            </Col>
            <Col sm={8}>
              <h4>MAP</h4>
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
