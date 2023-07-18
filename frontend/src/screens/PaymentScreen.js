import React, { useState } from "react";
import { Form, Button, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import CheckoutSteps from "../components/CheckoutSteps";
import FormContainer from "../components/FormContainer";
import { savePaymentMethod } from "../actions/cartActions";

function PaymentScreen({ history }) {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  const dispatch = useDispatch();
  // const [codReady, setCodReady] = useState(false);
  // const result = products.includes(Number(cart.shippingAddress.postalCode));
  // products.filter(
  //   (item) =>
  //     item === Number(cart.shippingAddress.postalCode) && setCodReady(true)
  // );

  const [paymentMethod, setPaymentMethod] = useState("Online");

  if (!shippingAddress.address) {
    history.push("/shipping");
  }

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    history.push("/placeorder");
  };
  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as="legend">Select Method</Form.Label>
          <Col>
            <Form.Check
              type="radio"
              label="Pay Now"
              id="razorpay"
              name="paymentMethod"
              checked
              onChange={(e) => setPaymentMethod("Online")}
            ></Form.Check>
            <Form.Check
              type="radio"
              label={"Cash on Delivery (Extra charges applicable)"}
              id="cod"
              name="paymentMethod"
              onChange={(e) => setPaymentMethod("COD")}
            ></Form.Check>
          </Col>
        </Form.Group>
        <Button type="submit" variant="primary" className="mt-3">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
}

export default PaymentScreen;
