import { useHistory } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Row, Col, Container, Button, Form, Table } from "react-bootstrap";

const OrderSuccess = () => {
    const history = useHistory()

    const handleOrderAgain = async (event) => {
        history.push('/newOrder')
    }

    return (
        <div>
            ORDER SUCCESSFULLY!
            <div>
                <Button type="submit" onClick={(event) => handleOrderAgain(event)}>
                    ORDER AGAIN
                </Button>
            </div>
        </div>
    )
}

export default OrderSuccess