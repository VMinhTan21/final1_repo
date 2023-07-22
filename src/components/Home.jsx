import React, { Component } from "react";
import Connection from "./Connection";
import Teleoperation from "./Teleoperation";
import Map from "./Map";
import RobotState from "./RobotState";
import SetGoal_1 from "./SetGoal_1";
import SetGoal_2 from "./SetGoal_2";
import SetGoal_3 from "./SetGoal_3";
import SetGoal_4 from "./SetGoal_4";
import SetGoal_5 from "./SetGoal_5";

import HomeNavbar from "./HomeNavbar";
import CurrentOrder from "./CurrentOrder";

import { Row, Col, Container, Card } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";

import { useState, useEffect } from "react";
import io from 'socket.io-client'

class Home extends Component {

  componentDidMount() {
    const socket = io("https://socket-robot-sv.onrender.com/", {
      transports: ['websocket'],
    })

    socket.on('RECEIVED_NEW_ORDER', (data) => {
      console.log(data)

      const message = 'NEW ORDER FROM TABLE ' + data

      toast.success(message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    })
  }

  componentWillUnmount() {

  }

  render() {
    const cusStyle = {
      position: "relative",
      left: "15%"
    }
    return (
      <div style={{ backgroundColor: "#EFFFFF" }}>
        <HomeNavbar />
        <Container>
          <Row>
            <Col style={{ border: "1px solid", borderRight: "none" }}>
              <div style={{ marginTop: "7%" }}>
                <div className="text-center">
                  <h4>
                    ROBOT CONTROLS
                  </h4>
                </div>
                <Row>
                  <div style={{
                    position: "relative",
                    left: "50%",
                    transform: "translateX(-50%)"
                  }}>
                    <Card style={{ marginTop: "2%", backgroundColor: "#EFFFFF", border: "none" }}>
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
                    </Card>
                  </div>
                </Row>
              </div>
            </Col>
            <Col style={{ border: "1px solid" }}>
              <div style={{ marginTop: "7%" }}>
                <div className="text-center">
                  <h4>
                    CURRENTLY ORDER
                  </h4>
                </div>
                <Row>
                  <CurrentOrder />
                </Row>
              </div>
            </Col>
          </Row>

          <Row style={
            {
              backgroundColor: "#EFFFFF",
              borderLeft: "1px solid",
              borderRight: "1px solid",
              borderBottom: "1px solid"
            }
          }>
            <Col sm={4}>
              <div style={{ position: "relative", left: "50%" }}>
                <div style={{ marginTop: "5vh" }}>
                  <h4>CONTROL</h4>
                </div>
                <Teleoperation />
              </div>
            </Col>
            <Col sm={8}>
              <div>
                <div style={{ marginTop: "5vh" }}>
                  <h4>MAP</h4>
                </div>
                <Map />
              </div>            
            </Col>
          </Row>
          <ToastContainer />
          <RobotState />
        </Container>
      </div>
    );
  }
}

export default Home;
