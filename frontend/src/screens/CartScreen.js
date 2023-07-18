import {
  Box,
  Flex,
  Button,
  Heading,
  useColorModeValue as mode,
  Stack,
  Text,
  Link,
  CloseButton,
  Image,
  HStack,
  Select,
  Tooltip,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import {
  // Button,
  Card,
  Col,
  Form,
  // Image,
  ListGroup,
  Row,
} from "react-bootstrap";
import { MdArrowDropDown } from "react-icons/md";
import { FaArrowRight } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { addToCart, removeFromCart } from "../actions/cartActions";
import Message from "../components/Message";
import { BsFillTrashFill } from "react-icons/bs";
function CartScreen({ match, location, history }) {
  const productId = match.params.id;
  const qty = location.search ? Number(location.search.split("&")[0][5]) : 1;
  const size = location.search ? Number(location.search.split("&")[1][5]) : 5;

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty, size));
    }
  }, [dispatch, productId, qty, size]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };
  const checkoutHandler = () => {
    history.push("/login?redirect=shipping");
  };

  return (
    // <Row>
    //   <Col md={8}>
    //     <Heading size="lg" fontWeight={500} letterSpacing={5}>
    //       Shopping Cart
    //     </Heading>
    //     {cartItems.length === 0 ? (
    //       <Message variant="info">
    //         Your Cart is Empty <Link to="/">Go Back</Link>
    //       </Message>
    //     ) : (
    //       <ListGroup variant="flush">
    //         {cartItems.map((item) => (
    //           <ListGroup.Item key={item.product}>
    //             <Row>
    //               <Col md={2}>
    //                 <Image src={item.image_one} alt={item.name} fluid rounded />
    //               </Col>
    //               <Col md={3}>
    //                 <Link to={`/product/${item.product}`}>{item.name}</Link>
    //               </Col>
    //               <Col md={2}>Rs. {item.price}</Col>
    //               <Col md={1}>{item.size}UK</Col>
    //               <Col md={2}>
    //                 <Form.Control
    //                   as="select"
    //                   value={item.qty}
    //                   onChange={(e) =>
    //                     dispatch(
    //                       addToCart(
    //                         item.product,
    //                         Number(e.target.value),
    //                         item.size
    //                       )
    //                     )
    //                   }
    //                 >
    //                   {[...Array(item.countInStock).keys()].map((x) => (
    //                     <option key={x + 1} value={x + 1}>
    //                       {x + 1}
    //                     </option>
    //                   ))}
    //                 </Form.Control>
    //               </Col>
    //               <Col md={1}>
    //                 <Button
    //                   type="button"
    //                   variant="light"
    //                   onClick={() => removeFromCartHandler(item.product)}
    //                 >
    //                   <i className="fas fa-trash"></i>
    //                 </Button>
    //               </Col>
    //             </Row>
    //           </ListGroup.Item>
    //         ))}
    //       </ListGroup>
    //     )}
    //   </Col>
    //   <Col md={4}>
    //     <Card>
    //       <ListGroup variant="flush">
    //         <ListGroup.Item>
    //           <h2>
    //             Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
    //             items
    //           </h2>
    //           Rs.
    //           {cartItems
    //             .reduce((acc, item) => acc + item.qty * item.price, 0)
    //             .toFixed(2)}
    //         </ListGroup.Item>
    //         <ListGroup.Item>
    //           <Button
    //             type="button"
    //             className="btn-block"
    //             disabled={cartItems.length === 0}
    //             onClick={checkoutHandler}
    //           >
    //             {cartItems.length === 0
    //               ? "Cart is Empty"
    //               : "Proceed to Checkout"}
    //           </Button>
    //         </ListGroup.Item>
    //       </ListGroup>
    //     </Card>
    //   </Col>
    // </Row>
    <Box
      maxW={{ base: "3xl", lg: "7xl" }}
      mx="auto"
      px={{ base: "4", md: "8", lg: "12" }}
      py={{ base: "6", md: "8", lg: "12" }}
    >
      <Stack
        direction={{ base: "column", lg: "row" }}
        align={{ lg: "flex-start" }}
        spacing={{ base: "8", md: "16" }}
      >
        <Stack spacing={{ base: "8", md: "10" }} flex="2">
          <Heading
            fontSize="2xl"
            fontWeight="extrabold"
            color={mode("gray.800", "gray.200")}
          >
            Shopping Cart
          </Heading>
          {cartItems.length === 0 ? (
            <Message variant="info">Your Cart is Empty.</Message>
          ) : (
            <Stack spacing="6">
              {cartItems.map((item) => (
                <Flex
                  direction={{ base: "column", md: "row" }}
                  justify="space-between"
                  align="center"
                >
                  <Stack direction="row" spacing="5" width="full">
                    <Image
                      rounded="lg"
                      width="120px"
                      height="120px"
                      fit="cover"
                      src={item.image_one}
                      alt={item.name}
                      draggable="false"
                      loading="lazy"
                    />
                    <Box pt="4">
                      <Stack spacing="0.5">
                        <Link href={`/product/${item.product}`}>
                          <Text fontWeight="medium">{item.name}</Text>
                        </Link>
                        <Text
                          color={mode("gray.600", "gray.400")}
                          fontSize="sm"
                        >
                          {item.size} UK
                        </Text>
                      </Stack>
                    </Box>
                  </Stack>
                  <Flex
                    width="full"
                    justify="space-between"
                    display={{ base: "none", md: "flex" }}
                  >
                    <Select
                      maxW="64px"
                      // variant="unstyled"
                      aria-label="Select size"
                      // size="sm"
                      icon={<MdArrowDropDown />}
                      focusBorderColor={mode("blue.500", "blue.200")}
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Select>
                    <HStack spacing="1">
                      <Text
                        as="span"
                        fontWeight="medium"
                        color={mode("gray.700", "gray.400")}
                      >
                        &#8377; {item.price}
                      </Text>
                    </HStack>
                    <Tooltip label={`Delete ${item.name} from cart`}>
                      <Button
                        leftIcon={<BsFillTrashFill />}
                        aria-label={`Delete ${item.name} from cart`}
                        onClick={() => removeFromCartHandler(item.product)}
                      />
                    </Tooltip>
                  </Flex>
                  <Flex
                    mt="4"
                    align="center"
                    width="full"
                    justify="space-between"
                    display={{ base: "flex", md: "none" }}
                  >
                    <Link fontSize="sm" textDecor="underline">
                      Delete
                    </Link>

                    <Select
                      maxW="64px"
                      variant="unstyled"
                      aria-label="Select size"
                      size="sm"
                      icon={<MdArrowDropDown />}
                      focusBorderColor={mode("blue.500", "blue.200")}
                    >
                      {item.sizes.split(",").map((it) => (
                        <option value={it} style={{ width: "100%" }}>
                          {it}
                        </option>
                      ))}
                    </Select>
                    <HStack spacing="1">
                      <Text
                        as="span"
                        fontWeight="medium"
                        color={mode("gray.700", "gray.400")}
                      >
                        &#8377; {item.price}
                      </Text>
                    </HStack>
                  </Flex>
                </Flex>
              ))}
            </Stack>
          )}
        </Stack>
        <Flex direction="column" align="center" flex="1">
          <Stack
            spacing="8"
            borderWidth="1px"
            rounded="lg"
            padding="8"
            width="full"
          >
            <Heading size="md" color={mode("gray.600", "gray.200")}>
              Subtotal {cartItems.reduce((acc, item) => acc + item.qty, 0)}{" "}
              item(s)
            </Heading>
            <Flex
              justify="space-between"
              fontSize="sm"
              color={mode("gray.600", "gray.200")}
            >
              <Text fontWeight="medium">Subtotal</Text>
              <Text fontWeight="medium">
                &#8377;
                {cartItems
                  .reduce((acc, item) => acc + item.qty * item.price, 0)
                  .toFixed(2)}
              </Text>
            </Flex>
            <Button
              colorScheme="blue"
              size="lg"
              fontSize="md"
              disabled={cartItems.length === 0}
              onClick={checkoutHandler}
              rightIcon={<FaArrowRight />}
            >
              Checkout
            </Button>
          </Stack>
          <HStack mt="6" fontWeight="semibold">
            <p>or</p>
            <Link href="/" color={mode("blue.500", "blue.200")}>
              Continue shopping
            </Link>
          </HStack>
        </Flex>
      </Stack>
    </Box>
  );
}

export default CartScreen;
