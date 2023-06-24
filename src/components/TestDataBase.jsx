import React from "react";
import ViewOrder from "./ViewOrder";
import { Container } from "react-bootstrap";

import HomeNavbar from "./HomeNavbar";

const TestDataBase = () => {
  return (
    <div>
      <Container>
        <HomeNavbar />
        <h2>LIST ORDER</h2>
        <br />
        <ViewOrder />

      </Container>
    </div>
  );
};

export default TestDataBase;
