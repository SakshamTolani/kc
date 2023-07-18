import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import CheckoutSteps from "../components/CheckoutSteps";
import FormContainer from "../components/FormContainer";
import { COUPON_RESET } from "../constants/orderConstants";
import { saveShippingAddress } from "../actions/cartActions";

function ShippingScreen({ history }) {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [pincodeData, setPincodeData] = useState(false);
  const [alternatePhone, setAlternatePhone] = useState(
    shippingAddress.alternatePhone
  );
  const dispatch = useDispatch();
  const [alternateEmail, setAlternateEmail] = useState(
    shippingAddress.alternateEmail
  );
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveShippingAddress({
        address,
        city,
        postalCode,
        alternatePhone,
        alternateEmail,
      })
    );
    dispatch({ type: COUPON_RESET });
    history.push("/payment");
  };

  const autoFillCity = (e) => {
    e.preventDefault();
    setPostalCode(e.target.value);
    if (e.target.value.length == 6) {
      setPincodeData(true);
      fetch(`https://api.postalpincode.in/pincode/${e.target.value}`, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((res) => {
          setPincodeData(false);
          setCity(
            res[0].PostOffice[0].Block + ", " + res[0].PostOffice[0].State
          );
        });
    }
  };
  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />
      <h1>Shipping</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="address">
          <Form.Label>Address*</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Enter Address"
            value={address ? address : ""}
            onChange={(e) => setAddress(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group className="mb-3" controlId="city">
          <Form.Label>City and State*</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Enter City and State"
            value={city ? city : ""}
            disabled={true}
            onChange={(e) => setCity(e.target.value)}
          ></Form.Control>
        </Form.Group>
        {pincodeData && <Loader />}
        <Form.Group className="mb-3" controlId="postalCode">
          <Form.Label>Pin Code*</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Enter Pin Code"
            value={postalCode ? postalCode : ""}
            onChange={autoFillCity}
          ></Form.Control>
        </Form.Group>
        <Form.Group className="mb-3" controlId="alternatePhone">
          <Form.Label>Alternate Phone Number*</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Enter Phone Number"
            value={alternatePhone ? alternatePhone : ""}
            onChange={(e) => setAlternatePhone(e.target.value)}
          />
          <Form.Text className="text-muted">
            Please enter any alternate number which can be used while delievery.
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="alternateEmail">
          <Form.Label>
            Email{" "}
            <strong style={{ color: "#000" }}>
              (You will recieve updates on this email regarding your order )*
            </strong>
          </Form.Label>
          <Form.Control
            required
            type="email"
            placeholder="Enter Email*"
            value={alternateEmail ? alternateEmail : ""}
            onChange={(e) => setAlternateEmail(e.target.value)}
          />
        </Form.Group>
        <Button type="submit" variant="primary">
          CONTINUE TO PAY
        </Button>
      </Form>
    </FormContainer>
  );
}

export default ShippingScreen;
