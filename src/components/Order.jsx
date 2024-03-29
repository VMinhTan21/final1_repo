import React, { useEffect, useState } from "react";
import { Row, Col, Container, Button, Form, Table } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import { Link, useParams } from "react-router-dom"
import { useHistory } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

import io from "socket.io-client"

const Order = (req, res) => {

  //const socket = io.connect('http://localhost:4000')
  //const socket = io.connect('http://socket-sv.vercel.app')
  const socket = io("https://socket-robot-sv.onrender.com/", {
    transports: ['websocket'],
  })

  const { Table } = useParams()

  console.log(typeof Table)

  const history = useHistory();
  const defaultOrder = {
    Date: new Date().toLocaleDateString("en-GB"),
    StaffID: "Staff-01",
    Table: Table,
    Status: "Pending",
    OrderList: [],
    Note: "",
    Total: 0,
  };

  const [order, setOrder] = useState(defaultOrder);
  const defaultOrderDetail = { Drink: null, Price: 0, Qty: "" };
  const [orderDetails, setOrderDetails] = useState([defaultOrderDetail]);
  const [drinks, setDrinks] = useState([]);

  useEffect(() => {
    fetchDrinks();
  }, []);

  useEffect(() => {
    calculateTotalPrice();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderDetails]);

  const btnAddRow_onclick = () => {
    setOrderDetails([...orderDetails, defaultOrderDetail]);
  };

  const fetchDrinks = async () => {
    try {
      const response = await axios.get("https://db-api-5yux.onrender.com/drink");
      const data = response.data;
      setDrinks(data);
    } catch (error) {
      console.log("Error fetching drinks:", error);
    }
  };

  const calculateTotalPrice = () => {
    let total = 0;
    orderDetails.forEach((detail) => {
      const price = parseInt(detail.Price, 10);
      const qty = parseInt(detail.Qty, 10);
      total += price * qty;
    });

    if (isNaN(total)) total = 0;

    setOrder({ ...order, Total: total });
  };

  const handleDrinkChange = (event, index) => {
    const value = event.target.value;

    const drink = drinks.find((d) => d._id === value);

    const updatedOrderDetails = [...orderDetails];
    updatedOrderDetails[index] = {
      ...updatedOrderDetails[index],
      Drink: value,
      Price: drink ? drink.DrinkPrice : 0,
    };
    setOrderDetails(updatedOrderDetails);
  };

  const handleQtyChange = (event, index) => {
    const { value } = event.target;
    const numericValue = value.replace(/[^0-9]/g, ""); // Filter out non-numeric characters
    const updatedOrderDetails = [...orderDetails];
    updatedOrderDetails[index].Qty = numericValue;
    setOrderDetails(updatedOrderDetails);
  };

  const handleNotesChange = (event) => {
    const { value } = event.target;
    setOrder({ ...order, Note: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Create order details
      const detailIds = [];

      for (const detail of orderDetails) {
        if (detail.Drink && detail.Price && detail.Qty) {
          const orderDetailsResponse = await axios.post(
            "https://db-api-5yux.onrender.com/orderDetail",
            detail
          );

          detailIds.push(orderDetailsResponse.data._id);
          console.log(
            "New order detail created:",
            orderDetailsResponse.statusText
          );
        }
      }

      // Create order
      const updatedOrder = { ...order, OrderList: detailIds };
      const orderResponse = await axios.post(
        "https://db-api-5yux.onrender.com/order",
        updatedOrder
      );

      // Navigation and toast
      if (orderResponse.status === 201) {
        // const channel = new BroadcastChannel("6B29FC40-CA47-1067-B31D-00DD010662DA");
        // channel.postMessage("Tạo Order thành công!");

        socket.emit('NEW_ORDER', { table: Table })

        history.push(`/orderSuccess/${Table}`)
      } else {
        console.log(orderResponse.status);
      }
    } catch (error) {
      console.log("Error creating new order and order details:", error);
    }
  };

  return (
    <div style={{
      backgroundColor: "#EFFFFF"
    }}>
      <Row>
        <Col>
          <h5 style={{
            margin: "10px 15px",
            fontWeight: "bold"
          }}>
            COFFEE ROS ROBOT - ORDER FORM
          </h5>
        </Col>
      </Row>
      <Form >
        <Container>
          <Row
            style={{
              fontSize: '100%'
            }}
            className="justify-content-md-center">
            <Col style={{ border: "1px solid" }}>
              <Form.Group>
                <Table striped hover responsive size="md">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th className="text-center">Drinks</th>
                      <th className="text-center">Price</th>
                      <th className="text-center">Quantity</th>
                    </tr>
                  </thead>
                  <tbody id="orderDetails_table">
                    {orderDetails.map((detail, index) => (
                      <tr key={index}>
                        <td style={{ fontWeight: 'bold', width: '5%' }}>
                          {index + 1}
                        </td>
                        <td style={{
                          width: '45%'
                        }}>
                          <select
                            className="table-select"
                            onChange={(event) =>
                              handleDrinkChange(event, index)
                            }
                          >
                            <option key={0} value={0}>
                              Select
                            </option>
                            {drinks.map((drink, index) => (
                              <option key={index + 1} value={drink._id}>
                                {drink.DrinkName}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td style={{ width: "25%" }}>
                          <Form.Control
                            type="text"
                            value={detail.Price}
                            readOnly
                          ></Form.Control>
                        </td>
                        <td style={{ width: '25%' }}>
                          <Form.Control
                            //className="text-center"
                            type="number"
                            step="1"
                            max="5"
                            class="quantity-field border-0 text-center"
                            value={detail.Qty}
                            onChange={(event) => handleQtyChange(event, index)}
                          ></Form.Control>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>

              </Form.Group>
            </Col>
          </Row>
          <Row style={{ border: "1px solid", borderTop: "none", borderBottom: "none" }}>
            <Col style={{
              fontSize: '100%',
              fontWeight: 'bold'
            }}>
              <p style={{
                marginTop: "2%"
              }}>
                Total: {order.Total} Đ
              </p>
            </Col>
          </Row>
          <Row style={{ border: "1px solid", borderTop: "none", borderBottom: "none" }}>
            <Col>
              <Form.Group>
                <Button
                  variant="info" size="sm"
                  type="button" onClick={btnAddRow_onclick}>
                  <span>+</span> Add
                </Button>
              </Form.Group>
            </Col>
          </Row>
          <Row style={{ border: "1px solid", borderTop: "none", borderBottom: "none" }}>
            <Col>
              <Form.Group>
                <Form.Label style={{ fontWeight: "bold" }}>Note</Form.Label>
                <Form.Control
                  as="textarea"
                  value={order.Note}
                  rows={3}
                  onChange={(event) => handleNotesChange(event)}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row style={{ border: "1px solid", borderTop: "none" }}>
            <Col>
              <Form.Group className="d-flex justify-content-center">
                <Button
                  variant="success" size="sm"
                  type="submit" onClick={(event) => handleSubmit(event)}>
                  Order
                </Button>
              </Form.Group>
            </Col>
          </Row>
        </Container>
      </Form>
      <ToastContainer />
    </div>
  );
};

export default Order;
