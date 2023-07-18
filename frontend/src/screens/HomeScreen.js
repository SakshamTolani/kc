import React, { useEffect, useMemo, useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import Product from "../components/Product";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import {
  listKidsProducts,
  listLadiesProducts,
  listProducts,
} from "../actions/productActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Paginate from "../components/Paginate";
import ProductCarousel from "../components/ProductCarousel";
import { Link } from "react-router-dom";
import PopupRegister from "../components/PopupRegister";
import {
  Box,
  Divider,
  Heading,
  Button,
  Icon,
  SimpleGrid,
  Stack,
  Tooltip,
  useColorModeValue as mode,
  Flex,
} from "@chakra-ui/react";
import { ChevronUpIcon, ArrowForwardIcon } from "@chakra-ui/icons";

function HomeScreen({ history }) {
  const dispatch = useDispatch();
  const [registerShow, setRegisterShow] = useState(false);
  const productList = useSelector((state) => state.productList);
  const ladiesProductList = useSelector((state) => state.ladiesProductList);
  const kidsProductList = useSelector((state) => state.kidsProductList);
  let keyword = history && history.location.search;
  useEffect(() => {
    dispatch(listProducts(keyword));
    dispatch(listLadiesProducts(keyword));
    dispatch(listKidsProducts(keyword));
  }, [dispatch, keyword]);
  const userRegister = useSelector((state) => state.userRegister);
  const { userInfo: userInfoRegister } = userRegister;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo: userInfoLogin } = userLogin;
  const { error, loading, products, page, pages } = productList;
  const {
    error: ladiesError,
    loading: ladiesLoading,
    ladiesProducts,
    ladiesPage,
    ladiesPages,
  } = ladiesProductList;
  const {
    error: kidsError,
    loading: kidsLoading,
    kidsProducts,
    kidsPage,
    kidsPages,
  } = kidsProductList;
  const [showButton, setShowButton] = useState(false);
  // const ProductGrid = (props) => {
  //   const columns = useMemo(() => {
  //     const count = React.Children.toArray(props.children).filter(
  //       React.isValidElement
  //     ).length;
  //     return {
  //       base: Math.min(2, count),
  //       md: Math.min(3, count),
  //       lg: Math.min(4, count),
  //       xl: Math.min(5, count),
  //     };
  //   }, [props.children]);

  //   return (
  //     <SimpleGrid
  //       columns={columns}
  //       columnGap={{ base: "4", md: "6" }}
  //       rowGap={{ base: "8", md: "10" }}
  //       {...props}
  //     />
  //   );
  // };
  // useEffect(() => {
  //   window.addEventListener("scroll", () => {
  //     if (window.pageYOffset > 300) {
  //       setShowButton(true);
  //     } else {
  //       setShowButton(false);
  //     }
  //   });
  // }, []);

  useEffect(() => {
    setTimeout(() => {
      if (!userInfoLogin && !userInfoRegister) {
        setRegisterShow(true);
      }
    }, 2000);
  }, [registerShow]);

  // This function will scroll the window to the top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // for smoothly scrolling
    });
    setShowButton(false);
  };

  return (
    <motion.div
      initial={{ width: 0 }}
      animate={{ width: "100%" }}
      exit={{ x: window.innerWidth, transition: { duration: 0.1 } }}
    >
      {/* {registerShow && <PopupRegister />} */}
      {/* {!keyword && <ProductCarousel />} */}
      {loading && <Loader />}
      <Stack mt={5}>
        <Heading color={mode("gray.900", "gray.200")} fontFamily={"Raleway"}>
          Latest Arrivals
        </Heading>
        {products.length == 0 && keyword && (
          <Message variant="warning">
            No related products found. Try another word!
          </Message>
        )}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          // <div>
          //   <Row>
          //     {products.slice(0, 1).map((product) => (
          //       <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
          //         <Product product={product} />
          //       </Col>
          //     ))}
          //   </Row>
          //   <Paginate pages={pages} page={page} keyword={keyword} />
          // </div>
          <Box
            maxW="7xl"
            mx="auto"
            px={{ base: "4", md: "8", lg: "12" }}
            py={{ base: "6", md: "8", lg: "12" }}
          >
            <Stack direction={["column", "row"]} spacing={4}>
              {products.slice(0, 3).map((product) => (
                <div key={product._id}>
                  <Product product={product} />
                </div>
              ))}
            </Stack>
            <Button
              variant="outline"
              colorScheme={"red"}
              rightIcon={<ArrowForwardIcon />}
              mt={4}
              ml={{ base: "7rem", md: "24rem", lg: "32rem" }}
            >
              View All
            </Button>
          </Box>
        )}
      </Stack>
      <Divider />
      {/* <hr id="ladies"></hr> */}
      <Stack>
        <Heading color={mode("gray.900", "gray.200")} fontFamily={"Raleway"}>
          Women Collection
        </Heading>
        {ladiesProducts && ladiesProducts.length == 0 && keyword && (
          <Message variant="warning">
            No related products found. Try another word!
          </Message>
        )}
        {ladiesLoading ? (
          <Loader />
        ) : ladiesError ? (
          <Message variant="danger">{ladiesError}</Message>
        ) : (
          // <div>
          //   <Row>
          //     {ladiesProducts &&
          //       ladiesProducts.map((product) => (
          //         <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
          //           <Product product={product} />
          //         </Col>
          //       ))}
          //   </Row>
          //   <Paginate
          //     pages={ladiesPages}
          //     page={ladiesPage}
          //     keyword={keyword}
          //     ladies={true}
          //   />
          // </div>
          <Box
            maxW="7xl"
            mx="auto"
            px={{ base: "4", md: "8", lg: "12" }}
            py={{ base: "6", md: "8", lg: "12" }}
          >
            <Stack direction={["column", "row"]} spacing={4}>
              {ladiesProducts &&
                ladiesProducts
                  .slice(0, 3)
                  .map((product) => (
                    <Product key={product._id} product={product} />
                  ))}
            </Stack>
            <Button
              variant="outline"
              colorScheme={"red"}
              rightIcon={<ArrowForwardIcon />}
              mt={4}
              ml={{ base: "7rem", md: "24rem", lg: "32rem" }}
            >
              View All
            </Button>
          </Box>
        )}
      </Stack>
      <hr id="kids"></hr>
      <Stack>
        <Heading color={mode("gray.900", "gray.200")} fontFamily={"Raleway"}>
          Kids Collection
        </Heading>
        {kidsProducts && kidsProducts.length == 0 && keyword && (
          <Message variant="warning">
            No related products found. Try another word!
          </Message>
        )}
        {kidsLoading ? (
          <Loader />
        ) : kidsError ? (
          <Message variant="danger">{kidsError}</Message>
        ) : (
          // <div>
          //   <Row>
          //     {kidsProducts &&
          //       kidsProducts.map((product) => (
          //         <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
          //           <Product product={product} />
          //         </Col>
          //       ))}
          //   </Row>
          //   <Paginate
          //     pages={kidsPages}
          //     page={kidsPage}
          //     keyword={keyword}
          //     kids={true}
          //   />
          // </div>
          <Box
            maxW="7xl"
            mx="auto"
            px={{ base: "4", md: "8", lg: "12" }}
            py={{ base: "6", md: "8", lg: "12" }}
          >
            <Stack direction={["column", "row"]} spacing={4}>
              {kidsProducts &&
                kidsProducts
                  .slice(0, 3)
                  .map((product) => (
                    <Product key={product._id} product={product} />
                  ))}
            </Stack>
            <Button
              variant="outline"
              colorScheme={"red"}
              rightIcon={<ArrowForwardIcon />}
              mt={4}
              ml={{ base: "7rem", md: "24rem", lg: "32rem" }}
            >
              View All
            </Button>
          </Box>
        )}
      </Stack>
      {showButton && (
        <Box position={"fixed"} bottom={20} right={20}>
          <Tooltip label="Move to top of the page">
            <Button
              size={"sm"}
              bg={mode("gray.800", "gray.200")}
              color={mode("gray.100", "gray.900")}
              onClick={scrollToTop}
              _hover={{
                bg: mode("black", "gray.400"),
              }}
            >
              <Icon as={ChevronUpIcon} w={8} h={8} />
            </Button>
          </Tooltip>
        </Box>
      )}
    </motion.div>
  );
}

export default HomeScreen;
