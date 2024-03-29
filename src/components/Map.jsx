import React, { Component } from "react";
import Config from "../scripts/config";

class Map extends Component {
  state = {
    ros: null,
  };

  constructor() {
    super();
    //this.init_connection = this.view_map.bind(this);
    this.init_connection()
    this.view_map = this.view_map.bind(this);
  }

  

  init_connection() {
    //this.setState({ ros: new ROSLIB.Ros() });
    this.state.ros = new window.ROSLIB.Ros();
    this.state.ros.on('connection', (e) => {
      console.log(e)
      this.setState({
          ros: this.state.ros
      })
  })
    console.log("Map:" + this.state.ros);
    try {
      this.state.ros.connect(
        "ws://" +
          Config.ROSBRIDGE_SERVER_IP +
          ":" +
          Config.ROSBRIDGE_SERVER_PORT +
          ""
      );
    } catch (error) {
      console.log(
        "ws://" +
          Config.ROSBRIDGE_SERVER_IP +
          ":" +
          Config.ROSBRIDGE_SERVER_PORT +
          ""
      );
      console.log("cannot connect to the WS robot. Try again after 1 second");
    }
  }

  componentDidMount() {
    this.init_connection();
    console.log("Map: componentDidMount" + this.state.ros);
    this.view_map();
  }

  view_map() {
    var viewer = new window.ROS2D.Viewer({
      divID: "nav_div",
      width: 650,
      height: 450,
    });
    var navClient = new window.NAV2D.OccupancyGridClientNav({
      ros: this.state.ros,
      rootObject: viewer.scene,
      viewer: viewer,
      serverName: "/move_base",
      withOrientation: true,
    });
  }

  render() {
    return (
      <div>
        <div id="nav_div" style={{
          position: "relative",
          float: "left",
          marginBottom: "2vh"
        }}></div>
      </div>
    );
  }
}

export default Map;


// import React, { useState, useEffect } from "react";
// import Config from "../scripts/config";

// const Map = () => {
//   const [ros, setRos] = useState(null);

//   const initConnection = () => {
//     const newRos = new window.ROSLIB.Ros();
//     newRos.on('connection', () => {
//       console.log("Connected to ROS");
//       setRos(newRos);
//     });
//     console.log("Map: ", newRos);
//     try {
//       newRos.connect(
//         "ws://" +
//           Config.ROSBRIDGE_SERVER_IP +
//           ":" +
//           Config.ROSBRIDGE_SERVER_PORT
//       );
//     } catch (error) {
//       console.log(
//         "ws://" +
//           Config.ROSBRIDGE_SERVER_IP +
//           ":" +
//           Config.ROSBRIDGE_SERVER_PORT
//       );
//       console.log(
//         "Cannot connect to the WS robot. Try again after 1 second."
//       );
//     }
//   };

//   useEffect(() => {
//     initConnection();
//   }, []);

//   const viewMap = () => {
//     if (!ros) {
//       console.log("ROS connection not established.");
//       return;
//     }

//     var viewer = new window.ROS2D.Viewer({
//       divID: "nav_div",
//       width: 650,
//       height: 450,
//     });

//     var navClient = new window.NAV2D.OccupancyGridClientNav({
//       ros: ros,
//       rootObject: viewer.scene,
//       viewer: viewer,
//       serverName: "/move_base",
//       withOrientation: true,
//     });
//   };

//   useEffect(() => {
//     viewMap();
//   }, [ros]);

//   return (
//     <div>
//       <div
//         id="nav_div"
//         style={{
//           position: "relative",
//           float: "left",
//           marginBottom: "2vh",
//         }}
//       ></div>
//     </div>
//   );
// };

// export default Map;
