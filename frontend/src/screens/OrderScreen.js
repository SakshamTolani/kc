import React, { useState, useEffect } from "react";
import {
  Button,
  Row,
  Col,
  ListGroup,
  Image,
  Card,
  Badge,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import {
  createOrder,
  getOrderDetails,
  payOrder,
  deliverOrder,
  payReset,
  cancelOrder,
} from "../actions/orderActions";
import {
  ORDER_CANCEL_RESET,
  ORDER_DELIVER_RESET,
  ORDER_PAY_RESET,
  PAY_RESET_RESET,
} from "../constants/orderConstants";
import axios from "axios";

function OrderScreen({ match, history }) {
  const orderId = match.params.id;
  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, error, loading } = orderDetails;

  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;

  const orderCancel = useSelector((state) => state.orderCancel);
  const { loading: loadingCancel, success: successCancel } = orderCancel;

  const orderPayReset = useSelector((state) => state.payReset);
  const { loading: loadingPayReset, success: successPayReset } = orderPayReset;

  const orderDeliver = useSelector((state) => state.orderDeliver);
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const [paidVar, setPaidVar] = useState(false);
  const [toPaidBtn, setToPaidBtn] = useState(false);
  var rpayId = "";
  var codOrderDate = order && new Date(order.createdAt);
  var onlineOrderDate = order && new Date(order.paidAt);

  const dispatch = useDispatch();
  if (!loading && !error) {
    order.itemsPrice = order.orderItems
      .reduce((acc, item) => acc + item.price * item.qty, 0)
      .toFixed(2);
  }

  function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }

  async function displayRazorpay() {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    // creating a new order
    const result = await axios.post(`/api/orders/${order._id}/razorpay/`);

    if (!result) {
      alert("Server error. Are you online?");
      return;
    }

    // Getting the order details back
    const { amount, id: order_id, currency, notes } = result.data;
    const options = {
      key: "rzp_live_Qsia4Pwuhalx1m", // Enter the Key ID generated from the Dashboard
      amount: amount.toString(),
      currency: currency,
      name: "Kamsin Collection.",
      description: "Test Transaction",
      image: "",
      method: {
        netbanking: true,
        debit: true,
        credit: false,
        wallet: true,
        upi: true,
        paylater: false,
        cardless_emi: false,
        emi: false,
        olamoney: false,
      },
      config: {
        display: {
          hide: [
            {
              method: "wallet",
            },
            {
              method: "paylater",
            },
          ],
          blocks: {
            banks: {
              name: "Other Methods",
              instruments: [
                {
                  method: "wallet",
                  wallets: ["paytm"],
                },
              ],
            },
          },
          sequence: ["block.banks"],
          preferences: {
            show_default_blocks: true, // Should Checkout show its default blocks?
          },
        },
      },

      order_id: order_id,
      handler: async function (response) {
        rpayId = response.razorpay_payment_id;
        const paymentResult = {
          orderCreationId: order_id,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
          razorpaySignature: response.razorpay_signature,
        };
        const result = await axios.post(
          `/api/orders/${orderId}/verify/`,
          paymentResult
        );
        let myAlert = result.data.msg;
        if (myAlert) {
          dispatch(payOrder(orderId, paymentResult));
        }
        // window.location.reload();
      },
      prefill: {
        name: order.user.name,
        email: order.shippingAddress.alternateEmail,
        contact: order.shippingAddress.username,
      },
      notes: {
        address: order.shippingAddress.address,
      },
      theme: {
        color: "#A352FF",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }
  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }
    if (
      !order ||
      successPay ||
      order._id !== Number(orderId) ||
      successPayReset ||
      successDeliver ||
      successCancel
    ) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch({ type: ORDER_DELIVER_RESET });
      dispatch({ type: PAY_RESET_RESET });
      dispatch({ type: ORDER_CANCEL_RESET });
      dispatch(getOrderDetails(orderId));
    }
  }, [
    dispatch,
    order,
    orderId,
    successCancel,
    successDeliver,
    successPayReset,
    successPay,
    paidVar,
  ]);
  const deliverHandler = () => {
    dispatch(deliverOrder(order));
  };
  const paymentReset = () => {
    const localData = "Reset Payment Right Now";
    dispatch(payReset(orderId, localData));
  };
  const paymentToPaid = () => {
    const myData = rpayId.toString();
    setPaidVar(true);
    setToPaidBtn(true);
    dispatch(payOrder(orderId, myData));
  };
  const cancelMyOrder = () => {
    dispatch(cancelOrder(orderId));
  };

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <div>
      <h1
        style={{
          visibility:
            order.isPaid || order.paymentMethod == "COD" ? "visible" : "hidden",
        }}
      >
        Order: {order._id}
      </h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Delivery</h2>

              <p>
                <strong>Name: </strong>
                {order.user.name}
              </p>
              <p>
                <strong>Phone: </strong>
                {order.user.username}
              </p>
              <p>
                <strong>Shipping: </strong>
                {order.shippingAddress.address}, {order.shippingAddress.city},
                {"     "}
                {order.shippingAddress.postalCode}
              </p>
              <p>
                {order.shippingAddress.alternatePhone
                  ? `Alternate Phone: ${order.shippingAddress.alternatePhone}`
                  : ""}
              </p>
              <p>
                {order.shippingAddress.alternatePhone
                  ? ` Email: ${order.shippingAddress.alternateEmail}`
                  : ""}
              </p>

              {order.isDelivered ? (
                <Message variant="success">
                  Delivered on {order.deliveredAt.split("T")[0]}
                  {","}
                  {order.deliveredAt.split("T")[1].split(".")[0]}
                </Message>
              ) : (order.isPaid && !order.isCancelled) ||
                (order.paymentMethod == "COD" && !order.isCancelled) ? (
                <Message variant="warning">Delivery under process</Message>
              ) : !order.isPaid &&
                !order.isCancelled &&
                order.paymentMethod == "Online" ? (
                <Message variant="warning">Pay Now to place order</Message>
              ) : (
                <Message variant="danger">
                  ORDER CANCELLED. If any amount is deducted, it will be
                  refunded within 2-3 days
                </Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p
                style={{
                  display:
                    order.paymentMethod !== "COD" || (order.isPaid && "none"),
                }}
              >
                <strong>Amount: </strong>₹
                {order.isPaid && order.paymentMethod == "COD"
                  ? Number(order.totalPrice) - 40
                  : order.totalPrice}
              </p>
              <p>
                <strong>Method: </strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message variant="success">
                  Paid on {order.paidAt.split("T")[0]}
                  {","}
                  {order.paidAt.split("T")[1].split(".")[0]}
                </Message>
              ) : (
                <Message variant="warning">Not Paid</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.orderItems.length === 0 ? (
                <Message variant="info">Order is empty.</Message>
              ) : (
                <ListGroup variant="flush">
                  {order.orderItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={2}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={1}>{item.size}UK</Col>
                        <Col md={4}>
                          {item.qty} x ₹{item.price} = ₹
                          {(item.qty * item.price).toFixed(2)}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              {!order.isPaid ? (
                <Badge
                  style={{
                    padding: "1rem",
                    fontSize: "1rem",
                    borderRadius: "1rem",
                    display: Number(order.taxPrice) == 0 && "none",
                    width: "86%",
                    color: "white",
                    textAlign: "center",
                  }}
                  bg="success"
                >
                  Woohoo! You are saving{" "}
                  <strong style={{ fontWeight: "bold", fontSize: "1.18rem" }}>
                    ₹
                    {(
                      Number(order.itemsPrice) +
                      Number(order.shippingPrice) -
                      Number(order.totalPrice)
                    ).toFixed(2)}{" "}
                  </strong>
                  {/* <i className="fas fa-coins"></i> */}
                </Badge>
              ) : (
                <Badge
                  style={{
                    padding: "1rem",
                    fontSize: "1rem",
                    borderRadius: "1rem",
                    display: Number(order.taxPrice) == 0 && "none",
                    width: "83%",
                    color: "white",
                    textAlign: "center",
                  }}
                  bg="success"
                >
                  Woohoo! You saved{" "}
                  <strong style={{ fontWeight: "bold", fontSize: "1.18rem" }}>
                    ₹
                    {(
                      Number(order.itemsPrice) +
                      Number(order.shippingPrice) -
                      Number(order.totalPrice)
                    ).toFixed(2)}{" "}
                  </strong>
                  {/* <i className="fas fa-coins"></i> */}
                </Badge>
              )}
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Item:</Col>
                  <Col>₹{order.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Delivery:</Col>
                  <Col>₹{order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item
                style={{
                  display:
                    (order.paymentMethod == "Online" && "none") ||
                    (order.isDelivered && !toPaidBtn && "none"),
                }}
              >
                <Row
                  style={{
                    textDecoration: !toPaidBtn && "line-through",
                  }}
                >
                  <Col>COD Charges:</Col>
                  <Col>₹40</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row
                  style={{
                    color: order.taxPrice != 0 && "#6666FF",
                    fontFamily: order.taxPrice != 0 && "Alegreya",
                    fontSize: order.taxPrice != 0 && "18px",
                  }}
                >
                  <Col>{order.coupon ? order.coupon : "Discount"}:</Col>
                  <Col>-₹{order.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row
                  style={{
                    fontWeight: "bold",
                    fontSize: "1.10rem",
                  }}
                >
                  <Col>Total:</Col>
                  <Col>
                    ₹
                    {order.paymentMethod !== "COD" || toPaidBtn
                      ? order.totalPrice
                      : order.totalPrice - 40}
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Badge
                  style={{
                    padding: "0.5rem",
                    fontSize: "1rem",
                    borderRadius: "1rem",
                    display:
                      (order.paymentMethod == "Online" && "none") ||
                      (order.isPaid && "none"),
                    width: "79%",
                    color: "white",
                    textAlign: "center",
                  }}
                  bg="info"
                >
                  Pay online and save ₹40 <i className="fas fa-handshake"></i>
                </Badge>
              </ListGroup.Item>
              {!order.isPaid && (
                <ListGroup.Item>
                  {loadingPay && <Loader />}
                  <Button
                    className="btn-block"
                    onClick={displayRazorpay}
                    disabled={order.isCancelled}
                  >
                    {!order.isCancelled ? "Pay Now" : "Order Cancelled"}
                  </Button>
                </ListGroup.Item>
              )}
              {(!order.isCancelled &&
                order.isPaid &&
                order.paymentMethod == "Online" &&
                onlineOrderDate.setHours(onlineOrderDate.getHours() + 12) >
                  new Date() && (
                  <ListGroup.Item>
                    {loadingCancel && <Loader />}
                    <Button className="btn-block" onClick={cancelMyOrder}>
                      Cancel Order
                    </Button>
                  </ListGroup.Item>
                )) ||
                (!order.isCancelled &&
                  order.paymentMethod == "COD" &&
                  codOrderDate.setHours(codOrderDate.getHours() + 12) >
                    new Date() && (
                    <ListGroup.Item>
                      {loadingCancel && <Loader />}
                      <Button className="btn-block" onClick={cancelMyOrder}>
                        Cancel Order
                      </Button>
                    </ListGroup.Item>
                  ))}
              {userInfo && !userInfo.isAdmin && order.isPaid && (
                <ListGroup.Item
                  style={{
                    // background: "#4bbf73",
                    width: "50%",
                    textAlign: "center",
                    left: "5rem",
                  }}
                >
                  <i
                    style={{
                      color: "black",
                      fontSize: "3rem",
                      padding: "0rem",
                    }}
                    className="fas fa-check"
                  ></i>
                </ListGroup.Item>
              )}
            </ListGroup>
            {loadingDeliver && <Loader />}
            {userInfo && userInfo.isAdmin && !order.isDelivered && (
              <ListGroup.Item>
                <Button
                  variant="primary"
                  type="button"
                  className="btn btn-block"
                  onClick={deliverHandler}
                >
                  Mark as Delivered
                </Button>
              </ListGroup.Item>
            )}
            {userInfo &&
              userInfo.isAdmin &&
              !order.isDelivered &&
              !order.isPaid && (
                <ListGroup.Item>
                  <Button
                    variant="primary"
                    type="button"
                    className="btn btn-block"
                    onClick={paymentToPaid}
                  >
                    Mark as Paid
                  </Button>
                </ListGroup.Item>
              )}
            {loadingPayReset && <Loader />}
            {userInfo &&
              userInfo.isAdmin &&
              !order.isDelivered &&
              order.isPaid && (
                <ListGroup.Item>
                  <Button
                    variant="primary"
                    type="button"
                    className="btn btn-block"
                    onClick={paymentReset}
                  >
                    Mark as Not Paid
                  </Button>
                </ListGroup.Item>
              )}
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default OrderScreen;
