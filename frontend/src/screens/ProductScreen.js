import React, { useEffect, useRef, useState } from "react";
import {
  Col,
  ListGroup,
  Row,
  Form,
  Card,
  Accordion,
  useAccordionButton,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  listProductDetails,
  createProductReview,
} from "../actions/productActions";
import Rating from "../components/Rating";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { PRODUCT_CREATE_REVIEW_RESET } from "../constants/productConstants";
import ImageCarousel from "../components/ImageCarousel";
import SizeChart from "../components/SizeChart";
import MultiSelect from "react-multiple-select-dropdown-lite";
import "react-multiple-select-dropdown-lite/dist/index.css";
import { motion } from "framer-motion";
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  PinterestIcon,
  PinterestShareButton,
  WeiboShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";
import {
  Box,
  Container,
  Button,
  Flex,
  Modal,
  Link,
  Heading,
  HStack,
  Stack,
  Text,
  Image,
  useColorModeValue as mode,
  FormControl,
  FormLabel,
  useNumberInput,
  Input,
  Tooltip,
  ListItem,
  List,
  ModalHeader,
  useDisclosure,
  ModalOverlay,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  ModalContent,
  VStack,
  Divider,
  Popover,
  Icon,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  PopoverTrigger,
  useToast,
  SimpleGrid,
  Grid,
  GridItem,
  Textarea,
} from "@chakra-ui/react";
import { RepeatIcon, QuestionIcon, CopyIcon } from "@chakra-ui/icons";
import { RiRulerFill } from "react-icons/ri";
import { HiCurrencyRupee } from "react-icons/hi";
import { MdCancel, MdLocalShipping } from "react-icons/md";
import { BsStarFill } from "react-icons/bs";
import ReactStars from "react-rating-stars-component";

// function CustomToggle({ children, eventKey }) {
//   const decoratedOnClick = useAccordionButton(eventKey, () =>
//     console.log("totally custom!")
//   );

//   return (
//     <button
//       type="button"
//       style={{ color: "black", width: "100%", border: "none" }}
//       onClick={decoratedOnClick}
//     >
//       <h4>
//         {children} <i className="fas fa-plus"></i>
//       </h4>
//     </button>
//   );
// }

