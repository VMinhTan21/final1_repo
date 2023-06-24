import React, { Component } from "react";
import { Row, Col, Container, Button } from "react-bootstrap";

import Config from "../scripts/config"

class SetGoal_2 extends Component {
    state = { ros: null }
    constructor() {
        super()

        this.init_connection()

        this.sendCommand = this.sendCommand.bind(this)
    }


    init_connection() {
        this.state.ros  =  new window.ROSLIB.Ros()
        this.state.ros.on('connection', (e)=> {
            console.log(e)
            this.setState({
                ros: this.state.ros
            })
        })
        try {
            console.log('connect')
            this.state.ros.connect(
                "ws://" +
                Config.ROSBRIDGE_SERVER_IP +
                ":" +
                Config.ROSBRIDGE_SERVER_PORT +
                ""
            )
        
            
            console.log("SetGoal_2 - Connected")
        } catch (error) {
            console.log(
                "ws://" +
                Config.ROSBRIDGE_SERVER_IP +
                ":" +
                Config.ROSBRIDGE_SERVER_PORT +
                ""
            )
            console.log("SetGoal_2 - cannot connect to the WS robot. Try again after 1 second");
        }
    }

    sendCommand(event) {
        console.log("SetGoal_2 sent command")
        console.log(this.state.ros)

        // var cmdService = new window.ROSLIB.Service({
        //     ros: this.state.ros,
        //     name: '/setgoal/setgoal',
        //     serviceType: 'setgoal/msgs'
        // })

        // var cmdService_test = new window.ROSLIB.Service({
        //     ros: this.state.ros,
        //     name: '/map_server',
        //     serviceType: 'map_server/map_server'
        // })

        // var request = new window.ROSLIB.ServiceRequest({
        //     package_name: 'map_server',
        //     launch_file: 'map.yaml'
        // })

        // cmdService_test.callService(request, function(response) {
        //     console.log('Service call: ', response);
        // })

        // const cmd = new window.ROSLIB.Topic({
        //     ros: this.state.ros,
        //     name: '/run_command',  // Replace with an appropriate topic name
        //     messageType: 'std_msgs/String'
        //   });

        // const runCommand = new window.ROSLIB.Message({
        //     data: 'rosrun your_package your_executable'  // Replace with your desired rosrun command
        //   });

        // cmd.publish(runCommand);

        const goal = new window.ROSLIB.Goal({
            actionClient: new window.ROSLIB.ActionClient({
                ros: this.state.ros,
                serverName: '/move_base',
                actionName: 'move_base_msgs/MoveBaseAction'
            }),
            goalMessage: {
                target_pose: {
                    header: {
                        frame_id: 'map'  // Replace with the desired frame ID
                    },
                    pose: {
                        position: {
                            x: 1.0,  // Replace with the desired position
                            y: 2.0,
                            z: 0.0
                        },
                        orientation: {
                            x: 0.0,
                            y: 0.0,
                            z: 0.0,
                            w: 1.0
                        }
                    }
                }
            }
        });

        goal.send();
        console.log('Goal 2 sent!');
    }

    render() {
        return (
            <div>
                <Button onClick={this.sendCommand}>
                    SET GOAL 2
                </Button>
            </div>
        )
    }
}

export default SetGoal_2
