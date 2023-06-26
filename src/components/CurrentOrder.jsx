import React, { useEffect, useState } from "react";
import axios from "axios";
import { Modal, Card, Table, Col, Row, Button } from "react-bootstrap";
import SetGoal_2 from "./SetGoal_2";

const CurrentOrder = () => {
    const [drinks, setDrinks] = useState([]);
    const [orders, setOrders] = useState([]);

    const [orderDetails, setOrderDetails] = useState([]);

    useEffect(() => {
        fetchDrinks();
    }, []);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchDrinks = async () => {
        try {
            const response = await axios.get("https://db-api-5yux.onrender.com/drink");
            const data = response.data;
            setDrinks(data);
        } catch (error) {
            console.log("Error fetching drinks:", error);
        }
    };

    const fetchOrders = async () => {
        const details = []

        try {
            const response = await axios.get("https://db-api-5yux.onrender.com/order")
            const data = response.data[response.data.length - 1]
            const orderList = data.OrderList

            setOrders(data)

            for (let detailId of orderList) {
                const res = await axios.get(`https://db-api-5yux.onrender.com/orderDetail/${detailId}`)
                const dataDetails = res.data
                details.push(dataDetails)
            }

            setOrderDetails(details)
        } catch (error) {
            console.log("Error fetching orders:", error);
        }
    };

    const cusStyle = {
        position: "relative",
        float: "right"
    }

    return (
        <div style={{ cusStyle }}>
            <Card bg="warning" text="primary" style={{marginTop: "3%"}}>
                <Card.Body>
                    <h5 style={{
                        marginTop: "3%",
                        marginBottom: "5%"
                    }}>TABLE 1</h5>
                    <h6 style={{
                        marginBottom: "0",
                        marginTop: "3%"
                    }}>List drinks of order</h6>
                    <Table striped borderless hover responsive size="md">
                        <thead>
                            <tr>
                                <th><h6>#</h6></th>
                                <th><h6>Drink</h6></th>
                                <th><h6>Price</h6></th>
                                <th><h6>Price</h6></th>
                            </tr>
                        </thead>
                        <tbody id="orders_table">
                            {orderDetails.map((order, index) => {
                                const drink = drinks.find((d) => d._id === order.Drink)
                                return (
                                    <tr key={order._id}>
                                        <td><h6>{index + 1}</h6></td>
                                        <td><h6>{drink ? drink.DrinkName : ""}</h6></td>
                                        <td><h6>{drink ? drink.DrinkPrice : 0}</h6></td>
                                        <td><h6>{order.Qty}</h6></td>
                                    </tr>
                                )
                            })}
                            <tr>
                                <td colSpan={2}><h6>Note: {orders.Note}</h6></td>
                                <td colSpan={2}><h6>Total: {orders.Total}</h6></td>
                            </tr>
                            {/* <tr>
                        <Button variant="success">DELIVER</Button>
                    </tr> */}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
        </div>
    )
}

export default CurrentOrder