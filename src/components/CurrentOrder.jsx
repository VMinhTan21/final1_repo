import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Table } from "react-bootstrap";
import io from 'socket.io-client'

const CurrentOrder = (props) => {
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
            // const response = axios.get("https://db-api-5yux.onrender.com/order")
            // let length = response.data.length
            // let index = 0

            // for(let i = 0; i < length ; i++) {
            //     if (response.data[i].Status == "Pending") {
            //         index = i
            //         break
            //     }
            // }
 
            const data = props.data
            //const data = response.data[index]
            setOrders(data)
            console.log("Got data")
            console.log(data)

            const orderList = data.OrderList
            console.log("orderList")
            console.log(orderList)

            for (let detailId of orderList) {
                const res = await axios.get(`https://db-api-5yux.onrender.com/orderDetail/${detailId}`)
                const dataDetails = res.data
                console.log(dataDetails)
                details.push(dataDetails)
            }

            console.log(details)

            setOrderDetails(details)
        } catch (error) {
            console.log("Error fetching orders:", error);
        }
    };

    const cusStyle = {
        position: "relative",
        float: "right"
    }

    // style={{marginTop: "3%", right: "3%"}}

    return (
        <div style={{
            position: "relative",
            left: "50%",
            transform: "translateX(-50%)"
        }}>
            <Card text="primary" style={{ marginTop: "7%", marginBottom: "5%", backgroundColor: "#FFB244" }}>
                <Card.Body>
                    <h5 style={{
                        marginTop: "3%",
                        marginBottom: "5%"
                    }}>{orders.Table}</h5>
                    <h5>{orders.Status}</h5>
                    <h6 style={{
                        marginBottom: "0",
                        marginTop: "3%",
                        marginBottom: "2%"
                    }}>List drinks of order</h6>
                    <Table striped borderless hover responsive size="md" style={{ border: "1px solid" }}>
                        <thead>
                            <tr>
                                <th><h6>#</h6></th>
                                <th><h6>Drink</h6></th>
                                <th><h6>Price</h6></th>
                                <th><h6>Qty</h6></th>
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