import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";

const OrderDetail = (props) => {
  const { order, drinks } = props;
  const [orderDetails, setOrderDetails] = useState([]);

  useEffect(() => {
    fetchOrderDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchOrderDetails = async () => {
    const orderList = order.OrderList;
    const details = [];

    try {
      for (let detailId of orderList) {
        const response = await axios.get(
          `https://db-api-5yux.onrender.com/orderDetail/${detailId}`
        );
        const data = response.data;
        details.push(data);
      }

      setOrderDetails(details);
    } catch (error) {
      console.log("Error fetching order details:", error);
    }
  };

  return (
    <div style={{ backgroundColor: "#EFFFFF"}}>
      <h4>Table: {order.Table}</h4>
      <br />
      <div>Total: {order.Total}</div>
      <Table striped borderless hover responsive size="sm">
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
            const drink = drinks.find((d) => d._id === order.Drink);
            return (
                <tr key={order._id}>
                  <td>{index + 1}</td>
                  <td>{drink ? drink.DrinkName : ""}</td>
                  <td>{drink ? drink.DrinkPrice : 0}</td>
                  <td>{order.Qty}</td>
                </tr>
            );
          })}
          <div>
            <div>NOTE: </div>
            {order.Note}
          </div>
        </tbody>
      </Table>
    </div>
  );
};

export default OrderDetail;
