import { useHistory } from "react-router-dom";
import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import { useParams } from "react-router-dom"

const OrderSuccess = (props) => {
    const { Table } = useParams()
    const history = useHistory()

    const handleOrderAgain = async (event) => {
        history.push(`/newOrder/${Table}`)
    }

    return (
        <div>
            <div style={{marginTop: "5vh"}}>
                <Row>
                    <Col>
                        <div className="d-flex justify-content-center"
                            style={{marginBottom: "1vh"}}>
                            <h5>
                               ORDER SUCCESSFULLY! 
                            </h5>                            
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col className="d-flex justify-content-center">
                        <Button
                            variant="success"
                            type="submit" onClick={(event) => handleOrderAgain(event)}>
                            ORDER AGAIN
                        </Button>
                    </Col>
                </Row>

            </div>
        </div>
    )
}

export default OrderSuccess