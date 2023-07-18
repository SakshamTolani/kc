import React, { useState } from "react";
import { useHistory } from "react-router-dom";
// import { Button, Image, Modal } from "react-bootstrap";
import {
  Box,
  Modal,
  Image,
  Button,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Stack,
  Flex,
  Text,
  Center,
  Spacer,
  useColorModeValue,
  Link,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";

function PopupRegister() {
  const [show, setShow] = useState(true);
  const history = useHistory();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const routeChange = () => {
    let path = `/register`;
    history.push(path);
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    // <>
    //   <Modal
    //     show={show}
    //     size="md"
    //     aria-labelledby="contained-modal-title-vcenter"
    //     style={{ maxHeight: "100%", maxWidth: "100%" }}
    //     centered
    //   >
    //     <Modal.Header>
    //       <Modal.Title>
    //         <Image
    //           style={{ maxHeight: "100%", maxWidth: "100%" }}
    //           src="https://res.cloudinary.com/sakshamtolani/image/upload/v1664218253/laura-chouette-0iJaUd2YC5Y-unsplash_tmh3jv.jpg"
    //         />
    //       </Modal.Title>
    //     </Modal.Header>
    //     <Modal.Body
    //       className="message"
    //       style={{
    //         fontFamily: "'Poppins', sans-serif",
    //         fontSize: "1.5rem",
    //         textAlign: "center",
    //       }}
    //     >
    //       <p>
    //         <span style={{ color: "#000", fontWeight: "800" }}>
    //           EXCLUSIVE WELCOME OFFER
    //         </span>{" "}
    //         Join our Family and{" "}
    //         <b style={{ fontWeight: "bolder", color: "#000" }}>GET 15% OFF.</b>{" "}
    //       </p>
    //       <p
    //         className="pop-span"
    //         style={{
    //           border: "dashed",
    //           padding: "0.25rem",
    //           width: "55%",
    //           color: "#000",
    //           fontSize: "1.5rem",
    //           borderRadius: "100px",
    //           borderColor: "#000",
    //         }}
    //       >
    //         Use Code:{"  "}
    //         <b
    //           style={{
    //             fontWeight: "bolder",
    //             color: "red",
    //             textDecoration: "underline",
    //           }}
    //         >
    //           WELCOME20
    //         </b>
    //       </p>
    //     </Modal.Body>
    //     <Modal.Footer className="options">
    //       <Button
    //         variant="secondary"
    //         onClick={handleClose}
    //         style={{ fontSize: "large" }}
    //         className="btn-modal"
    //       >
    //         Close
    //       </Button>
    //       <Button
    //         variant="primary"
    //         onClick={routeChange}
    //         style={{ fontSize: "large" }}
    //         className="btn-modal"
    //       >
    //         Avail Discount
    //       </Button>
    //     </Modal.Footer>
    //   </Modal>
    // </>
    // <>
    //   <Modal
    //     isCentered
    //     onClose={() => setShow(false)}
    //     isOpen={show}
    //     motionPreset="slideInRight"
    //     size="md"
    //   >
    //     <ModalOverlay />
    //     <ModalContent>
    //       <ModalHeader fontWeight={800}>EXCLUSIVE WELCOME OFFER</ModalHeader>
    //       <ModalCloseButton />
    //       <ModalBody>
    //         <Stack>
    //           <Flex size="sm" maxH="100%" maxW="100%">
    //             <Image src="https://res.cloudinary.com/sakshamtolani/image/upload/v1664218253/laura-chouette-0iJaUd2YC5Y-unsplash_tmh3jv.jpg" />
    //           </Flex>
    //           <Text>
    //             Join our Family and
    //             <Text as="b" ml={2} fontSize="xl">
    //               GET 15% OFF.
    //             </Text>
    //             <br />
    //             <Box fontSize="md">USE CODE: </Box>
    //             <Spacer />
    //             <Box
    //               d="inline-block"
    //               ml={20}
    //               mt={2}
    //               fontSize="2xl"
    //               w="200px"
    //               borderRadius={50}
    //               align="center"
    //               as="b"
    //               border="2px dashed red"
    //             >
    //               WELCOME20{" "}
    //             </Box>
    //           </Text>
    //         </Stack>
    //       </ModalBody>
    //       <ModalFooter className="options">
    //         <Button colorScheme="blue" mr={3} onClick={() => setShow(false)}>
    //           Close
    //         </Button>
    //         <Button
    //           fontSize="large"
    //           variant="outline"
    //           colorScheme="blue"
    //           mr={3}
    //           onClick={() => setShow(false)}
    //           className="btn-modal"
    //         >
    //           Close
    //         </Button>
    //         <Button variant="ghost">Secondary Action</Button>
    //         <Button
    //           colorScheme="blue"
    //           onClick={routeChange}
    //           fontSize="large"
    //           className="btn-modal"
    //         >
    //           Avail Discount
    //         </Button>
    //       </ModalFooter>
    //     </ModalContent>
    //   </Modal>
    // </>
    <Box height="100vh">
      <Modal
        isOpen={show}
        onClose={handleClose}
        size="2xl" // `trapFocus` and `blockScrollOnMount` are only switched off so that the preview works properly.
        // preserveScrollBarGap={true}
        returnFocusOnClose={true}
        blockScrollOnMount={false}
        trapFocus={false}
      >
        <ModalOverlay />
        <ModalContent borderRadius="2xl" mx="4">
          <ModalBody>
            <Stack
              maxW="xs"
              mx="auto"
              py={{
                base: "12",
                md: "16",
              }}
              spacing={{
                base: "6",
                md: "10",
              }}
            >
              {/* <Logo height="5" /> */}
              <Image
                style={{ maxHeight: "100%", maxWidth: "100%" }}
                src="https://res.cloudinary.com/sakshamtolani/image/upload/v1664218253/laura-chouette-0iJaUd2YC5Y-unsplash_tmh3jv.jpg"
              />
              <Stack spacing="3" textAlign="center">
                <Text fontSize="lg">Enter your email below &amp; get</Text>
                <Text
                  color={useColorModeValue("blue.500", "blue.200")}
                  fontWeight="extrabold"
                  fontSize={{
                    base: "5xl",
                    md: "6xl",
                  }}
                  textTransform="uppercase"
                  transform="scale(1.2)"
                >
                  20% off
                </Text>
                <Text fontSize="lg">
                  <Box as="span" whiteSpace="nowrap" fontWeight="bold">
                    on your next purchase
                  </Box>{" "}
                  + exclusive access to new products
                </Text>
              </Stack>
              {/* <SubscribeForm /> */}
              <Stack spacing="3">
                <Button
                  type="submit"
                  fontWeight="bold"
                  textTransform="uppercase"
                  fontSize="md"
                  colorScheme="blue"
                  size="lg"
                >
                  Get my 20% off
                </Button>
              </Stack>
              <Link
                fontSize="sm"
                textAlign="center"
                color={useColorModeValue("gray.600", "gray.400")}
                textDecoration="underline"
                onClick={handleClose}
              >
                No, I don't want discounts
              </Link>
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default PopupRegister;
