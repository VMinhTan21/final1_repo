import React, { Component } from "react";
import ViewOrder from "./ViewOrder";
import { Container } from "react-bootstrap";

import HomeNavbar from "./HomeNavbar";
import { ToastContainer, toast } from "react-toastify";

class TestDataBase extends Component {
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
        <Container>
          <HomeNavbar />
          <h2>LIST ORDER</h2>
          <br />
          <ViewOrder />
          <ToastContainer />
        </Container>
      </div>
    );
  }
}

export default TestDataBase;
