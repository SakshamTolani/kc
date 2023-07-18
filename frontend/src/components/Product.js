import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "./Rating";
import {
  Flex,
  Circle,
  Box,
  Image,
  Badge,
  useColorModeValue,
  Icon,
  chakra,
  Tooltip,
  useColorModeValue as mode,
  LinkOverlay,
  useBreakpointValue,
  Stack,
  HStack,
  Text,
} from "@chakra-ui/react";
import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";
import { FiShoppingCart } from "react-icons/fi";

// function Product({ product }) {
//   return (
//     <Card className="my-3 p-3 rounded">
//       <Link to={`/product/${product._id}`}>
//         <Card.Img src={product.image_one} />
//       </Link>
//       <Card.Body>
//         <Link to={`/product/${product._id}`}>
//           <Card.Title as="div">
//             <strong>{product.name}</strong>
//           </Card.Title>
//         </Link>
//         <Card.Text as="div">
//           <div className="my-3">
//             <Rating
//               value={product.rating}
//               text={`${product.numReviews} reviews`}
//               color="#f8e825"
//             />
//           </div>
//         </Card.Text>
//         <Card.Text as="h3">₹ {product.price}</Card.Text>
//         {(
//           ((product.lastPrice - product.price) * 100) /
//           product.lastPrice
//         ).toFixed() >= 70 && (
//           <Card.Text
//             style={{
//               borderStyle: "solid",
//               background: "slateblue",
//               borderColor: "slateblue",
//               color: "white",
//               width: "200px",
//               borderRadius: "0.2rem",
//               textAlign: "center",
//             }}
//           >
//             Great Deal (For Limited Time Only)
//           </Card.Text>
//         )}
//         <Card.Text
//           as="h5"
//           style={{
//             color: "red",
//             display:
//               (
//                 ((product.lastPrice - product.price) * 100) /
//                 product.lastPrice
//               ).toFixed() <= 0 && "none",
//           }}
//         >
//           {product.price != 0
//             ? (
//                 ((product.lastPrice - product.price) * 100) /
//                 product.lastPrice
//               ).toFixed()
//             : 0}
//           %off
//         </Card.Text>
//       </Card.Body>
//     </Card>
//   );
// }
function Product({ product, rootProps }) {
  return (
    <Stack
      spacing={useBreakpointValue({
        base: "4",
        md: "5",
      })}
      {...rootProps}
    >
      <Box
        bg={useColorModeValue("white", "gray.800")}
        w={{ base: "auto", md: "2xs", lg: "sm" }}
        h={"full"}
        borderWidth="1px"
        rounded="lg"
        shadow="lg"
        position="relative"
      >
        {product.countInStock >= 4 && (
          <Circle
            size="10px"
            position="absolute"
            top={2}
            right={2}
            bg="red.200"
          />
        )}
        <LinkOverlay href={`/product/${product._id}`}>
          <Image
            src={product.image_one}
            alt={`Picture of ${product.name}`}
            w={"full"}
            maxH={"305px"}
            roundedTop="lg"
          />
        </LinkOverlay>

        <Box p="6">
          <Box d="flex" alignItems="baseline">
            {product.countInStock >= 4 && (
              <Badge rounded="full" px="2" fontSize="0.8em" colorScheme="red">
                New
              </Badge>
            )}
          </Box>
          {/* <Flex mt="1" justifyContent="space-between" alignContent="center">
            <Box
              fontSize={useBreakpointValue({
                base: "sm",
                md: "md",
                lg: "lg",
              })}
              fontWeight="semibold"
              as="h4"
              color={mode("gray.900", "gray.200")}
              lineHeight="tight"
              isTruncated
            >
              {product.name}
            </Box>
            <Tooltip
              label="Add to cart"
              bg="white"
              placement={"top"}
              color={"gray.800"}
              fontSize={"1.2em"}
            >
              <chakra.a href={"#"} display={"flex"}>
                <Icon as={FiShoppingCart} h={7} w={7} alignSelf={"center"} />
              </chakra.a>
            </Tooltip>
          </Flex> */}
          <Stack>
            <Stack spacing="1">
              <Text
                as={"h3"}
                fontWeight="700"
                color={mode("gray.700", "gray.400")}
              >
                {product.name}
              </Text>
              <HStack spacing="1">
                <Text
                  as="span"
                  fontSize={"lg"}
                  fontWeight="medium"
                  color={mode("gray.400", "gray.700")}
                  textDecoration={"line-through"}
                >
                  &#8377;{product.lastPrice}
                </Text>
                <Text
                  as="span"
                  fontSize={"xl"}
                  fontWeight="semibold"
                  color={mode("gray.800", "gray.100")}
                >
                  &#8377;{product.price}
                </Text>
              </HStack>
            </Stack>
            <HStack>
              <Rating rating={product.rating} numReviews={product.numReviews} />
              {/* <Text fontSize="sm" color={mode("gray.600", "gray.400")}>
                        12 Reviews
                      </Text> */}
            </HStack>
          </Stack>

          {/* <Flex justifyContent="space-between" alignContent="center">
            <Rating rating={product.rating} numReviews={product.numReviews} />
            <Box fontSize="2xl" color={useColorModeValue("gray.800", "white")}>
              <Box as="span" color={"gray.600"} fontSize="2xl">
                &#8377;
              </Box>
              {Number(product.price).toFixed(2).split(".")[0]}/-
            </Box>
          </Flex> */}
        </Box>
      </Box>
    </Stack>
  );
}

export default Product;
