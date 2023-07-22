import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";

import Config from "../scripts/config";

class SetGoal_1 extends Component {
    state = { ros: null }

    constructor() {
        super()

        this.init_connection()

        this.sendCommand = this.sendCommand.bind(this)
    }

    init_connection() {
        this.state.ros = new window.ROSLIB.Ros()
        this.state.ros.on('connection', (e) => {
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


            console.log("SetGoal_1 - Connected")
        } catch (error) {
            console.log(
                "ws://" +
                Config.ROSBRIDGE_SERVER_IP +
                ":" +
                Config.ROSBRIDGE_SERVER_PORT +
                ""
            )
            console.log("SetGoal_1 - cannot connect to the WS robot. Try again after 1 second");
        }
    }

    sendCommand(event) {
        console.log("SetGoal_1 sent command")
        console.log(this.state.ros)

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
                            x: 0.0,  // Replace with the desired position
                            y: 0.0,
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
        console.log('Returning ...');

        toast.success('ROBOT IS RETURNING', {
            position: toast.POSITION.TOP_RIGHT
        })
    }

    render() {
        return (
            <div style={{
                marginTop: "10%"
            }}>
                <Button onClick={this.sendCommand} variant="info"
                    style={
                        { width: "100%" }
                    }>
                    ROBOT RETURN
                </Button>
            </div>
        )
    }
}

export default SetGoal_1
