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
          <RobotState />
        </Container>
      </div>
    );
  }
}

export default Home;
