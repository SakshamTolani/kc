import React, { useState } from "react";
// import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { userComplaint } from "../actions/userActions";
import Loader from "./Loader";
import Message from "./Message";
// import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
// import KamsinMaps from "./KamsinMaps";
import { motion } from "framer-motion";
import {
  Container,
  Flex,
  Box,
  Heading,
  Text,
  IconButton,
  Button,
  VStack,
  HStack,
  Wrap,
  WrapItem,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Textarea,
  Link,
  useColorModeValue as mode,
  FormErrorMessage,
  Tooltip,
} from "@chakra-ui/react";
import {
  MdPhone,
  MdEmail,
  MdLocationOn,
  MdFacebook,
  MdOutlineEmail,
} from "react-icons/md";
import {
  BsGithub,
  BsDiscord,
  BsPerson,
  BsInstagram,
  BsPinterest,
  BsLinkedin,
} from "react-icons/bs";
function Support() {
  const userComplaintDetails = useSelector((state) => state.userComplaint);
  const { loading, success } = userComplaintDetails;
  const dispatch = useDispatch();
  const iframe =
    '<div class="mapouter"><div class="gmap_canvas"><iframe src="https://maps.google.com/maps?q=kamsin%20collection&t=&z=13&ie=UTF8&iwloc=&output=embed" width="600" height="450" frameborder="0" style="border:0;" allowfullscreen="" aria-hidden="false" tabindex="0"></iframe></div><style>.mapouter{position:relative;text-align:right;width:100%;height:300px;}.gmap_canvas {overflow:hidden;background:none!important;width:100%;height:300px;}.gmap_iframe {height:300px!important;}</style></div>';
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(userComplaint(compName, email, phone, comments));
    setCompName("");
    setEmail("");
    setPhone("");
    setComments("");
    setTimeout(() => {
      setShow(false);
    }, 10000);
  };
  function Iframe(props) {
    return (
      <div
        dangerouslySetInnerHTML={{ __html: props.iframe ? props.iframe : "" }}
      />
    );
  }

  const [compName, setCompName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [comments, setComments] = useState("");
  const [show, setShow] = useState(true);
  return (
    <motion.div
      initial={{ width: 0 }}
      animate={{ width: "100%" }}
      exit={{ x: window.innerWidth, transition: { duration: 0.1 } }}
    >
      <Heading
        style={{ textAlign: "center" }}
        color={mode("gray.600", "gray.200")}
      >
        Support
      </Heading>
      {show && success && (
        <Message variant="success">
          Thanks for showing interest in us, someone from our team will get in
          touch with you at the earliest!
        </Message>
      )}
      {loading && <Loader />}
      {/* <Container
        style={{
          fontWeight: "bold",
          fontSize: "1.5rem",
        }}
        className="mt-3"
      >
        <Row>
          <Col>
            <Row>We'd love to hear from you</Row>
            <Row
              style={{
                fontWeight: "initial",
                fontSize: "1rem",
                justifyContent: "space-between",
                padding: "10px",
              }}
            >
              <p>
                Have Queries? Fill out the form below to send us a message and
                we will try to resolve it at the earliest.
              </p>
            </Row>
            <Row>
              <Form onSubmit={submitHandler}>
                <Form.Group className="mb-4" controlId="fname">
                  <Form.Control
                    required
                    type="text"
                    placeholder="First Name*"
                    style={{ width: "auto" }}
                    value={fname}
                    onChange={(e) => setFname(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <Form.Group className="mb-4" controlId="lname">
                  <Form.Control
                    required
                    type="text"
                    placeholder="Last Name*"
                    value={lname}
                    onChange={(e) => setLname(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Form.Group className="mb-4" controlId="email">
                  <Form.Control
                    required
                    type="email"
                    placeholder="Email*"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <Form.Group className="mb-4" controlId="phone">
                  <Form.Control
                    required
                    type="tel"
                    placeholder="Phone Number*"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Form.Group className="mb-4" controlId="category">
                  <Form.Control
                    as="select"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option>Select a category*</option>
                    <option value="exchange">Exchange a product</option>
                    <option value="cancel">Order related queries</option>
                    <option value="other">Other</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group className="mb-4" controlId="orderNumber">
                  <Form.Control
                    required={category == "exchange" || category == "cancel"}
                    type="text"
                    placeholder="Order Number"
                    value={orderNumber}
                    onChange={(e) => setOrderNumber(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <Form.Group className="mb-4" controlId="comments">
                  <Form.Control
                    required
                    as="textarea"
                    rows="3"
                    col="5"
                    placeholder="Enter your comments*"
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <Button type="submit" className="bg-danger">
                  Submit
                </Button>
              </Form>
            </Row>
          </Col>
          <Col>
            <Row>Contact Us</Row>
            <Row>
              <Col>
                <Row className="mt-3" style={{ fontSize: "1rem" }}>
                  <Col>
                    <i className="fas fa-map-marker-alt"></i>{" "}
                    <a href="https://www.google.com/maps/place/Kamsin+Collection/@25.3075744,82.9966071,20z/data=!4m5!3m4!1s0x398e2e01d13b8773:0xb54ba0db6f95dd40!8m2!3d25.3076439!4d82.9965371">
                      <b>Kamsin Collection</b>, <br></br>
                      Shop No. 9-A, Gurudwara Gate, Gurubagh, Varanasi, Uttar
                      Pradesh-221010
                    </a>
                  </Col>
                </Row>
                <Row className="mt-3" style={{ fontSize: "1rem" }}>
                  <Col>
                    <i className="fas fa-phone"></i>
                    <a href="tel:+918882303716"> +918882303716</a>
                  </Col>
                </Row>
                <Row className="mt-3" style={{ fontSize: "1rem" }}>
                  <Col>
                    <i className="fa fa-whatsapp"></i>
                    <a href="https://api.whatsapp.com/send/?phone=%2B918882303716&text&app_absent=0">
                      {" "}
                      +918882303716
                    </a>
                  </Col>
                </Row>
                <Row className="mt-3" style={{ fontSize: "1rem" }}>
                  <Col>
                    <i className="fas fa-envelope"></i>{" "}
                    <a href="mailto: team@kamsincollection.in">
                      team@kamsincollection.in
                    </a>
                  </Col>
                </Row>
                <Row
                  className="mt-3"
                  style={{ fontSize: "1rem", color: "#000" }}
                >
                  <Col>
                    <i className="fas fa-clock"></i>{" "}
                    <span>Monday to Saturday(10:00 AM - 08:00 PM)</span>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row
              style={{
                fontWeight: "bold",
                fontSize: "1.5rem",
                marginTop: "2.5rem",
              }}
            >
              Follow Us{" "}
            </Row>
            <Row className="mt-3" style={{ fontSize: "1rem" }}>
              <Col>
                <a href="https://www.instagram.com/kamsincollection/">
                  <i
                    className="fab fa-instagram"
                    style={{ fontSize: "2.5rem" }}
                  ></i>{" "}
                  @kamsincollection
                </a>
              </Col>
            </Row>
            <Row className="mt-3" style={{ fontSize: "1rem" }}>
              <Col>
                <a href="https://www.linkedin.com/company/kamsin-collection/">
                  <i
                    className="fab fa-linkedin"
                    style={{ fontSize: "2.5rem" }}
                  ></i>{" "}
                  @kamsincollection
                </a>
              </Col>
            </Row>
            <Row className="mt-3" style={{ fontSize: "1rem" }}>
              <Col>
                <a href="https://www.facebook.com/kamsincollection">
                  <i
                    className="fab fa-facebook"
                    style={{ fontSize: "2.5rem" }}
                  ></i>{" "}
                  @KamsinCollection
                </a>
              </Col>
            </Row>
            <Row className="mt-3" style={{ fontSize: "1rem" }}>
              <Col>
                <a href="https://in.pinterest.com/kamsincollection">
                  <i
                    className="fab fa-pinterest"
                    style={{ fontSize: "2.5rem" }}
                  ></i>{" "}
                  @kamsincollection
                </a>
              </Col>
            </Row>
            <Row
              style={{
                fontWeight: "bold",
                fontSize: "1.5rem",
                marginTop: "2.5rem",
              }}
            >
              Location
            </Row>
            <Row>
              <Col style={{ width: 300, height: 300 }}>
                <KamsinMaps />
                <Iframe iframe={iframe} />
              </Col>
            </Row>
          </Col>
        </Row>
      </Container> */}
      <Container
        bg="#9DC4FB"
        maxW="full"
        mt={0}
        centerContent
        overflow="hidden"
      >
        <Flex>
          <Box
            bg="#02054B"
            color="white"
            borderRadius="lg"
            m={{ sm: 4, md: 16, lg: 10 }}
            p={{ sm: 5, md: 5, lg: 16 }}
          >
            <Box p={4}>
              <Wrap spacing={{ base: 20, sm: 3, md: 5, lg: 20 }}>
                <WrapItem>
                  <Box>
                    <Heading color="#fff">Contact</Heading>
                    <Text mt={{ sm: 3, md: 3, lg: 5 }} color="gray.500">
                      Fill up the form below to contact
                    </Text>
                    <Box py={{ base: 5, sm: 5, md: 8, lg: 10 }}>
                      <VStack pl={0} spacing={3} alignItems="flex-start">
                        <Button
                          right="2.5em"
                          size="md"
                          height="48px"
                          width="200px"
                          variant="ghost"
                          color="#DCE2FF"
                          _hover={{
                            border: "2px solid #1C6FEB",
                            w: "80%",
                            right: "0",
                            transition: "all 0.5s",
                          }}
                          leftIcon={<MdPhone color="#1970F1" size="20px" />}
                        >
                          +91-8882303716
                        </Button>
                        <Button
                          size="md"
                          height="48px"
                          width="200px"
                          variant="ghost"
                          color="#DCE2FF"
                          _hover={{
                            border: "2px solid #1C6FEB",
                            w: "90%",
                            transition: "all 0.5s",
                          }}
                          leftIcon={<MdEmail color="#1970F1" size="20px" />}
                        >
                          team@kamsincollection.in
                        </Button>
                        <Button
                          size="md"
                          height="48px"
                          width="200px"
                          variant="ghost"
                          color="#DCE2FF"
                          _hover={{
                            border: "2px solid #1C6FEB",
                            w: "90%",
                            transition: "all 0.5s",
                          }}
                          leftIcon={
                            <MdLocationOn color="#1970F1" size="20px" />
                          }
                        >
                          Sh-9-A,Gurubagh, Varanasi
                        </Button>
                      </VStack>
                    </Box>
                    <HStack
                      mt={{ lg: 10, md: 10 }}
                      spacing={5}
                      px={5}
                      alignItems="flex-start"
                    >
                      <Link
                        href="https://www.facebook.com/kamsincollection"
                        isExternal
                      >
                        <IconButton
                          aria-label="facebook"
                          variant="ghost"
                          size="lg"
                          isRound={true}
                          _hover={{ bg: "#0D74FF" }}
                          icon={<MdFacebook size="28px" />}
                        />
                      </Link>
                      <Link
                        href="https://www.instagram.com/kamsincollection/"
                        isExternal
                      >
                        <IconButton
                          aria-label="instagram"
                          variant="ghost"
                          size="lg"
                          isRound={true}
                          _hover={{ bg: "#0D74FF" }}
                          icon={<BsInstagram size="28px" />}
                        />
                      </Link>
                      <Link
                        href="https://in.pinterest.com/kamsincollection/"
                        isExternal
                      >
                        <IconButton
                          aria-label="pinterest"
                          variant="ghost"
                          size="lg"
                          isRound={true}
                          _hover={{ bg: "#0D74FF" }}
                          icon={<BsPinterest size="28px" />}
                        />
                      </Link>
                      <Link
                        href="https://www.linkedin.com/company/kamsin-collection/"
                        isExternal
                      >
                        <IconButton
                          aria-label="linkedin"
                          variant="ghost"
                          size="lg"
                          isRound={true}
                          _hover={{ bg: "#0D74FF" }}
                          icon={<BsLinkedin size="28px" />}
                        />
                      </Link>
                    </HStack>
                  </Box>
                </WrapItem>
                <WrapItem>
                  <Box bg="white" borderRadius="lg">
                    <Box m={8} color="#0B0E3F">
                      <VStack spacing={5}>
                        <FormControl
                          id="compName"
                          isInvalid={compName === ""}
                          isRequired
                        >
                          <FormLabel>Full Name</FormLabel>
                          <InputGroup borderColor="#E0E1E7">
                            <InputLeftElement
                              pointerEvents="none"
                              children={<BsPerson color="gray.800" />}
                            />
                            <Input
                              type="text"
                              size="md"
                              onChange={(e) => setCompName(e.target.value)}
                            />
                          </InputGroup>
                        </FormControl>
                        <FormControl
                          id="email"
                          isRequired
                          isInvalid={email === ""}
                        >
                          <FormLabel>Email</FormLabel>
                          <InputGroup borderColor="#E0E1E7">
                            <InputLeftElement
                              pointerEvents="none"
                              children={<MdOutlineEmail color="gray.800" />}
                            />
                            <Input
                              type="email"
                              size="md"
                              onChange={(e) => setEmail(e.target.value)}
                            />
                          </InputGroup>
                        </FormControl>
                        <FormControl
                          id="phone"
                          isRequired
                          isInvalid={phone === ""}
                        >
                          <FormLabel>Phone</FormLabel>
                          <InputGroup borderColor="#E0E1E7">
                            <InputLeftElement
                              pointerEvents="none"
                              children={<MdPhone color="gray.800" />}
                            />
                            <Input
                              type="tel"
                              size="md"
                              onChange={(e) => setPhone(e.target.value)}
                            />
                          </InputGroup>
                        </FormControl>
                        <FormControl
                          id="comments"
                          isRequired
                          isInvalid={comments === ""}
                        >
                          <FormLabel>Message</FormLabel>
                          <Textarea
                            borderColor="gray.300"
                            _hover={{
                              borderRadius: "gray.300",
                            }}
                            placeholder="message"
                            onChange={(e) => setComments(e.target.value)}
                          />
                        </FormControl>
                        <FormControl id="submit" float="right" isRequired>
                          <Button
                            variant="solid"
                            bg="#0D74FF"
                            color="white"
                            _hover={{}}
                            onClick={(e) => submitHandler(e)}
                            isDisabled={
                              compName === "" ||
                              email === "" ||
                              comments == "" ||
                              phone === ""
                            }
                          >
                            Send Message
                          </Button>
                        </FormControl>
                      </VStack>
                    </Box>
                  </Box>
                </WrapItem>
              </Wrap>
            </Box>
          </Box>
        </Flex>
      </Container>
    </motion.div>
  );
}

export default Support;
