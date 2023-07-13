import Header from "./components/Header";
import Body from "./components/Body";

import React, { useState, useEffect } from "react";
import { socket } from "./socket";
import io from 'socket.io-client'

export default function App() {
  return (
    <div className="App">
      <Header />
      <Body></Body>
    </div>
  );
}

