import React, { Component } from "react";
import Connection from "./Connection";
import RobotState from "./RobotState";
import Teleoperation from "./Teleoperation";
import Map from "./Map";
import SetGoal_1 from "./SetGoal_1";
import SetGoal_2 from "./SetGoal_2";
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
    const cusStyle = {
      position: "relative",
      left: "50%",
      transform: "translateX(-50%)"
    }
    return (
      <div>
        <HomeNavbar />
        <Container>
          <Row>
            <Col>
              <Connection />
              <Row className="m-3">
                <Col>
                  <SetGoal_2 />
                </Col>
                <Col>
                  <SetGoal_2 />
                </Col>
                <Col>
                  <SetGoal_2 />
                </Col>
              </Row>
              <Row className="m-3">
                <Col>
                  <Row>
                    <h5 className="mt-4">Manual Control</h5>
                  </Row>
                  <Row style={{ position: "relative", top: "10%" }}>
                    <SetGoal_1 />
                  </Row>
                  <div style={{ top: "20%", position: "relative" }}>
                    <Teleoperation />
                  </div>
                </Col>
                <Col>
                  <RobotState />
                </Col>
              </Row>
            </Col>
            <Col>
              <div className="text-center m-4" >
                <h4>
                  CURRENTLY ORDER
                </h4>
              </div>
              <Row>
                <div style={cusStyle}>
                  <CurrentOrder />
                </div>
              </Row>
              {/* <Row>
                <h3>MAP</h3>
                <Map />
              </Row> */}
            </Col>
          </Row>
          <div style={{position: 'relative', left: '10%'}}>
            <h3>MAP</h3>
            <Map />
          </div>

          <ToastContainer />
        </Container>
      </div>
    );
  }
}

export default Home;
