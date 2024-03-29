import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import { Row, Col } from "react-bootstrap";
import OrderDetail from "./OrderDetail";

const ViewOrder = () => {
  const [drinks, setDrinks] = useState([]);
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);

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
    try {
      await axios.get("https://db-api-5yux.onrender.com/order").then((response) => {
        const data = response.data;
        setOrders(data);
      });
    } catch (error) {
      console.log("Error fetching orders:", error);
    }
  };

  const handleRowClick = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div style={{
      backgroundColor: "#EFFFFF",
      border: "1px solid"
    }}>
      <Row>
        <Col>
          <h5 style={{
            margin: "15px 10px"
          }}>
            LIST ORDER
          </h5>
        </Col>
      </Row>
      <Table striped borderless hover responsive size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Status</th>
            <th>Date</th>
            {/* <th>StaffID</th> */}
            <th>Note</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody id="orders_table">
          {orders.map((order, index) => {
            return (
              <tr key={order._id} onClick={() => handleRowClick(order)} className="pointer">
                <td>{index + 1}</td>
                <td>{order.Status}</td>
                <td>{order.Date}</td>
                {/* <td>{order.StaffID}</td> */}
                <td>{order.Note}</td>
                <td>{order.Total}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <Modal show={showModal} onHide={handleCloseModal}
              >
        <Modal.Header closeButton style={{ backgroundColor: "#EFFFFF"}}>
          <Modal.Title>Order Detail</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: "#EFFFFF"}}>
          {selectedOrder && <OrderDetail order={selectedOrder} drinks={drinks} />}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ViewOrder;