function CustomToggle({ children, eventKey, handleClick }) {
  const decoratedOnClick = useAccordionButton(eventKey, () => {
    handleClick();
  });

  return (
    <button className="card-header" type="button" onClick={decoratedOnClick}>
      <h4>{children}</h4>
    </button>
  );
}
function ProductScreen({ match, history }) {
  const values = [true];
  const [fullscreen, setFullscreen] = useState(true);
  const [show, setShow] = useState(false);
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [activeKey, setActiveKey] = useState(0);
  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;
  const [showSize, setShowSize] = useState(false);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const toast = useToast();
  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const {
    loading: loadingProductReview,
    error: errorProductReview,
    success: successProductReview,
  } = productReviewCreate;
  const initialRef = useRef(null);

  useEffect(() => {
    if (successProductReview) {
      setRating(0);
      setComment("");
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }

    dispatch(listProductDetails(match.params.id));
  }, [dispatch, match, successProductReview]);

  const addToCartHandler = () => {
    if (size) {
      history.push(
        `/cart/${match.params.id}?qty=${qty}&size=${size.split(" ")[0]}`
      );
    } else {
      toast({
        title: "Please choose Size",
        description: "",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  const { isOpen, onOpen, onClose } = useDisclosure();

  const { isOpenSmall, onOpenSmall, onCloseSmall } = useDisclosure();
  const {
    isOpen: isOpenReview,
    onOpen: onOpenReview,
    onClose: onCloseReview,
  } = useDisclosure();
  const {
    isOpen: isOpenReviewSmall,
    onOpen: onOpenReviewSmall,
    onClose: onCloseReviewSmall,
  } = useDisclosure();

  const [sliderValue, setSliderValue] = useState(0);

  const labelStyles = {
    mt: "2",
    ml: "-2.5",
    fontSize: "sm",
  };

  // const options = [];
  // if (product.sizes) {
  //   product.sizes.split(",").map((s) => options.push({ label: s, size: s }));
  // }
  // const handleOnchange = (val) => {
  //   setSize(val);
  // };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createProductReview(match.params.id, {
        rating,
        comment,
      })
    );
    onCloseReview();
  };
  const submitHandlerSmall = (e) => {
    e.preventDefault();
    dispatch(
      createProductReview(match.params.id, {
        rating,
        comment,
      })
    );
    onCloseReviewSmall();
  };

  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
    useNumberInput({
      step: 1,
      defaultValue: 1,
      min: 1,
      max: 1,
    });

  const inc = getIncrementButtonProps();
  const dec = getDecrementButtonProps();
  const input = getInputProps();

  return (
    <motion.div
      initial={{ width: 0 }}
      animate={{ width: "100%" }}
      exit={{ x: window.innerWidth, transition: { duration: 0.1 } }}
    >
      <a onClick={() => history.goBack()} className="btn btn-light my-3">
        <i className="fas fa-arrow-left mr-1"></i>
        GO BACK
      </a>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Stack>
          // --------------------------------------DESKTOP PRODUCT
          SCREEN------------------------------------------------
          <Flex
            m={3}
            p={3}
            gap={5}
            direction={"row"}
            display={{
              base: "none",
              md: "none",
              lg: "flex",
              xl: "flex",
            }}
            border={"1px solid #999"}
            borderRadius={"8px"}
          >
            <Grid
              // templateRows="repeat(2, 1fr)"
              templateColumns="repeat(5, 1fr)"
              gap={1}
            >
              <GridItem colSpan={3}>
                <Box w={"60%"}>
                  <ImageCarousel
                    image_one={product.image_one}
                    image_two={product.image_two}
                    isDesktop={true}
                  />
                </Box>
              </GridItem>
              <GridItem colSpan={2}>
                <Box>
                  <Stack spacing={{ base: 3, md: 5 }}>
                    <Box>
                      <Rating
                        rating={product.rating}
                        numReviews={product.numReviews}
                        boxSize={"lg"}
                      />
                    </Box>
                    <Box as={"header"}>
                      <Heading
                        lineHeight={1.1}
                        fontWeight={400}
                        fontFamily={"Raleway"}
                        fontSize={{ base: "xl", sm: "2xl", lg: "3xl" }}
                      >
                        {product.name}
                      </Heading>
                      <HStack>
                        <Text
                          color={mode("gray.400", "gray.100")}
                          fontWeight={150}
                          fontFamily={"Raleway"}
                          fontSize={"2xl"}
                          textDecoration={"line-through"}
                        >
                          &#8377;{product.lastPrice}
                        </Text>
                        <Text
                          color={mode("gray.900", "gray.400")}
                          fontWeight={200}
                          fontFamily={"Raleway"}
                          fontSize={"3xl"}
                        >
                          &#8377;{product.price}
                        </Text>
                      </HStack>
                    </Box>
                    <Box>
                      <FormControl fontSize={"md"} isRequired>
                        <FormLabel fontWeight={600}> Size: {size}</FormLabel>
                        <HStack mt={2}>
                          {product.sizes &&
                            product.sizes
                              .split(",")
                              .sort()
                              .map((s, index) => (
                                <Button
                                  key={index}
                                  size={"sm"}
                                  variant="ghost"
                                  // border={"2px solid #888"}
                                  background={"#eee"}
                                  value={s}
                                  _hover={{
                                    background: "#ebf8ff",
                                    border: "2px solid #ccc",
                                  }}
                                  _focus={{
                                    color: "#555",
                                    background: "red.200",
                                    border: "1px solid #222",
                                  }}
                                  onClick={(e) => setSize(e.target.value)}
                                >
                                  {s.split(" ")[0]}{" "}
                                </Button>
                              ))}
                        </HStack>
                      </FormControl>
                      <>
                        <Button
                          onClick={onOpen}
                          size="sm"
                          textDecoration={"underline"}
                          variant="link"
                          border={"none"}
                          colorScheme={"black"}
                          leftIcon={<RiRulerFill />}
                          mt={2}
                        >
                          View our sizing guide
                        </Button>

                        <Modal isOpen={isOpen} onClose={onClose} size={"3xl"}>
                          <ModalOverlay />
                          <ModalContent>
                            <ModalHeader>
                              <HStack>
                                <Image
                                  src={product.image_one}
                                  width={"120px"}
                                  alt={product.name}
                                  boxSize="150px"
                                />
                                <VStack fontFamily={"Raleway"}>
                                  <Text as={"header"}>{product.name}</Text>
                                  <Text fontWeight={500}>
                                    &#8377;{product.price}
                                  </Text>
                                  <Text
                                    fontWeight={200}
                                    fontSize="sm"
                                    color="limegreen"
                                  >
                                    inclusive of all taxes
                                  </Text>
                                </VStack>
                                {product.category === "ladies" && (
                                  <VStack>
                                    <Text
                                      fontWeight={200}
                                      fontSize={"md"}
                                      color="red.500"
                                    >
                                      Size S : 0-5 years
                                    </Text>
                                    <Text
                                      fontWeight={200}
                                      fontSize={"md"}
                                      color="red.500"
                                    >
                                      Size L : 6-12 years
                                    </Text>
                                  </VStack>
                                )}
                              </HStack>
                            </ModalHeader>
                            <ModalCloseButton />
                            <Divider />
                            <ModalBody>
                              <SizeChart
                                category={product.category}
                                rootProps={{ m: "0" }}
                              />
                            </ModalBody>

                            <ModalFooter>
                              <Button
                                colorScheme="blue"
                                mr={3}
                                onClick={onClose}
                              >
                                Close
                              </Button>
                            </ModalFooter>
                          </ModalContent>
                        </Modal>
                      </>
                      {/* <>
                    <Button
                      leftIcon={<RiRulerFill />}
                      border="none"
                      textDecoration="underline"
                      background="none"
                      color="#000"
                      borderColor="#000"
                      onClick={onOpen}
                    >
                      View our sizing guide
                    </Button>
                    <Modal isOpen={isOpen} onClose={onClose}>
                      <ModalHeader>Size Chart</ModalHeader>
                      <ModalOverlay />
                      <ModalBody>
                        <Row>
                          <Col xl={6} md={6}>
                            <Image
                              src={product.image_one}
                              alt={product.name}
                              fluid
                              rounded
                            />
                          </Col>
                          <Col
                            style={{
                              fontWeight: "bolder",
                              color: "#000",
                              marginTop: "80px",
                            }}
                          >
                            <Row>
                              <h4>{product.name}</h4>
                            </Row>
                            <Row>
                              <h4>Rs. {product.price}</h4>
                            </Row>
                            <Row style={{ color: "limegreen" }}>
                              inclusive of all taxes
                            </Row>
                            <Row
                              style={{
                                color: "#f94040",
                                display: product.category == "ladies" && "none",
                              }}
                            >
                              Size S : 0-5 years
                            </Row>
                            <Row
                              style={{
                                color: "#f94040",
                                display: product.category == "ladies" && "none",
                              }}
                            >
                              Size L : 6-12 years
                            </Row>
                          </Col>
                        </Row>
                        <SizeChart category={product.category} />
                        <Image
                          width="300px"
                          src="https://kamsincollection.s3.ap-south-1.amazonaws.com/step-3-14202755-720.jpg"
                        />
                      </ModalBody>
                      <ModalFooter>
                        <Button variant="primary" onClick={onClose}>
                          Close
                        </Button>
                      </ModalFooter>
                    </Modal>
                  </> */}
                    </Box>
                    <Box>
                      <HStack>
                        <FormControl>
                          <FormLabel fontWeight={600}>Quantity: </FormLabel>
                          <HStack
                            maxW="160px"
                            h="50px"
                            border={"2px solid #999"}
                            borderRadius={"8px"}
                            spacing={4}
                          >
                            <Box>
                              <Button
                                {...dec}
                                colorScheme="telegram"
                                size="sm"
                                m={1}
                              >
                                -
                              </Button>
                            </Box>
                            <Box>
                              <Input {...input} border="none" />
                            </Box>
                            <Box>
                              <Tooltip label="We're sorry but we're restricted with one quantity per customer for this product.">
                                <Button
                                  {...inc}
                                  colorScheme="telegram"
                                  size="sm"
                                  m={1}
                                >
                                  +
                                </Button>
                              </Tooltip>
                            </Box>
                          </HStack>
                        </FormControl>
                        <FormControl>
                          <FormLabel fontWeight={600}>Share: </FormLabel>
                          <HStack
                            maxW="160px"
                            h="50px"
                            borderRadius={"8px"}
                            spacing={2}
                          >
                            <EmailShareButton
                              onClick={() => {
                                navigator.clipboard.writeText(
                                  window.location.href
                                );
                                toast({
                                  title: "Link Copied Successfully!",
                                  description: "",
                                  status: "success",
                                  duration: 9000,
                                  isClosable: true,
                                });
                              }}
                            >
                              <CopyIcon width={6} height={6} />
                            </EmailShareButton>
                            <FacebookShareButton
                              url={window.location.href}
                              title={`Hey, Check out this awesome product ${product.name} which I found on Kamsin Collection!`}
                            >
                              <FacebookIcon size={"2rem"} round />
                            </FacebookShareButton>
                            <EmailShareButton
                              subject="Check  this out"
                              body={`Hey, Check out this awesome product ${product.name} which I found on Kamsin Collection!`}
                              url={window.location.href}
                            >
                              <EmailIcon size={"2rem"} round />
                            </EmailShareButton>
                            <WhatsappShareButton
                              url={window.location.href}
                              title={`Hey, Check out this awesome product "${product.name}" which I found on Kamsin Collection!`}
                            >
                              <WhatsappIcon size={"2rem"} round />
                            </WhatsappShareButton>
                            <PinterestShareButton
                              url={window.location.href}
                              title={`Hey, Check out this awesome product ${product.name} which I found on Kamsin Collection!`}
                              media={product.image_one}
                            >
                              <PinterestIcon size={"2rem"} round />
                            </PinterestShareButton>
                          </HStack>
                        </FormControl>
                      </HStack>
                    </Box>
                    <Box>
                      <Button
                        w={"full"}
                        mt={4}
                        size={"lg"}
                        py={"7"}
                        bg={mode("gray.900", "gray.50")}
                        color={mode("white", "gray.900")}
                        textTransform={"uppercase"}
                        _hover={{
                          transform: "translateY(2px)",
                          boxShadow: "lg",
                        }}
                        onClick={addToCartHandler}
                      >
                        Add to cart
                      </Button>
                    </Box>
                    <Box>
                      <Text
                        fontSize={{ base: "16px", lg: "18px" }}
                        color={mode("yellow.500", "yellow.300")}
                        fontWeight={"500"}
                        textTransform={"uppercase"}
                        mb={"4"}
                      >
                        Services
                      </Text>
                      <List spacing={0}>
                        <ListItem>
                          <Icon as={RepeatIcon} m={2} w={5} h={5} />
                          <Text as={"span"} fontWeight={"bold"}>
                            7 Days Exchange Policy{" "}
                            <Popover>
                              <PopoverTrigger>
                                {/* <Button
                            variant={"unstyled"}
                            mb={1}
                            _active={{
                              border: "none",
                            }}
                          >
                            <Icon as={QuestionIcon} />
                          </Button> */}
                                <QuestionIcon
                                  as="button"
                                  m={1}
                                  w={4}
                                  h={4}
                                  _hover={{
                                    cursor: "pointer",
                                  }}
                                />
                              </PopoverTrigger>
                              <PopoverContent>
                                <PopoverArrow />
                                <PopoverCloseButton />
                                <PopoverHeader>Exchange Policy</PopoverHeader>
                                <PopoverBody>
                                  Goods to be exchanged must be unused and in
                                  the same condition, with original packaging,
                                  it shouldn't be a sale item and should be
                                  exchanged within 7 days of delivery. It can be
                                  exchanged only if there is some defect or
                                  damage in the item OR there is some issue
                                  regarding the size of the item purchased. You
                                  must through any modes of communication in{" "}
                                  <Link color="#38B2AC" href="/support">
                                    Contact Us
                                  </Link>{" "}
                                  page.
                                </PopoverBody>
                              </PopoverContent>
                            </Popover>
                          </Text>
                        </ListItem>
                        <ListItem>
                          <Icon as={HiCurrencyRupee} m={2} w={5} h={5} />
                          <Text as={"span"} fontWeight={"bold"}>
                            Cash on Delivery Available{" "}
                            <Popover>
                              <PopoverTrigger>
                                <QuestionIcon
                                  as="button"
                                  m={1}
                                  w={4}
                                  h={4}
                                  _hover={{
                                    cursor: "pointer",
                                  }}
                                />
                              </PopoverTrigger>
                              <PopoverContent>
                                <PopoverArrow />
                                <PopoverCloseButton />
                                <PopoverHeader>COD Available</PopoverHeader>
                                <PopoverBody>
                                  Cash on Delivery is available for this item.
                                  Other payment modes are also available which
                                  can be seen at the checkout page.
                                </PopoverBody>
                              </PopoverContent>
                            </Popover>
                          </Text>
                        </ListItem>
                        <ListItem>
                          <Icon as={MdCancel} m={2} w={5} h={5} />
                          <Text as={"span"} fontWeight={"bold"}>
                            Upto 12 hours cancellation
                            <Popover>
                              <PopoverTrigger>
                                <QuestionIcon
                                  as="button"
                                  m={1}
                                  w={4}
                                  h={4}
                                  _hover={{
                                    cursor: "pointer",
                                  }}
                                />
                              </PopoverTrigger>
                              <PopoverContent>
                                <PopoverArrow />
                                <PopoverCloseButton />
                                <PopoverHeader>
                                  Cancellation Available
                                </PopoverHeader>
                                <PopoverBody>
                                  Order can be cancelled within 12 hours of
                                  placing the order. Order can be cancelled from{" "}
                                  <Link color="#38B2AC" href="/profile">
                                    My Orders
                                  </Link>{" "}
                                  page
                                </PopoverBody>
                              </PopoverContent>
                            </Popover>
                          </Text>
                        </ListItem>
                        <ListItem>
                          <Icon as={MdLocalShipping} m={2} w={5} h={5} />
                          <Text as={"span"} fontWeight={"bold"}>
                            Quick Delivery Available{" "}
                            <Popover>
                              <PopoverTrigger>
                                <QuestionIcon
                                  as="button"
                                  m={1}
                                  w={4}
                                  h={4}
                                  _hover={{
                                    cursor: "pointer",
                                  }}
                                />
                              </PopoverTrigger>
                              <PopoverContent>
                                <PopoverArrow />
                                <PopoverCloseButton />
                                <PopoverHeader>Delivery Policy</PopoverHeader>
                                <PopoverBody>
                                  We deliver to the address provided by the
                                  customer as fast as possible for both COD
                                  &amp; prepaid orders whereas in rare cases
                                  there may be a slight delay in transit and you
                                  will be informed of revised Delivery Timelines
                                  in such cases.
                                </PopoverBody>
                              </PopoverContent>
                            </Popover>
                          </Text>
                        </ListItem>
                      </List>
                    </Box>
                    <Divider />
                    <Box>
                      <Text
                        fontSize={{ base: "16px", lg: "18px" }}
                        color={mode("yellow.500", "yellow.300")}
                        fontWeight={"500"}
                        textTransform={"uppercase"}
                        mb={"4"}
                      >
                        Product Details
                      </Text>

                      <List spacing={2}>
                        <ListItem>
                          <Text as={"span"} fontWeight={"bold"}>
                            Type:
                          </Text>{" "}
                          {product.productType}
                        </ListItem>
                        <ListItem>
                          <Text as={"span"} fontWeight={"bold"}>
                            Colour:
                          </Text>{" "}
                          {product.productColour}
                        </ListItem>
                        <ListItem>
                          <Text as={"span"} fontWeight={"bold"}>
                            Occasion:
                          </Text>{" "}
                          {product.productOccasion}
                        </ListItem>
                        <ListItem>
                          <Text as={"span"} fontWeight={"bold"}>
                            Heel Type:
                          </Text>{" "}
                          {product.productHeel}
                        </ListItem>
                        <ListItem>
                          <Text as={"span"} fontWeight={"bold"}>
                            Upper Material:
                          </Text>{" "}
                          {product.productUMaterial}
                        </ListItem>
                      </List>
                    </Box>
                  </Stack>
                </Box>
              </GridItem>
              <GridItem colStart={1} colEnd={5}>
                <Divider orientation="horizontal" />
                <Flex>
                  <Box p="4" w={"97%"}>
                    <Text as={"header"} fontSize={"2xl"} fontWeight={600}>
                      Customer Reviews
                    </Text>
                    <HStack spacing={3}>
                      <Text
                        as={"header"}
                        fontSize={"6xl"}
                        fontWeight={600}
                        mt={1}
                      >
                        {Number(product.rating).toFixed(1)}
                      </Text>
                      <VStack spacing={2} align="baseline" mt={1}>
                        <Rating
                          rating={product.rating}
                          numReviews={product.numReviews}
                          rootProps={{
                            display: "none",
                          }}
                        />
                        {Number(product.numReviews) > 0 ? (
                          <Text color={"gray.500"} fontSize={"xl"}>
                            Based on {product.numReviews} reviews
                          </Text>
                        ) : (
                          <Text>No reviews yet</Text>
                        )}
                      </VStack>
                    </HStack>
                  </Box>
                  <Box p="12" w={"3%"}>
                    <Button
                      colorScheme={"linkedin"}
                      onClick={onOpenReview}
                      disabled={loadingProductReview}
                    >
                      Write a Review {loadingProductReview && <Loader />}
                    </Button>
                    {successProductReview &&
                      toast({
                        title: "Reviewed Successfully!",
                        description: "",
                        status: "success",
                        duration: 9000,
                        isClosable: true,
                      })}

                    {userInfo && !errorProductReview ? (
                      <Modal
                        isOpen={isOpenReview}
                        onClose={onCloseReview}
                        initialFocusRef={initialRef}
                        size={"xl"}
                      >
                        <ModalOverlay />
                        <ModalContent>
                          <ModalHeader>Review &amp; Rating</ModalHeader>
                          <ModalCloseButton />
                          <ModalBody pb={6} m={5}>
                            <FormControl isRequired>
                              <FormLabel>
                                Choose a rating for this product:{" "}
                              </FormLabel>
                              <Box>
                                <ReactStars
                                  count={5}
                                  value={rating}
                                  onChange={(e) => setRating(e)}
                                  size={24}
                                  activeColor="#ffd700"
                                />
                              </Box>
                            </FormControl>

                            <FormControl mt={4}>
                              <FormLabel>Comment/Review</FormLabel>
                              <Textarea
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                placeholder=""
                                size="sm"
                              />
                            </FormControl>
                          </ModalBody>

                          <ModalFooter>
                            <Button
                              colorScheme="blue"
                              mr={3}
                              onClick={submitHandler}
                              disabled={loadingProductReview}
                            >
                              Save
                            </Button>
                            <Button onClick={onCloseReview}>Cancel</Button>
                          </ModalFooter>
                        </ModalContent>
                      </Modal>
                    ) : userInfo && errorProductReview ? (
                      <Modal
                        isOpen={isOpenReview}
                        onClose={onCloseReview}
                        isCentered
                      >
                        <ModalOverlay />
                        <ModalContent>
                          <ModalHeader>Error Occured!</ModalHeader>
                          <ModalCloseButton />
                          <ModalBody>{errorProductReview}</ModalBody>

                          <ModalFooter>
                            <Button
                              mr={3}
                              onClick={onCloseReview}
                              colorScheme="linkedin"
                            >
                              Close
                            </Button>
                          </ModalFooter>
                        </ModalContent>
                      </Modal>
                    ) : (
                      <Modal
                        isOpen={isOpenReview}
                        onClose={onCloseReview}
                        isCentered
                      >
                        <ModalOverlay />
                        <ModalContent>
                          <ModalHeader>Not a customer</ModalHeader>
                          <ModalCloseButton />
                          <ModalBody>Please login to write a review!</ModalBody>

                          <ModalFooter>
                            <Button
                              mr={3}
                              onClick={onCloseReview}
                              variant="ghost"
                            >
                              Close
                            </Button>
                            <Button
                              colorScheme="linkedin"
                              onClick={() => history.push("/login")}
                            >
                              Login
                            </Button>
                          </ModalFooter>
                        </ModalContent>
                      </Modal>
                    )}
                  </Box>
                </Flex>
                <SimpleGrid columns={3} spacing={10} m={2}>
                  {product.reviews.map((review) => (
                    <Box h={"120px"} key={review._id}>
                      <HStack spacing={5} m={2}>
                        <Rating
                          rating={review.rating}
                          rootProps={{ display: "none" }}
                        />
                        <Text fontSize={"xl"} fontWeight={600}>
                          {review.comment}
                        </Text>
                      </HStack>
                      <Text m={2}>
                        by {review.name}, {review.createdAt.split("T")[0]}
                      </Text>
                    </Box>
                  ))}
                </SimpleGrid>
              </GridItem>
            </Grid>
          </Flex>
          // -----------------------------------------MOBILE PRODUCT
          SCREEN-----------------------------------------------
          <Flex
            m={3}
            p={3}
            gap={5}
            direction={"row"}
            display={{
              base: "flex",
              md: "block",
              lg: "none",
              xl: "none",
            }}
            border={"1px solid #999"}
            borderRadius={"8px"}
          >
            <Grid templateColumns="repeat(5, 1fr)" gap={1}>
              <GridItem colSpan={5}>
                <Box w={"full"}>
                  <ImageCarousel
                    image_one={product.image_one}
                    image_two={product.image_two}
                    isDesktop={false}
                  />
                </Box>
              </GridItem>
              <GridItem colSpan={5}>
                <Box>
                  <Stack spacing={{ base: 3, md: 5 }}>
                    <Box>
                      <Rating
                        rating={product.rating}
                        numReviews={product.numReviews}
                        boxSize={"lg"}
                      />
                    </Box>
                    <Box as={"header"}>
                      <Heading
                        lineHeight={1.1}
                        fontWeight={400}
                        fontFamily={"Raleway"}
                        fontSize={{ base: "xl", sm: "2xl", lg: "3xl" }}
                      >
                        {product.name}
                      </Heading>
                      <HStack>
                        <Text
                          color={mode("gray.400", "gray.100")}
                          fontWeight={150}
                          fontFamily={"Raleway"}
                          fontSize={"2xl"}
                          textDecoration={"line-through"}
                        >
                          &#8377;{product.lastPrice}
                        </Text>
                        <Text
                          color={mode("gray.900", "gray.400")}
                          fontWeight={200}
                          fontFamily={"Raleway"}
                          fontSize={"3xl"}
                        >
                          &#8377;{product.price}
                        </Text>
                      </HStack>
                    </Box>
                    <Box>
                      <FormControl fontSize={"md"} isRequired>
                        <FormLabel fontWeight={600}> Size: {size}</FormLabel>
                        <HStack mt={2}>
                          {product.sizes &&
                            product.sizes
                              .split(",")
                              .sort()
                              .map((s, index) => (
                                <Button
                                  key={index}
                                  size={"sm"}
                                  variant="ghost"
                                  background={"#eee"}
                                  value={s}
                                  _hover={{
                                    background: "#ebf8ff",
                                    border: "2px solid #ccc",
                                  }}
                                  _focus={{
                                    color: "#555",
                                    background: "red.200",
                                    border: "1px solid #222",
                                  }}
                                  onClick={(e) => setSize(e.target.value)}
                                >
                                  {s.split(" ")[0]}{" "}
                                </Button>
                              ))}
                        </HStack>
                      </FormControl>
                      <>
                        <Button
                          onClick={onOpen}
                          size="sm"
                          textDecoration={"underline"}
                          variant="link"
                          border={"none"}
                          colorScheme={"black"}
                          leftIcon={<RiRulerFill />}
                          mt={2}
                        >
                          View our sizing guide
                        </Button>

                        <Modal
                          isOpen={isOpenSmall}
                          onClose={onCloseSmall}
                          size={"sm"}
                        >
                          <ModalOverlay />
                          <ModalContent>
                            <ModalHeader>
                              <HStack>
                                <Image
                                  src={product.image_one}
                                  width={"120px"}
                                  alt={product.name}
                                  boxSize="150px"
                                />
                                <VStack fontFamily={"Raleway"}>
                                  <Text as={"header"}>{product.name}</Text>
                                  <Text fontWeight={500}>
                                    &#8377;{product.price}
                                  </Text>
                                  <Text
                                    fontWeight={200}
                                    fontSize="sm"
                                    color="limegreen"
                                  >
                                    inclusive of all taxes
                                  </Text>
                                </VStack>
                                {product.category === "ladies" && (
                                  <VStack>
                                    <Text
                                      fontWeight={200}
                                      fontSize={"md"}
                                      color="red.500"
                                    >
                                      Size S : 0-5 years
                                    </Text>
                                    <Text
                                      fontWeight={200}
                                      fontSize={"md"}
                                      color="red.500"
                                    >
                                      Size L : 6-12 years
                                    </Text>
                                  </VStack>
                                )}
                              </HStack>
                            </ModalHeader>
                            <ModalCloseButton />
                            <Divider />
                            <ModalBody>
                              <SizeChart category={product.category} />
                            </ModalBody>

                            <ModalFooter>
                              <Button
                                colorScheme="blue"
                                mr={3}
                                onClick={onCloseSmall}
                              >
                                Close
                              </Button>
                            </ModalFooter>
                          </ModalContent>
                        </Modal>
                      </>
                      {/* <>
                    <Button
                      leftIcon={<RiRulerFill />}
                      border="none"
                      textDecoration="underline"
                      background="none"
                      color="#000"
                      borderColor="#000"
                      onClick={onOpen}
                    >
                      View our sizing guide
                    </Button>
                    <Modal isOpen={isOpen} onClose={onClose}>
                      <ModalHeader>Size Chart</ModalHeader>
                      <ModalOverlay />
                      <ModalBody>
                        <Row>
                          <Col xl={6} md={6}>
                            <Image
                              src={product.image_one}
                              alt={product.name}
                              fluid
                              rounded
                            />
                          </Col>
                          <Col
                            style={{
                              fontWeight: "bolder",
                              color: "#000",
                              marginTop: "80px",
                            }}
                          >
                            <Row>
                              <h4>{product.name}</h4>
                            </Row>
                            <Row>
                              <h4>Rs. {product.price}</h4>
                            </Row>
                            <Row style={{ color: "limegreen" }}>
                              inclusive of all taxes
                            </Row>
                            <Row
                              style={{
                                color: "#f94040",
                                display: product.category == "ladies" && "none",
                              }}
                            >
                              Size S : 0-5 years
                            </Row>
                            <Row
                              style={{
                                color: "#f94040",
                                display: product.category == "ladies" && "none",
                              }}
                            >
                              Size L : 6-12 years
                            </Row>
                          </Col>
                        </Row>
                        <SizeChart category={product.category} />
                        <Image
                          width="300px"
                          src="https://kamsincollection.s3.ap-south-1.amazonaws.com/step-3-14202755-720.jpg"
                        />
                      </ModalBody>
                      <ModalFooter>
                        <Button variant="primary" onClick={onClose}>
                          Close
                        </Button>
                      </ModalFooter>
                    </Modal>
                  </> */}
                    </Box>
                    <Box>
                      <HStack>
                        <FormControl>
                          <FormLabel fontWeight={600}>Quantity: </FormLabel>
                          <HStack
                            maxW="160px"
                            h="50px"
                            border={"2px solid #999"}
                            borderRadius={"8px"}
                            spacing={4}
                          >
                            <Box>
                              <Button
                                {...dec}
                                colorScheme="telegram"
                                size="sm"
                                m={1}
                              >
                                -
                              </Button>
                            </Box>
                            <Box>
                              <Input {...input} border="none" />
                            </Box>
                            <Box>
                              <Tooltip label="We're sorry but we're restricted with one quantity per customer for this product.">
                                <Button
                                  {...inc}
                                  colorScheme="telegram"
                                  size="sm"
                                  m={1}
                                >
                                  +
                                </Button>
                              </Tooltip>
                            </Box>
                          </HStack>
                        </FormControl>
                        <FormControl>
                          <FormLabel fontWeight={600}>Share: </FormLabel>
                          <HStack
                            maxW="160px"
                            h="50px"
                            borderRadius={"8px"}
                            spacing={2}
                          >
                            <EmailShareButton
                              onClick={() => {
                                navigator.clipboard.writeText(
                                  window.location.href
                                );
                                toast({
                                  title: "Link Copied Successfully!",
                                  description: "",
                                  status: "success",
                                  duration: 9000,
                                  isClosable: true,
                                });
                              }}
                            >
                              <CopyIcon width={6} height={6} />
                            </EmailShareButton>
                            <FacebookShareButton
                              url={window.location.href}
                              title={`Hey, Check out this awesome product ${product.name} which I found on Kamsin Collection!`}
                            >
                              <FacebookIcon size={"2rem"} round />
                            </FacebookShareButton>
                            <EmailShareButton
                              subject="Check  this out"
                              body={`Hey, Check out this awesome product ${product.name} which I found on Kamsin Collection!`}
                              url={window.location.href}
                            >
                              <EmailIcon size={"2rem"} round />
                            </EmailShareButton>
                            <WhatsappShareButton
                              url={window.location.href}
                              title={`Hey, Check out this awesome product "${product.name}" which I found on Kamsin Collection!`}
                            >
                              <WhatsappIcon size={"2rem"} round />
                            </WhatsappShareButton>
                            <PinterestShareButton
                              url={window.location.href}
                              title={`Hey, Check out this awesome product ${product.name} which I found on Kamsin Collection!`}
                              media={product.image_one}
                            >
                              <PinterestIcon size={"2rem"} round />
                            </PinterestShareButton>
                          </HStack>
                        </FormControl>
                      </HStack>
                    </Box>
                    <Box>
                      <Button
                        w={"full"}
                        mt={4}
                        size={"lg"}
                        py={"7"}
                        bg={mode("gray.900", "gray.50")}
                        color={mode("white", "gray.900")}
                        textTransform={"uppercase"}
                        _hover={{
                          transform: "translateY(2px)",
                          boxShadow: "lg",
                        }}
                        onClick={addToCartHandler}
                      >
                        Add to cart
                      </Button>
                    </Box>
                    <Box>
                      <Text
                        fontSize={{ base: "16px", lg: "18px" }}
                        color={mode("yellow.500", "yellow.300")}
                        fontWeight={"500"}
                        textTransform={"uppercase"}
                        mb={"4"}
                      >
                        Services
                      </Text>
                      <List spacing={0}>
                        <ListItem>
                          <Icon as={RepeatIcon} m={2} w={5} h={5} />
                          <Text as={"span"} fontWeight={"bold"}>
                            7 Days Exchange Policy{" "}
                            <Popover>
                              <PopoverTrigger>
                                {/* <Button
                            variant={"unstyled"}
                            mb={1}
                            _active={{
                              border: "none",
                            }}
                          >
                            <Icon as={QuestionIcon} />
                          </Button> */}
                                <QuestionIcon
                                  as="button"
                                  m={1}
                                  w={4}
                                  h={4}
                                  _hover={{
                                    cursor: "pointer",
                                  }}
                                />
                              </PopoverTrigger>
                              <PopoverContent>
                                <PopoverArrow />
                                <PopoverCloseButton />
                                <PopoverHeader>Exchange Policy</PopoverHeader>
                                <PopoverBody>
                                  Goods to be exchanged must be unused and in
                                  the same condition, with original packaging,
                                  it shouldn't be a sale item and should be
                                  exchanged within 7 days of delivery. It can be
                                  exchanged only if there is some defect or
                                  damage in the item OR there is some issue
                                  regarding the size of the item purchased. You
                                  must through any modes of communication in{" "}
                                  <Link color="#38B2AC" href="/support">
                                    Contact Us
                                  </Link>{" "}
                                  page.
                                </PopoverBody>
                              </PopoverContent>
                            </Popover>
                          </Text>
                        </ListItem>
                        <ListItem>
                          <Icon as={HiCurrencyRupee} m={2} w={5} h={5} />
                          <Text as={"span"} fontWeight={"bold"}>
                            Cash on Delivery Available{" "}
                            <Popover>
                              <PopoverTrigger>
                                <QuestionIcon
                                  as="button"
                                  m={1}
                                  w={4}
                                  h={4}
                                  _hover={{
                                    cursor: "pointer",
                                  }}
                                />
                              </PopoverTrigger>
                              <PopoverContent>
                                <PopoverArrow />
                                <PopoverCloseButton />
                                <PopoverHeader>COD Available</PopoverHeader>
                                <PopoverBody>
                                  Cash on Delivery is available for this item.
                                  Other payment modes are also available which
                                  can be seen at the checkout page.
                                </PopoverBody>
                              </PopoverContent>
                            </Popover>
                          </Text>
                        </ListItem>
                        <ListItem>
                          <Icon as={MdCancel} m={2} w={5} h={5} />
                          <Text as={"span"} fontWeight={"bold"}>
                            Upto 12 hours cancellation
                            <Popover>
                              <PopoverTrigger>
                                <QuestionIcon
                                  as="button"
                                  m={1}
                                  w={4}
                                  h={4}
                                  _hover={{
                                    cursor: "pointer",
                                  }}
                                />
                              </PopoverTrigger>
                              <PopoverContent>
                                <PopoverArrow />
                                <PopoverCloseButton />
                                <PopoverHeader>
                                  Cancellation Available
                                </PopoverHeader>
                                <PopoverBody>
                                  Order can be cancelled within 12 hours of
                                  placing the order. Order can be cancelled from{" "}
                                  <Link color="#38B2AC" href="/profile">
                                    My Orders
                                  </Link>{" "}
                                  page
                                </PopoverBody>
                              </PopoverContent>
                            </Popover>
                          </Text>
                        </ListItem>
                        <ListItem>
                          <Icon as={MdLocalShipping} m={2} w={5} h={5} />
                          <Text as={"span"} fontWeight={"bold"}>
                            Quick Delivery Available{" "}
                            <Popover>
                              <PopoverTrigger>
                                <QuestionIcon
                                  as="button"
                                  m={1}
                                  w={4}
                                  h={4}
                                  _hover={{
                                    cursor: "pointer",
                                  }}
                                />
                              </PopoverTrigger>
                              <PopoverContent>
                                <PopoverArrow />
                                <PopoverCloseButton />
                                <PopoverHeader>Delivery Policy</PopoverHeader>
                                <PopoverBody>
                                  We deliver to the address provided by the
                                  customer as fast as possible for both COD
                                  &amp; prepaid orders whereas in rare cases
                                  there may be a slight delay in transit and you
                                  will be informed of revised Delivery Timelines
                                  in such cases.
                                </PopoverBody>
                              </PopoverContent>
                            </Popover>
                          </Text>
                        </ListItem>
                      </List>
                    </Box>
                    <Divider />
                    <Box>
                      <Text
                        fontSize={{ base: "16px", lg: "18px" }}
                        color={mode("yellow.500", "yellow.300")}
                        fontWeight={"500"}
                        textTransform={"uppercase"}
                        mb={"4"}
                      >
                        Product Details
                      </Text>

                      <List spacing={2}>
                        <ListItem>
                          <Text as={"span"} fontWeight={"bold"}>
                            Type:
                          </Text>{" "}
                          {product.productType}
                        </ListItem>
                        <ListItem>
                          <Text as={"span"} fontWeight={"bold"}>
                            Colour:
                          </Text>{" "}
                          {product.productColour}
                        </ListItem>
                        <ListItem>
                          <Text as={"span"} fontWeight={"bold"}>
                            Occasion:
                          </Text>{" "}
                          {product.productOccasion}
                        </ListItem>
                        <ListItem>
                          <Text as={"span"} fontWeight={"bold"}>
                            Heel Type:
                          </Text>{" "}
                          {product.productHeel}
                        </ListItem>
                        <ListItem>
                          <Text as={"span"} fontWeight={"bold"}>
                            Upper Material:
                          </Text>{" "}
                          {product.productUMaterial}
                        </ListItem>
                      </List>
                    </Box>
                  </Stack>
                </Box>
              </GridItem>
              <GridItem colStart={1} colEnd={5}>
                <Divider orientation="horizontal" />
                <Flex>
                  <Stack spacing={3}>
                    <Text
                      fontSize={{ base: "20px", lg: "18px" }}
                      color={mode("yellow.500", "yellow.300")}
                      fontWeight={"500"}
                      textTransform={"uppercase"}
                      mb={"4"}
                      mt={2}
                      w={"350px"}
                    >
                      Customer Reviews
                    </Text>

                    <HStack spacing={2} align="baseline" mt={1}>
                      <Rating
                        rating={product.rating}
                        numReviews={product.numReviews}
                        rootProps={{
                          display: "none",
                        }}
                      />
                      {Number(product.numReviews) > 0 ? (
                        <Text color={"gray.500"} fontSize={"md"}>
                          Based on {product.numReviews} reviews
                        </Text>
                      ) : (
                        <Text>No reviews</Text>
                      )}
                    </HStack>
                    <Button
                      colorScheme={"linkedin"}
                      onClick={onOpenReviewSmall}
                      disabled={loadingProductReview}
                    >
                      Write a Review {loadingProductReview && <Loader />}
                    </Button>
                  </Stack>
                  <Box p="10" w={"full"}>
                    {successProductReview &&
                      toast({
                        title: "Reviewed Successfully!",
                        description: "",
                        status: "success",
                        duration: 9000,
                        isClosable: true,
                      })}

                    {userInfo && !errorProductReview ? (
                      <Modal
                        isOpen={isOpenReviewSmall}
                        onClose={onCloseReviewSmall}
                        initialFocusRef={initialRef}
                        size={"sm"}
                      >
                        <ModalOverlay />
                        <ModalContent>
                          <ModalHeader>Review &amp; Rating</ModalHeader>
                          <ModalCloseButton />
                          <ModalBody pb={1} m={2}>
                            <FormControl isRequired>
                              <FormLabel>
                                Choose a rating for this product:{" "}
                              </FormLabel>
                              <Box>
                                <ReactStars
                                  count={5}
                                  value={rating}
                                  onChange={(e) => setRating(e)}
                                  size={24}
                                  activeColor="#ffd700"
                                />
                              </Box>
                            </FormControl>

                            <FormControl mt={4}>
                              <FormLabel>Comment/Review</FormLabel>
                              <Textarea
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                placeholder=""
                                size="sm"
                              />
                            </FormControl>
                          </ModalBody>

                          <ModalFooter>
                            <Button
                              colorScheme="blue"
                              mr={3}
                              onClick={submitHandlerSmall}
                              disabled={loadingProductReview}
                            >
                              Save
                            </Button>
                            <Button onClick={onCloseReviewSmall}>Cancel</Button>
                          </ModalFooter>
                        </ModalContent>
                      </Modal>
                    ) : userInfo && errorProductReview ? (
                      <Modal
                        isOpen={isOpenReviewSmall}
                        onClose={onCloseReviewSmall}
                        size={"sm"}
                        m={5}
                        isCentered
                      >
                        <ModalOverlay />
                        <ModalContent>
                          <ModalHeader>Error Occured!</ModalHeader>
                          <ModalCloseButton />
                          <ModalBody>{errorProductReview}</ModalBody>

                          <ModalFooter>
                            <Button
                              mr={3}
                              onClick={onCloseReviewSmall}
                              colorScheme="linkedin"
                            >
                              Close
                            </Button>
                          </ModalFooter>
                        </ModalContent>
                      </Modal>
                    ) : (
                      <Modal
                        isOpen={isOpenReviewSmall}
                        onClose={onCloseReviewSmall}
                        isCentered
                      >
                        <ModalOverlay />
                        <ModalContent>
                          <ModalHeader>Not a customer</ModalHeader>
                          <ModalCloseButton />
                          <ModalBody>Please login to write a review!</ModalBody>

                          <ModalFooter>
                            <Button
                              mr={3}
                              onClick={onCloseReviewSmall}
                              variant="ghost"
                            >
                              Close
                            </Button>
                            <Button
                              colorScheme="linkedin"
                              onClick={() => history.push("/login")}
                            >
                              Login
                            </Button>
                          </ModalFooter>
                        </ModalContent>
                      </Modal>
                    )}
                  </Box>
                </Flex>
                <SimpleGrid columns={1} spacing={2} m={2}>
                  {product.reviews.map((review) => (
                    <Box h={"120px"} key={review._id}>
                      <HStack spacing={5} m={2}>
                        <Rating
                          rating={review.rating}
                          rootProps={{ display: "none" }}
                        />
                        <Text fontSize={"xl"} fontWeight={600}>
                          {review.comment}
                        </Text>
                      </HStack>
                      <Text m={2}>
                        by {review.name}, {review.createdAt.split("T")[0]}
                      </Text>
                    </Box>
                  ))}
                </SimpleGrid>
              </GridItem>
            </Grid>
          </Flex>
        </Stack>
      )}
    </motion.div>
  );
}

export default ProductScreen;
