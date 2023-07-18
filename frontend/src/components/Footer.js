import {
  Box,
  Link,
  Button,
  HStack,
  Icon,
  Image,
  SimpleGrid,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { BsWhatsapp } from "react-icons/bs";
import {
  FaCcMastercard,
  FaCcVisa,
  FaFacebook,
  FaGooglePay,
  FaInstagram,
  FaLinkedin,
  FaPinterest,
} from "react-icons/fa";
import { SiPaytm } from "react-icons/si";
function Footer() {
  const [showTerms, setShowTerms] = useState("");
  const ListHeader = ({ children }) => {
    return (
      <Text fontWeight={"500"} fontSize={"lg"} mb={2}>
        {children}
      </Text>
    );
  };
  // useEffect(() => {
  //   window.addEventListener("scroll", () => {
  //     if (window.pageYOffset > 300) {
  //       setShowTerms(true);
  //     } else {
  //       setShowTerms(false);
  //     }
  //   });
  // }, []);
  return (
    // <div>
    //   <Container
    //     style={{
    //       backgroundColor: "#000020",
    //       maxWidth: "100%",
    //     }}
    //   >
    //     <Row style={{ marginTop: "5.25rem" }}>
    //       <h2
    //         id="abt"
    //         style={{ color: "white", marginLeft: "2.5rem", marginTop: "1rem" }}
    //       >
    //         Popular Searches
    //         <div>
    //           <Link
    //             to="/?keyword=shoes&amp;page=1"
    //             style={{
    //               color: "white",
    //               marginLeft: "auto",
    //               fontSize: "0.8rem",
    //             }}
    //           >
    //             Shoes Online
    //           </Link>
    //           <span
    //             style={{
    //               marginLeft: "20px",
    //               marginRight: "20px",
    //               fontSize: "1.4rem",
    //             }}
    //           >
    //             |
    //           </span>
    //           <Link
    //             to="/?keyword=shoes&page=1"
    //             style={{
    //               color: "white",
    //               marginLeft: "auto",
    //               fontSize: "0.8rem",
    //             }}
    //           >
    //             Shoes Online
    //           </Link>
    //           <span
    //             style={{
    //               marginLeft: "20px",
    //               marginRight: "20px",
    //               fontSize: "1.4rem",
    //             }}
    //           >
    //             |
    //           </span>
    //           <Link
    //             to="/?keyword=shoes&page=1"
    //             style={{
    //               color: "white",
    //               marginLeft: "auto",
    //               fontSize: "0.8rem",
    //             }}
    //           >
    //             Shoes Online
    //           </Link>
    //           <span
    //             style={{
    //               marginLeft: "20px",
    //               marginRight: "20px",
    //               fontSize: "1.4rem",
    //             }}
    //           >
    //             |
    //           </span>
    //           <Link
    //             to="/?keyword=shoes&amp;page=1"
    //             style={{
    //               color: "white",
    //               marginLeft: "auto",
    //               fontSize: "0.8rem",
    //             }}
    //           >
    //             Shoes Online
    //           </Link>
    //           <span
    //             style={{
    //               marginLeft: "20px",
    //               marginRight: "20px",
    //               fontSize: "1.4rem",
    //             }}
    //           >
    //             |
    //           </span>
    //           <Link
    //             to="/?keyword=shoes&amp;page=1"
    //             style={{
    //               color: "white",
    //               marginLeft: "auto",
    //               fontSize: "0.8rem",
    //             }}
    //           >
    //             Shoes Online
    //           </Link>
    //           <span
    //             style={{
    //               marginLeft: "20px",
    //               marginRight: "20px",
    //               fontSize: "1.4rem",
    //             }}
    //           >
    //             |
    //           </span>
    //           <Link
    //             to="/?keyword=shoes&amp;page=1"
    //             style={{
    //               color: "white",
    //               marginLeft: "auto",
    //               fontSize: "0.8rem",
    //             }}
    //           >
    //             Shoes Online
    //           </Link>
    //         </div>
    //       </h2>
    //     </Row>
    //     <Row style={{ marginTop: "2rem" }}>
    //       <h2
    //         id="about"
    //         className=""
    //         style={{ color: "white", marginLeft: "2.5rem", marginTop: "1rem" }}
    //       >
    //         About Us
    //       </h2>
    //       <p
    //         style={{
    //           fontSize: "1.1rem",
    //           color: "white",
    //           marginRight: "1rem",
    //           maxWidth: "90%",
    //           textAlign: "left",
    //           marginLeft: "2.6rem",
    //           fontFamily: "Open Sans",
    //           overflowY: "scroll",
    //           height: "200px",
    //         }}
    //       >
    //         Online Shopping at Kamsin Collection - A platform for fashion
    //         addicts. Kamsin Collection is a one stop fashion destination for
    //         smart buyers. We deliver our customers with an amazing range of
    //         footwear for kids that are high on fashion and style. We believe
    //         that, to become a fashion icon, a personalized style is a must. What
    //         else could be the best platform than an online fashion store? This
    //         is a destination for fashionable people as we believe that "don't
    //         just be Stylish, but Be Smart, and buy SMART".
    //         <br></br>
    //         With the growing demand in our offline retail store, Kamsin is
    //         surely making a mark, whether for formals or casuals. So, Here we
    //         are with our very own website to provide 10 times more convenient
    //         services to our customers. And believe us - online shopping at
    //         KAMSIN is a lot of fun, not even a bit of it will disappoint you.
    //         <br></br>
    //         <br></br>
    //         Along with a huge collection, Kamsin creates style along the lines
    //         of themes and cult classic fashion. The refreshing collection
    //         includes big brands such as Adda, Campus, Sparks,D&Y, Flite, Relaxo,
    //         Sleek and among others. It makes sure that it is not just a seasonal
    //         affair but it is here to stay for a long time. Till date, in its
    //         journey, it has proved that it is about people who want to make a
    //         smart purchase. By smart purchase, we mean in terms of money,
    //         product as well as quality.
    //         <br></br>
    //         <br></br>
    //         It offers kid's and womens' footwears in varied designs and colors.
    //         The range of the footwear will make you emerge with its impeccable
    //         looks among the peers. The designs available are straight out of the
    //         fashion block and cater to the crowd with a high-fashion sense. The
    //         footwear collection for Women has been outlined particularly
    //         remembering parties, celebrations and weddings. It has multifaceted
    //         plans with wonderful embellishments and this is the thing that makes
    //         it really a lady's most prized possession. Moreover, We believe in
    //         breaking all the rules when it comes to customer comfort. Our
    //         footwear have been designed to transform dreams into a reality by
    //         providing style and ease in wearing. As far as our collection is
    //         concerned, style and comfort defines our casual collection. Whether
    //         it's our kids or women, we ensure that our customer won't regret
    //         buying from us.
    //         <br></br>
    //         <br></br>
    //         Whether working 24X7 or on a vacation, shopping for footwear online
    //         is one of the best solutions that people rely on. Browse through an
    //         unlimited range of collections and in a few clicks buy it without
    //         any hassle. No crowd crossing, just shopping at peace and that too
    //         from the most fashionable range. Purchase exquisite footwear from
    //         Kamsin and avail only the smartest of deals. Explore the best of
    //         fashion today! Purchase stylish footwear.
    //         <br></br>
    //         <br></br>
    //         Kamsin collection, one of the biggest retailers of footwear, is
    //         based in Varanasi,India.
    //         <br></br>
    //         The Kamsin collection is your place for unique athletic &amp;
    //         easy-going shoes. You'll discover unique styles for ladies &amp;
    //         children.
    //         <br></br>
    //         We take pride in conveying that we keep hard to discover styles with
    //         all sizes and widths for we realize that each individual's needs
    //         differ.
    //         <br></br>
    //         <br></br>
    //         Gone are the days when you needed to go from Store to store to
    //         locate the correct style and size for yourself. For each one of
    //         those shoe sweethearts, Kamsin collections offer one stop goal to
    //         pick the correct match of footwear.
    //       </p>
    //     </Row>
    //     {/* <Row style={{ marginTop: "2rem" }}>
    //       <div
    //         style={{
    //           color: "white",
    //           width: "60%",
    //           marginLeft: "2.5rem",
    //           fontSize: "2rem",
    //         }}
    //       >
    //         FAQs
    //         <ul
    //           className="faq"
    //           style={{
    //             color: "white",
    //             overflowY: "scroll",
    //             height: "300px",
    //           }}
    //         >
    //           <li>
    //             <div>
    //               <p
    //                 style={{
    //                   color: "white",
    //                   marginLeft: "auto",
    //                   fontSize: "1.5rem",
    //                 }}
    //               >
    //                 What kind of footwear can I find in a Kamsin Collection?
    //               </p>
    //               <p
    //                 style={{
    //                   color: "white",
    //                   marginLeft: "auto",
    //                   fontSize: "1.1rem",
    //                 }}
    //               >
    //                 Kamsin Collection is a family store. Thus, you would be able
    //                 to find all types of footwear for women and kids. The
    //                 different seasonal footwears can be bridal, party
    //                 wear,ethnics, sneakers, flats formals, casuals, etc.
    //               </p>
    //             </div>
    //           </li>
    //           <li>
    //             <div>
    //               <p
    //                 style={{
    //                   color: "white",
    //                   marginLeft: "auto",
    //                   fontSize: "1.5rem",
    //                 }}
    //               >
    //                 What kind of footwear can I find in a Kamsin Collection?
    //               </p>
    //               <p
    //                 style={{
    //                   color: "white",
    //                   marginLeft: "auto",
    //                   fontSize: "1.1rem",
    //                 }}
    //               >
    //                 Kamsin is a family store. Thus, you would be able to find
    //                 all types of footwear for women and kids.
    //               </p>
    //             </div>
    //           </li>
    //           <li>
    //             <div>
    //               <p
    //                 style={{
    //                   color: "white",
    //                   marginLeft: "auto",
    //                   fontSize: "1.5rem",
    //                 }}
    //               >
    //                 What kind of footwear can I find in a Kamsin Collection?
    //               </p>
    //               <p
    //                 style={{
    //                   color: "white",
    //                   marginLeft: "auto",
    //                   fontSize: "1.1rem",
    //                 }}
    //               >
    //                 Kamsin is a family store. Thus, you would be able to find
    //                 all types of footwear for women and kids.
    //               </p>
    //             </div>
    //           </li>
    //           <li>
    //             <div>
    //               <p
    //                 style={{
    //                   color: "white",
    //                   marginLeft: "auto",
    //                   fontSize: "1.5rem",
    //                 }}
    //               >
    //                 What kind of footwear can I find in a Kamsin Collection?
    //               </p>
    //               <p
    //                 style={{
    //                   color: "white",
    //                   marginLeft: "auto",
    //                   fontSize: "1.1rem",
    //                 }}
    //               >
    //                 Kamsin is a family store. Thus, you would be able to find
    //                 all types of footwear for women and kids.
    //               </p>
    //             </div>
    //           </li>
    //           <li>
    //             <div>
    //               <p
    //                 style={{
    //                   color: "white",
    //                   marginLeft: "auto",
    //                   fontSize: "1.5rem",
    //                 }}
    //               >
    //                 What kind of footwear can I find in a Kamsin Collection?
    //               </p>
    //               <p
    //                 style={{
    //                   color: "white",
    //                   marginLeft: "auto",
    //                   fontSize: "1.1rem",
    //                 }}
    //               >
    //                 Kamsin is a family store. Thus, you would be able to find
    //                 all types of footwear for women and kids.
    //               </p>
    //             </div>
    //           </li>
    //           <li>
    //             <div>
    //               <p
    //                 style={{
    //                   color: "white",
    //                   marginLeft: "auto",
    //                   fontSize: "1.5rem",
    //                 }}
    //               >
    //                 What kind of footwear can I find in a Kamsin Collection?
    //               </p>
    //               <p
    //                 style={{
    //                   color: "white",
    //                   marginLeft: "auto",
    //                   fontSize: "1.1rem",
    //                 }}
    //               >
    //                 Kamsin is a family store. Thus, you would be able to find
    //                 all types of footwear for women and kids.
    //               </p>
    //             </div>
    //           </li>
    //           <li>
    //             <div>
    //               <p
    //                 style={{
    //                   color: "white",
    //                   marginLeft: "auto",
    //                   fontSize: "1.5rem",
    //                 }}
    //               >
    //                 What kind of footwear can I find in a Kamsin Collection?
    //               </p>
    //               <p
    //                 style={{
    //                   color: "white",
    //                   marginLeft: "auto",
    //                   fontSize: "1.1rem",
    //                 }}
    //               >
    //                 Kamsin is a family store. Thus, you would be able to find
    //                 all types of footwear for women and kids.
    //               </p>
    //             </div>
    //           </li>
    //           <li>
    //             <div>
    //               <p
    //                 style={{
    //                   color: "white",
    //                   marginLeft: "auto",
    //                   fontSize: "1.5rem",
    //                 }}
    //               >
    //                 What kind of footwear can I find in a Kamsin Collection?
    //               </p>
    //               <p
    //                 style={{
    //                   color: "white",
    //                   marginLeft: "auto",
    //                   fontSize: "1.1rem",
    //                 }}
    //               >
    //                 Kamsin is a family store. Thus, you would be able to find
    //                 all types of footwear for women and kids.
    //               </p>
    //             </div>
    //           </li>
    //           <li>
    //             <div>
    //               <p
    //                 style={{
    //                   color: "white",
    //                   marginLeft: "auto",
    //                   fontSize: "1.5rem",
    //                 }}
    //               >
    //                 What kind of footwear can I find in a Kamsin Collection?
    //               </p>
    //               <p
    //                 style={{
    //                   color: "white",
    //                   marginLeft: "auto",
    //                   fontSize: "1.1rem",
    //                 }}
    //               >
    //                 Kamsin is a family store. Thus, you would be able to find
    //                 all types of footwear for women and kids.
    //               </p>
    //             </div>
    //           </li>
    //           <li>
    //             <div>
    //               <p
    //                 style={{
    //                   color: "white",
    //                   marginLeft: "auto",
    //                   fontSize: "1.5rem",
    //                 }}
    //               >
    //                 What kind of footwear can I find in a Kamsin Collection?
    //               </p>
    //               <p
    //                 style={{
    //                   color: "white",
    //                   marginLeft: "auto",
    //                   fontSize: "1.1rem",
    //                 }}
    //               >
    //                 Kamsin is a family store. Thus, you would be able to find
    //                 all types of footwear for women and kids.
    //               </p>
    //             </div>
    //           </li>
    //         </ul>
    //       </div>
    //     </Row> */}
    //     <Row>
    //       <Col className="text-center py-5">
    //         Copyright &copy; Kamsin Collection. All Rights Reserved.
    //       </Col>
    //       {/* Visitors Count */}
    //       {/* <Col>
    //         <a href="https://www.webfreecounter.com/" target="_blank">
    //           <img
    //             src="https://www.cutercounter.com/hits.php?id=huxfaopo&nd=6&style=1"
    //             border="0"
    //             alt="visitor counter"
    //           />
    //         </a>
    //       </Col> */}
    //       {showTerms && (
    //         <Col
    //           className="text-right py-3 mr-2"
    //           style={{
    //             fontWeight: "bold",
    //             fontSize: "1.05rem",
    //             position: "fixed",
    //             bottom: "0",
    //             left: "0",
    //           }}
    //         >
    //           <Link to="/terms" className="m-1">
    //             Terms
    //           </Link>
    //           <Link
    //             to="/support"
    //             style={{
    //               margin: "2.3rem",
    //               right: "1.5rem",
    //               marginLeft: "1rem",
    //             }}
    //           >
    //             Support
    //           </Link>
    //           <Button
    //             href="https://api.whatsapp.com/send/?phone=%2B918882303716&text&app_absent=0"
    //             style={{
    //               marginRight: "2.8rem",
    //               padding: "0.7rem",
    //               fontSize: "20px",
    //               color: "white",
    //               backgroundColor: "#28a745",
    //               zIndex: "2147483646",
    //               borderRadius: "30px 8px 30px 30px",
    //             }}
    //             leftIcon={<BsWhatsapp />}
    //           >
    //             {/* <i className="fa fa-whatsapp"> Help</i> */}
    //             <Text>Help</Text>
    //           </Button>{" "}
    //         </Col>
    //       )}
    //     </Row>
    //   </Container>
    // </div>
    <Box
      // bg={useColorModeValue("gray.50", "gray.900")}
      backgroundImage={
        "linear-gradient( 64.5deg,  rgba(245,116,185,1) 14.7%, rgba(89,97,223,1) 88.7% )"
      }
      color={useColorModeValue("gray.700", "gray.200")}
      w={{ base: "auto", md: "4xl", lg: "auto" }}
    >
      <Container as={Stack} maxW={"6xl"} py={10}>
        <SimpleGrid
          templateColumns={{ sm: "1fr 1fr", md: "2fr 1fr 1fr 1fr 1fr" }}
          spacing={8}
        >
          <Stack spacing={6} mr={10}>
            <Box>
              {/* <Logo color={useColorModeValue("gray.700", "white")} /> */}
              <Image
                src="https://res.cloudinary.com/sakshamtolani/image/upload/v1665227948/KC-LOGO-transformed-2_rusgbl.png"
                // borderRadius="full"
                w={"500px"}
                boxSize={"120px"}
                alt="Dan Abramov"
              />
            </Box>
            <Text fontSize={"sm"}>
              &copy; 2022 Kamsin Collection. All rights reserved
            </Text>
            <HStack spacing={4}>
              <Icon as={SiPaytm} w={16} h={16} />
              <Icon as={FaGooglePay} w={16} h={16} />
              <Image src="https://res.cloudinary.com/sakshamtolani/image/upload/v1665390104/icons8-bhim-upi-50_crievj.png" />
              <Icon as={FaCcVisa} w={16} h={16} />
              {/* <Icon as={FaCcMastercard} w={16} h={16} /> */}
            </HStack>
          </Stack>
          <Stack align={"flex-start"}>
            <ListHeader>Shop</ListHeader>
            <Link href={"#"}>Shop for Women</Link>
            <Link href={"#"}>Shop for Boys</Link>
            <Link href={"#"}>Shop for Girls</Link>
            {/* <Link href={"#"}>Pricing</Link>
            <Link href={"#"}>Releases</Link> */}
          </Stack>
          <Stack align={"flex-start"}>
            <ListHeader>Company</ListHeader>
            <Link href={"#"}>About</Link>
            <Link href={"#"}>FAQs</Link>
            <Link href={"#"}>Terms &amp; Conditions</Link>
            {/* <Link href={"#"}>Contact</Link> */}
            <Link href={"#"}>Store Locator</Link>
          </Stack>
          <Stack align={"flex-start"}>
            <ListHeader>Support</ListHeader>
            <Link href={"#"}>Contact Us</Link>
            {/* <Link href={"#"}>Terms of Service</Link> */}
            {/* <Link href={"#"}>Legal</Link> */}
            <Link href={"#"}>Privacy Policy</Link>
            <Link href={"#"}>Sitemap</Link>
          </Stack>
          <Stack align={"flex-start"}>
            <ListHeader>Follow Us</ListHeader>
            <HStack spacing={4}>
              <Link href={"#"}>
                <Icon as={FaFacebook} w={8} h={8} />
              </Link>
              <Link href={"#"}>
                <Icon as={FaPinterest} w={8} h={8} />
              </Link>
              <Link href={"#"}>
                <Icon as={FaInstagram} w={8} h={8} />
              </Link>
              <Link href={"#"}>
                <Icon as={FaLinkedin} w={8} h={8} />
              </Link>
            </HStack>
          </Stack>
          <Stack
            fontWeight={"bold"}
            fontSize={"1.05rem"}
            position={"fixed"}
            bottom={12}
            left={5}
          >
            <Button
              href="https://api.whatsapp.com/send/?phone=%2B918882303716&text&app_absent=0"
              marginRight={"2.8rem"}
              padding={"0.7rem"}
              fontSize={"20px"}
              color={"white"}
              backgroundColor={"#28a745"}
              zIndex={"2147483646"}
              borderRadius={"30px 8px 30px 30px"}
              leftIcon={<BsWhatsapp />}
            >
              {/* <i className="fa fa-whatsapp"> Help</i> */}
              <Text fontWeight={600}>Help</Text>
            </Button>
          </Stack>
        </SimpleGrid>
      </Container>
    </Box>
  );
}

export default Footer;
