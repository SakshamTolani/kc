import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Carousel, Image } from "react-bootstrap";
import Loader from "./Loader";
import Message from "./Message";
import { listTopProducts } from "../actions/productActions";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
// import { Carousel } from "react-responsive-carousel";
import {
  Box,
  IconButton,
  useBreakpointValue,
  Stack,
  Heading,
  Text,
  Container,
  // Image,
  useColorModeValue as mode,
} from "@chakra-ui/react";
// Here we have used react-icons package for the icons
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";
// And react-slick as our Carousel Lib
import Slider from "react-slick";
import { useState } from "react";

function ProductCarousel() {
  const dispatch = useDispatch();

  const productTopRated = useSelector((state) => state.productTopRated);
  const { error, loading, products } = productTopRated;
  const [slider, setSlider] = useState(null);
  const top = useBreakpointValue({ base: "90%", md: "50%" });
  const side = useBreakpointValue({ base: "30%", md: "40px" });
  useEffect(() => {
    dispatch(listTopProducts());
  }, [dispatch]);
  const bgSize = useBreakpointValue({
    base: "100%",
    md: "100%",
    lg: "50%",
  });
  const settings = {
    dots: true,
    arrows: false,
    fade: true,
    infinite: true,
    autoplay: true,
    speed: 500,
    autoplaySpeed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const wdtCont = useBreakpointValue({ base: "100%", md: "115%", lg: "100%" });

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <Carousel
      pause="hover"
      // className="bg-dark"
      style={{
        backgroundColor: "cadetblue",
        width: "1530px",
        height: "600px",
        zIndex: "1",
        right: "210px",
      }}
      prevLabel=""
      nextLabel=""
      className="product-carousel"
    >
      <Carousel.Item key="1" interval={8000} className="rakhi-carousel">
        <Link to="/">
          <Image
            src="https://kamsincollection.s3.ap-south-1.amazonaws.com/Corousel+Banners.png"
            alt="Coupon"
            fluid
            style={{
              borderRadius: "0",
              width: "100%",
              height: "auto",
              maxHeight: "520px",
              position: "relative",
              display: "block",
              overflow: "hidden",
              margin: "0",
            }}
          />
          <Carousel.Caption className="product-carousel-caption carousel.caption">
            <h4
              style={{
                color: "black",
                textDecoration: "underline",
              }}
            >
              COUPON CODE: NEW50
            </h4>
          </Carousel.Caption>
        </Link>
      </Carousel.Item>
      {products.map((product) => (
        <Carousel.Item key={product._id}>
          <Link to={`/product/${product._id}`}>
            <Image src={product.image_one} alt={product.name} fluid />
            <Carousel.Caption className="product-carousel-caption carousel.caption">
              <h4>
                {product.name} (₹{product.price})
              </h4>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
    // <Container
    //   position={"relative"}
    //   overflow={"hidden"}
    //   maxW={"12xl"}
    //   maxH={"3xl"}
    //   bg={"white"}
    //   // centerContent
    //   border={"2px solid black"}
    // >
    //   {/* CSS files for react-slick */}
    //   <link
    //     rel="stylesheet"
    //     type="text/css"
    //     charSet="UTF-8"
    //     href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
    //   />
    //   <link
    //     rel="stylesheet"
    //     type="text/css"
    //     href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
    //   />
    //   {/* Left Icon */}
    //   <IconButton
    //     aria-label="left-arrow"
    //     colorScheme="messenger"
    //     borderRadius="full"
    //     position="absolute"
    //     left={side}
    //     top={top}
    //     transform={"translate(0%, -50%)"}
    //     zIndex={2}
    //     onClick={() => slider?.slickPrev()}
    //   >
    //     <BiLeftArrowAlt />
    //   </IconButton>
    //   {/* Right Icon */}
    //   <IconButton
    //     aria-label="right-arrow"
    //     colorScheme="messenger"
    //     borderRadius="full"
    //     position="absolute"
    //     right={side}
    //     top={top}
    //     transform={"translate(0%, -50%)"}
    //     zIndex={2}
    //     onClick={() => slider?.slickNext()}
    //   >
    //     <BiRightArrowAlt />
    //   </IconButton>
    //   {/* Slider */}
    //   <Slider {...settings} ref={(slider) => setSlider(slider)}>
    //     {products.map((product, index) => (
    //       <Box
    //         key={index}
    //         height={"6xl"}
    //         position="relative"
    //         backgroundPosition="top"
    //         backgroundRepeat="no-repeat"
    //         backgroundSize="90%"
    //         backgroundImage={`url(${product.image_one})`}
    //       >
    //         <Container size="container.lg" height="600px" position="relative">
    //           <Stack
    //             spacing={6}
    //             w={"full"}
    //             maxW={"lg"}
    //             position="absolute"
    //             top={0}
    //             right={"250px"}
    //             // transform="translate(0, -50%)"
    //           >
    //             <Heading fontSize={{ base: "lg", md: "xl", lg: "2xl" }}>
    //               {product.name} (&#8377;{product.price})
    //             </Heading>
    //             <Text fontSize={{ base: "md", lg: "lg" }} color="GrayText">
    //               {/* {card.text} */}
    //             </Text>
    //           </Stack>
    //         </Container>
    //       </Box>
    //     ))}
    //   </Slider>
    // </Container>
    // <Box w={"900px"} h={"500px"} m={"auto"}>
    //   <Carousel>
    //     {products.map((product) => (
    //       <Box>
    //         <Image src={product.image_one} alt={product.name} />
    //       </Box>
    //     ))}
    //   </Carousel>
    //   <Container
    //     position={"relative"}
    //     overflow={"hidden"}
    //     maxW={"12xl"}
    //     w={wdtCont}
    //     maxH={"3xl"}
    //     bg={mode("white", "gray.700")}
    //     // centerContent
    //   >
    //     {/* CSS files for react-slick */}
    //     <link
    //       rel="stylesheet"
    //       type="text/css"
    //       charSet="UTF-8"
    //       href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
    //     />
    //     <link
    //       rel="stylesheet"
    //       type="text/css"
    //       href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
    //     />
    //     {/* Left Icon */}
    //     <IconButton
    //       aria-label="left-arrow"
    //       variant="outline"
    //       bg={"black"}
    //       color={"white"}
    //       // borderRadius="full"
    //       position="absolute"
    //       left={side}
    //       top={top}
    //       transform={"translate(0%, -50%)"}
    //       zIndex={2}
    //       onClick={() => slider?.slickPrev()}
    //     >
    //       <BiLeftArrowAlt />
    //     </IconButton>
    //     {/* Right Icon */}
    //     <IconButton
    //       aria-label="right-arrow"
    //       // colorScheme="messenger"
    //       variant={"outline"}
    //       bg={"black"}
    //       color={"white"}
    //       // borderRadius="full"
    //       position="absolute"
    //       right={side}
    //       top={top}
    //       transform={"translate(0%, -50%)"}
    //       zIndex={2}
    //       onClick={() => slider?.slickNext()}
    //     >
    //       <BiRightArrowAlt />
    //     </IconButton>
    //     {/* Slider */}
    //     <Slider {...settings} ref={(slider) => setSlider(slider)}>
    //       {products.map((product, index) => (
    //         <Box
    //           key={index}
    //           position="relative"
    //           backgroundPosition="center"
    //           backgroundRepeat="no-repeat"
    //           backgroundSize={bgSize}
    //           backgroundImage={`url(${product.image_one})`}
    //         >
    //           <Container size="container.lg" height="600px" position="relative">
    //             <Stack
    //               spacing={6}
    //               w={"full"}
    //               maxW={"sm"}
    //               position="absolute"
    //               top={10}
    //               right={"550px"}
    //               // transform="translate(0, -50%)"
    //             >
    //               <Heading
    //                 fontSize={{ base: "lg", md: "xl", lg: "2xl" }}
    //                 fontFamily={"Raleway"}
    //                 fontWeight={"700"}
    //                 color={mode("gray.900", "gray.100")}
    //               >
    //                 {product.name} (&#8377;{product.price})
    //               </Heading>
    //               <Text fontSize={{ base: "md", lg: "lg" }} color="GrayText">
    //                 {/* {card.text} */}
    //               </Text>
    //             </Stack>
    //           </Container>
    //         </Box>
    //       ))}
    //     </Slider>
    //   </Container>
    // </Box>
  );
}

export default ProductCarousel;
