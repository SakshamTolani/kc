import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button, Row, Col, ListGroup, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import CheckoutSteps from "../components/CheckoutSteps";
import Message from "../components/Message";
import { createOrder, getCouponDetails } from "../actions/orderActions";
import { COUPON_RESET, ORDER_CREATE_RESET } from "../constants/orderConstants";
import Loader from "../components/Loader";
import {
  Box,
  Flex,
  List,
  ListItem,
  SimpleGrid,
  Spacer,
  Text,
  Image,
  Link,
  HStack,
  VStack,
  Divider,
} from "@chakra-ui/react";

function PlaceOrderScreen({ history }) {
  const [myCoupon, setMyCoupon] = useState("");
  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, error, success, loading } = orderCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  let dis = 0;
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    if (myCoupon == "") {
      dispatch(getCouponDetails(" ", cart.itemsPrice));
    } else {
      dispatch(getCouponDetails(myCoupon.toUpperCase(), cart.itemsPrice));
    }
  };

  const couponDetails = useSelector((state) => state.couponDetails);
  const { loading: couponLoading, error: couponError, coupon } = couponDetails;
  const cart = useSelector((state) => state.cart);
  const productList = useSelector((state) => state.productList);
  const { products } = productList;
  cart.itemsPrice = cart.cartItems
    .reduce((acc, item) => acc + item.price * item.qty, 0)
    .toFixed(2);
  cart.shippingPrice = (
    cart.itemsPrice < 499 &&
    cart.shippingAddress.city.toLowerCase().includes("varanasi")
      ? 50
      : cart.itemsPrice >= 499 &&
        cart.shippingAddress.city.toLowerCase().includes("varanasi")
      ? 0
      : cart.itemsPrice >= 1099 &&
        !cart.shippingAddress.city.toLowerCase().includes("varanasi")
      ? 0
      : 99
  ).toFixed(2);
  cart.taxPrice =
    !couponLoading && coupon && coupon.active
      ? (Number(coupon.discount * cart.itemsPrice) / 100).toFixed(2)
      : 0;

  cart.totalPrice =
    cart.paymentMethod == "COD"
      ? (
          Number(cart.itemsPrice) +
          Number(cart.shippingPrice) -
          Number(cart.taxPrice) +
          40
        ).toFixed(2)
      : (
          Number(cart.itemsPrice) +
          Number(cart.shippingPrice) -
          Number(cart.taxPrice)
        ).toFixed(2);

  if (!cart.paymentMethod) {
    history.push("/payment");
  }

  useEffect(() => {
    if (success) {
      history.push(`/order/${order._id}`);
      dispatch({ type: ORDER_CREATE_RESET });
    }
  }, [success, history]);

  const placeOrder = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
        coupon: coupon ? coupon : "",
      })
    );
    dispatch({ type: COUPON_RESET });
  };

  return (
    <motion.div
      initial={{ width: 0 }}
      animate={{ width: "100%" }}
      exit={{ x: window.innerWidth, transition: { duration: 0.1 } }}
    >
      <CheckoutSteps step1 step2 step3 step4 />
      {/* <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Delivery</h2>
              <p>
                <strong>Shipping: </strong>
                {cart.shippingAddress.address}, {cart.shippingAddress.city},
                {"     "}
                {cart.shippingAddress.postalCode}
                <br></br>
                <br></br>
                {cart.shippingAddress.alternatePhone
                  ? `Alternate Phone: ${cart.shippingAddress.alternatePhone}`
                  : ""}
                <br></br>
                <br></br>
                {cart.shippingAddress.alternatePhone
                  ? `Email: ${cart.shippingAddress.alternateEmail}`
                  : ""}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order Items</h2>
              {cart.cartItems.length === 0 ? (
                <Message variant="info">Your cart is empty.</Message>
              ) : (
                <ListGroup variant="flush">
                  {cart.cartItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <span style={{ visibility: "hidden" }}>
                        {products.map((it, indx) =>
                          it._id == item.product && it.countInStock == 0
                            ? (dis += 1)
                            : (dis += 0)
                        )}
                      </span>
                      <Row>
                        <Col md={2}>
                          <Image
                            src={item.image_one}
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
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Item:</Col>
                  <Col>₹{cart.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Delivery:</Col>
                  <Col>₹{cart.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item
                style={{
                  display: cart.paymentMethod !== "COD" && "none",
                }}
              >
                <Row>
                  <Col>COD Charges:</Col>
                  <Col>₹40</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item
                disabled={cart.taxPrice === 0}
                style={{
                  display: cart.taxPrice == 0 && "none",
                }}
              >
                <Row
                  style={{
                    color: cart.taxPrice != 0 && "#6666FF",
                    fontFamily: cart.taxPrice != 0 && "Alegreya",
                    fontSize: cart.taxPrice != 0 && "18px",
                  }}
                >
                  <Col>
                    {!couponLoading && coupon ? coupon.code : "Discount"}:
                  </Col>

                  <Col>
                    <strong>-₹{cart.taxPrice}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total:</Col>
                  <Col style={{}} className="">
                    ₹{cart.totalPrice}
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item
                style={{
                  visibility:
                    Number(cart.itemsPrice) +
                      Number(cart.shippingPrice) -
                      Number(cart.totalPrice) ===
                    0
                      ? "hidden"
                      : "visible",
                  display:
                    Number(cart.itemsPrice) +
                      Number(cart.shippingPrice) -
                      Number(cart.totalPrice) <=
                      0 && "none",
                  background: "#28a745",
                  color: "white",
                }}
              >
                Your total savings{" "}
                <strong style={{ fontWeight: "bold", fontSize: "1.10rem" }}>
                  ₹
                  {(
                    Number(cart.itemsPrice) +
                    Number(cart.shippingPrice) -
                    Number(cart.totalPrice)
                  ).toFixed(2)}
                </strong>
              </ListGroup.Item>
              <ListGroup.Item>
                {error && <Message variant="danger">{error}</Message>}
              </ListGroup.Item>
              <ListGroup.Item>
                {couponLoading && <Loader />}
                {couponError && (
                  <Message variant="danger">{couponError}</Message>
                )}
                {!couponLoading && coupon && (
                  <Message variant="success">
                    Coupon Applied Successfully
                  </Message>
                )}
                <Form onSubmit={submitHandler} className="d-flex">
                  <Form.Control
                    type="text"
                    value={myCoupon}
                    placeholder="Apply Coupon"
                    onChange={(e) => setMyCoupon(e.target.value)}
                    // className="mr-sm-2 ml-sm-5 mt-2"
                    style={{ border: "solid", color: "#222" }}
                  ></Form.Control>

                  <Button
                    type="submit"
                    className="p-2 ml-2"
                    variant="outline-dark"
                  >
                    Apply
                  </Button>
                </Form>
              </ListGroup.Item>
              {loading && <Loader />}
              <ListGroup.Item>
                <Button
                  type="button"
                  className="btn-block"
                  disabled={cart.cartItems === 0 || dis > 0}
                  onClick={placeOrder}
                >
                  {dis == 0 ? "Place order" : "out of stock item(s) in cart"}
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row> */}
      <Flex>
        <Box p="4">
          <Text
            as={"header"}
            fontFamily={"Raleway"}
            fontSize={"2xl"}
            textTransform={"uppercase"}
            fontWeight={600}
          >
            Shipping Information
          </Text>
          <List spacing={3} m={4}>
            <ListItem fontSize={"lg"}>
              {/* <Icon as={RepeatIcon} m={2} w={5} h={5} /> */}
              <Text as={"span"} fontWeight={"bold"} fontSize={"xl"}>
                Name:
              </Text>{" "}
              {userInfo.name}
            </ListItem>
            <ListItem fontSize={"lg"}>
              {/* <Icon as={RepeatIcon} m={2} w={5} h={5} /> */}
              <Text as={"span"} fontWeight={"bold"} fontSize={"xl"}>
                Street Address:
              </Text>{" "}
              {cart.shippingAddress.address}
            </ListItem>
            <ListItem fontSize={"lg"}>
              {/* <Icon as={RepeatIcon} m={2} w={5} h={5} /> */}
              <Text as={"span"} fontWeight={"bold"} fontSize={"xl"}>
                Pin Code:
              </Text>{" "}
              {cart.shippingAddress.postalCode}
            </ListItem>
            <ListItem fontSize={"lg"}>
              <Text as={"span"} fontWeight={"bold"} fontSize={"xl"}>
                City:
              </Text>{" "}
              {cart.shippingAddress.city}
            </ListItem>
            <ListItem fontSize={"lg"}>
              {/* <Icon as={RepeatIcon} m={2} w={5} h={5} /> */}
              <Text as={"span"} fontWeight={"bold"} fontSize={"xl"}>
                Alternate Phone Number:
              </Text>{" "}
              {cart.shippingAddress.alternatePhone}
            </ListItem>
            <ListItem fontSize={"lg"}>
              {/* <Icon as={RepeatIcon} m={2} w={5} h={5} /> */}
              <Text as={"span"} fontWeight={"bold"} fontSize={"xl"}>
                Email Address:
              </Text>{" "}
              {cart.shippingAddress.alternateEmail}
            </ListItem>
          </List>
        </Box>
        <Spacer />
        <Box p="4" bg="#E2E8F0" w={"40%"}>
          <Text
            as={"header"}
            fontFamily={"Raleway"}
            fontSize={"2xl"}
            textTransform={"uppercase"}
            fontWeight={600}
          >
            Order Summary
          </Text>
          <List spacing={2} m={4}>
            {cart.cartItems.length === 0 ? (
              <Message variant="info">Your cart is empty.</Message>
            ) : (
              cart.cartItems.map((item, index) => (
                <ListItem key={index}>
                  <span style={{ visibility: "hidden" }}>
                    {products.map((it, indx) =>
                      it._id == item.product && it.countInStock == 0
                        ? (dis += 1)
                        : (dis += 0)
                    )}
                  </span>
                  <SimpleGrid columns={4} spacing={1} w={"450px"}>
                    <Box h="80px">
                      <Image
                        src={item.image_one}
                        alt={item.name}
                        borderRadius={"10px"}
                        boxSize={"100px"}
                      />
                    </Box>
                    <Box h="80px" w="120px">
                      <VStack alignItems={"baseline"}>
                        <Link
                          href={`/product/${item.product}`}
                          fontWeight={600}
                          fontSize={"md"}
                        >
                          {item.name}
                        </Link>
                        <Text>Size: {item.size}UK</Text>
                      </VStack>
                    </Box>
                    <Box h="80px"></Box>
                    <Box h="80px">
                      <Text fontWeight={600} fontSize={"md"}>
                        &#8377;{(item.qty * item.price).toFixed(2)}
                      </Text>
                    </Box>
                  </SimpleGrid>
                  <Divider />
                </ListItem>
              ))
            )}
          </List>
          <Divider />
        </Box>
      </Flex>
    </motion.div>
  );
}

export default PlaceOrderScreen;
