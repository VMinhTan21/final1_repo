import React, { Component } from "react";
import { Button } from "react-bootstrap";

import Config from "../scripts/config"
import { toast } from "react-toastify";

class SetGoal_2 extends Component {
    state = { ros: null,
                x: 0,
                y: 0 }
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
                            x: 1.6,  // Replace with the desired position
                            y: -1.0,
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
        console.log('Moving to table 1 ...');

        toast.success('ROBOT IS MOVING TO TABLE 1', {
            position: toast.POSITION.TOP_RIGHT
        })
    }

    render() {
        return (
            <div>
                <Button onClick={this.sendCommand} variant="success">
                    TABLE 1
                </Button>
            </div>
        )
    }
}

export default SetGoal_2
