import React, { useEffect, useState } from "react";
import { Row, Col, Container, Button, Form, Table } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

import { useHistory } from "react-router-dom";

const Order = () => {
  const history = useHistory();
  const defaultOrder = {
    Date: new Date().toLocaleDateString("en-GB"),
    StaffID: "Staff-01",
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
        const channel = new BroadcastChannel("6B29FC40-CA47-1067-B31D-00DD010662DA");
        channel.postMessage("Tạo Order thành công!");

        history.push('/orderSuccess')
      } else {
        console.log(orderResponse.status);
      }
    } catch (error) {
      console.log("Error creating new order and order details:", error);
    }
  };

  return (
    <div>
      <Form>
        <Container>
          <Row className="justify-content-md-center">
            <Col md={10}>
              <Form.Group>
                <Table striped borderless hover responsive size="sm">
                  <thead>
                    <tr>
                      <th className="text-center">#</th>
                      <th className="text-center">Thức uống</th>
                      <th className="text-center">Đơn giá</th>
                      <th className="text-center">Số lượng</th>
                    </tr>
                  </thead>
                  <tbody id="orderDetails_table">
                    {orderDetails.map((detail, index) => (
                      <tr key={index}>
                        <td className="d-flex center text-center">
                          <h3 className="stt">{index + 1}</h3>
                        </td>
                        <td>
                          <select
                            className="table-select"
                            onChange={(event) =>
                              handleDrinkChange(event, index)
                            }
                          >
                            <option key={0} value={0}>
                              Chọn món
                            </option>
                            {drinks.map((drink, index) => (
                              <option key={index + 1} value={drink._id}>
                                {drink.DrinkName}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td>
                          <Form.Control
                            type="text"
                            value={detail.Price}
                            readOnly
                          ></Form.Control>
                        </td>
                        <td>
                          <Form.Control
                            type="text"
                            value={detail.Qty}
                            onChange={(event) => handleQtyChange(event, index)}
                          ></Form.Control>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                <h5>Total: {order.Total} Đ</h5>
              </Form.Group>
              <Form.Group>
                <Button type="button" onClick={btnAddRow_onclick}>
                  <span>+</span> Thêm món
                </Button>
              </Form.Group>
              <Form.Group>
                <Form.Label>Ghi chú</Form.Label>
                <Form.Control
                  as="textarea"
                  value={order.Note}
                  rows={3}
                  onChange={(event) => handleNotesChange(event)}
                />
              </Form.Group>
              <Form.Group className="d-flex justify-content-center">
                <Button type="submit" onClick={(event) => handleSubmit(event)}>
                  Đặt món
                </Button>
              </Form.Group>
            </Col>
          </Row>
        </Container>
      </Form>
      <ToastContainer/>
    </div>
  );
};

export default Order;
