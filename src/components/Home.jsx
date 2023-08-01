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
import axios from "axios";

class Home extends Component {

  state = {
    currentOrderkey: 0,
    currentOrderData: {}
  }

  constructor() {
    super()

    this.fetchCurrentOrder()
  }

  componentDidMount() {

    // this.fetchCurrentOrder()

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

    socket.on('GOAL_REACHED_CHANGE_CURRENT_ORDER', (data) => {
      console.log('GOAL_REACHED_RECEIVED')

      this.changeCurrentOrder()
      // this.setState((prev) => ({
      //   currentOrderkey: prev.currentOrderkey + 1
      // }))

      console.log('current order changed state')
    })
  }

  async fetchCurrentOrder() {
    const currentOrder = await axios.get("https://db-api-5yux.onrender.com/order")

    let length = currentOrder.data.length
    let index = 0

    for (let i = 0; i < length; i++) {
      if (currentOrder.data[i].Status == "Pending") {
        index = i
        break
      }
    }

    let OrderID = currentOrder.data[index]._id

    const CurrentOrderData = await axios.get(`https://db-api-5yux.onrender.com/order/${OrderID}`)

    console.log("Current Order data")
    console.log(CurrentOrderData.data)

    this.setState({
      currentOrderData: CurrentOrderData.data
    })

    console.log("Passing this data to <CurrentOrder> ", typeof this.state.currentOrderData)
    console.log(this.state.currentOrderData)

    this.setState((prev) => ({
      currentOrderkey: prev.currentOrderkey + 1
    }))
  }

  async changeCurrentOrder() {
    let OrderID = this.state.currentOrderData._id

    const shouldOrderUpdated = this.state.currentOrderData
    
    
    console.log("Order should be updated")
    console.log(shouldOrderUpdated)

    shouldOrderUpdated.Status = "Complately"

    const update = await axios.put(`https://db-api-5yux.onrender.com/order/${OrderID}`, shouldOrderUpdated)

    const currentOrder = await axios.get("https://db-api-5yux.onrender.com/order")

    let length = currentOrder.data.length
    let index = 0

    for (let i = 0; i < length; i++) {
      if (currentOrder.data[i].Status == "Pending") {
        index = i
        break
      }
    }

    let NewOrderID = currentOrder.data[index]._id

    const CurrentOrderData = await axios.get(`https://db-api-5yux.onrender.com/order/${NewOrderID}`)

    console.log("Current Order data")
    console.log(CurrentOrderData.data)

    this.setState({
      currentOrderData: CurrentOrderData.data
    })

    this.setState((prev) => ({
      currentOrderkey: prev.currentOrderkey + 1
    }))

  }

  render() {
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
                        <Col style={{ padding: "0px 15px" }}>
                          <SetGoal_2 />
                        </Col>
                        <Col style={{ padding: "0px 15px" }}>
                          <SetGoal_3 />
                        </Col>
                        <Col style={{ padding: "0px 15px" }}>
                          <SetGoal_4 />
                        </Col>
                        <Col style={{ padding: "0px 15px" }}>
                          <SetGoal_5 />
                        </Col>
                      </Row>
                      <Row>
                        <Col style={{ padding: "0px 15px" }}>
                          <SetGoal_1 />
                        </Col>
                        <Col style={{ padding: "0px 15px" }}>
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
                  <CurrentOrder key={this.state.currentOrderkey} data={this.state.currentOrderData} />
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
