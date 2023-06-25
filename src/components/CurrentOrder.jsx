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
        top: "50%",
        right: "0%",
        transform: "translate(0, -50%)"
    }

    return (
        <div style={{ cusStyle }}>
            <Table striped borderless hover responsive size="md">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Drink</th>
                        <th>Price</th>
                        <th>Qty</th>
                    </tr>
                </thead>
                <tbody id="orders_table">
                    {orderDetails.map((order, index) => {
                        const drink = drinks.find((d) => d._id === order.Drink)
                        return (
                            <tr key={order._id}>
                                <td>{index + 1}</td>
                                <td>{drink ? drink.DrinkName : ""}</td>
                                <td>{drink ? drink.DrinkPrice : 0}</td>
                                <td>{order.Qty}</td>
                            </tr>
                        )
                    })}
                    <tr>
                        <td colSpan={2}>Note: {orders.Note}</td>
                        <td colSpan={2}>Total: {orders.Total}</td>
                    </tr>
                    <tr>
                        <Button variant="success">DELIVER</Button>
                    </tr>
                </tbody>
            </Table>

        </div>
    )
}

export default CurrentOrder