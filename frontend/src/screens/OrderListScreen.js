import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { listOrders } from "../actions/orderActions";
import { motion } from "framer-motion";
function OrderListScreen({ history }) {
  const dispatch = useDispatch();
  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders } = orderList;
  var pending = 0;
  var notP = 0;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listOrders());
    } else {
      history.push("/login");
    }
  }, [dispatch, history, userInfo]);

  {
    orders &&
      orders.map((order) => {
        if (
          (order.isPaid && !order.isDelivered) ||
          (order.paymentMethod == "COD" && !order.isDelivered)
        ) {
          pending += 1;
        }
        if (!order.isPaid) {
          notP += 1;
        }
      });
  }
  return (
    <motion.div
      initial={{ width: 0 }}
      animate={{ width: "100%" }}
      exit={{ x: window.innerWidth, transition: { duration: 0.1 } }}
    >
      <h1>Orders</h1>
      <Row>
        <Col
          sm={6}
          lg={8}
          md={4}
          // style={{
          //   left: "55%",
          //   textAlign: "center",
          // }}
        >
          <h4>Delivery Pending: {pending ? pending : 0}</h4>
        </Col>
        <Col
          sm={6}
          lg={8}
          // style={{
          //   left: "5%",
          // }}
        >
          <h4>Not Paid: {notP ? notP : 0}</h4>
        </Col>
      </Row>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>USER</th>
              <th>PHONE</th>
              <th>DATE</th>
              <th>PRICE</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.user && order.user.name}</td>
                <td>{order.user && order.user.username}</td>
                <td>
                  {order.createdAt.split("T")[0]}
                  {","}
                  {order.createdAt.split("T")[1].split(".")[0]}
                </td>
                <td>₹{order.totalPrice}</td>
                <td>
                  {order.isPaid ? (
                    order.paidAt
                      .split("T")[0]
                      .concat("," + order.paidAt.split("T")[1].split(".")[0])
                  ) : (
                    <i className="fas fa-times" style={{ color: "red" }}></i>
                  )}
                </td>
                <td>
                  {order.isDelivered ? (
                    order.deliveredAt
                      .split("T")[0]
                      .concat(
                        "," + order.deliveredAt.split("T")[1].split(".")[0]
                      )
                  ) : (
                    <i className="fas fa-times" style={{ color: "red" }}></i>
                  )}
                </td>
                <td>
                  <LinkContainer to={`/order/${order._id}`}>
                    <Button variant="info" className="btn-sm">
                      Details
                    </Button>
                  </LinkContainer>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </motion.div>
  );
}

export default OrderListScreen;
