import {
  Box,
  Flex,
  IconButton,
  Button,
  Text,
  useColorModeValue as mode,
  Stack,
  Collapse,
  useDisclosure,
  useBreakpointValue,
  PopoverTrigger,
  Popover,
  PopoverContent,
  Link,
  Icon,
  MenuItem,
  Menu,
  MenuButton,
  HStack,
  Avatar,
  VStack,
  MenuDivider,
  MenuList,
  Image,
  keyframes,
  useColorMode,
} from "@chakra-ui/react";
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  MoonIcon,
  SunIcon,
} from "@chakra-ui/icons";
import { FiChevronDown } from "react-icons/fi";
import NotificationBadge from "react-notification-badge";
import { Effect } from "react-notification-badge";
import React, { useEffect, useState } from "react";
import {
  Badge,
  Container,
  Nav,
  Navbar,
  NavDropdown,
  NavItem,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { useHistory } from "react-router-dom";
import { logout } from "../actions/userActions";
import SearchBox from "../components/SearchBox";
import { BsCart, BsCart2, BsCart4 } from "react-icons/bs";
import { FaShoppingBag } from "react-icons/fa";
function Header() {
  const history = useHistory();
  const size = "70px";
  const color = "teal";
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const pulseRing = keyframes`
	0% {
    transform: scale(0.33);
  }
  40%,
  50% {
    opacity: 0;
  }
  100% {
    opacity: 0;
  }
	`;
  const NAV_ITEMS = [
    {
      label: "Women",
      children: [
        {
          label: "Sandals",
          subLabel: "Trending Design to inspire you",
          href: "#",
        },
        {
          label: "Boots & Sneakers",
          subLabel: "Up-and-coming Designers",
          href: "#",
        },
        {
          label: "Casuals",
          subLabel: "Up-and-coming Designers",
          href: "#",
        },
        {
          label: "Ballerinas",
          subLabel: "Up-and-coming Designers",
          href: "#",
        },
        {
          label: "Slip On",
          subLabel: "Trending Design to inspire you",
          href: "#",
        },
        {
          label: "Doctor Sole",
          subLabel: "Up-and-coming Designers",
          href: "#",
        },
        {
          label: "Block Heels",
          subLabel: "Up-and-coming Designers",
          href: "#",
        },
        {
          label: "Wedges",
          subLabel: "Trending Design to inspire you",
          href: "#",
        },
        {
          label: "Platform Heels",
          subLabel: "Up-and-coming Designers",
          href: "#",
        },
      ],
    },
    {
      label: "Kids",
      children: [
        {
          label: "Boys",
          subLabel: "Find your dream design job",
          href: "#",
        },
        {
          label: "Girls",
          subLabel: "An exclusive list for contract work",
          href: "#",
        },
        {
          label: "Ballerina for GIRLS",
          subLabel: "Find your dream design job",
          href: "#",
        },
        {
          label: "Sandal for GIRLS",
          subLabel: "Find your dream design job",
          href: "#",
        },
        {
          label: "Boots and Sneaker for GIRLS",
          subLabel: "Find your dream design job",
          href: "#",
        },
        {
          label: "Sandal for BOYS",
          subLabel: "Find your dream design job",
          href: "#",
        },
        {
          label: "Shoe for BOYS",
          subLabel: "Find your dream design job",
          href: "#",
        },
      ],
    },
    {
      label: "Company",
      href: "#",
    },
    {
      label: "Contact",
      href: "/support",
    },
  ];
  const MobileNavItem = ({ label, children, href }) => {
    const { isOpen, onToggle } = useDisclosure();

    return (
      <Stack spacing={4} onClick={children && onToggle}>
        <Flex
          py={2}
          as={Link}
          href={href ?? "#"}
          justify={"space-between"}
          align={"center"}
          _hover={{
            textDecoration: "none",
          }}
          zIndex={4}
        >
          <Text fontWeight={600} color={mode("gray.600", "gray.200")}>
            {label}
          </Text>
          {children && (
            <Icon
              as={ChevronDownIcon}
              transition={"all .25s ease-in-out"}
              transform={isOpen ? "rotate(180deg)" : ""}
              w={6}
              h={6}
            />
          )}
        </Flex>

        <Collapse
          in={isOpen}
          animateOpacity
          style={{ marginTop: "0!important" }}
        >
          <Stack
            mt={2}
            pl={4}
            borderLeft={1}
            borderStyle={"solid"}
            borderColor={mode("gray.200", "gray.700")}
            align={"start"}
          >
            {children &&
              children.map((child) => (
                <Link key={child.label} py={2} href={child.href}>
                  {child.label}
                </Link>
              ))}
          </Stack>
        </Collapse>
      </Stack>
    );
  };
  const DesktopSubNav = ({ label, href, subLabel }) => {
    return (
      <Link
        href={href}
        role={"group"}
        display={"block"}
        p={2}
        rounded={"md"}
        _hover={{ bg: mode("pink.50", "gray.900") }}
      >
        <Stack direction={"row"} align={"center"}>
          <Box>
            <Text
              transition={"all .3s ease"}
              _groupHover={{ color: "pink.400" }}
              fontWeight={500}
            >
              {label}
            </Text>
            <Text fontSize={"sm"}>{subLabel}</Text>
          </Box>
          <Flex
            transition={"all .3s ease"}
            transform={"translateX(-10px)"}
            opacity={0}
            _groupHover={{ opacity: "100%", transform: "translateX(0)" }}
            justify={"flex-end"}
            align={"center"}
            flex={1}
          >
            <Icon color={"pink.400"} w={5} h={5} as={ChevronRightIcon} />
          </Flex>
        </Stack>
      </Link>
    );
  };
  const MobileNav = () => {
    return (
      <Stack bg={mode("white", "gray.800")} p={4} display={{ md: "none" }}>
        {NAV_ITEMS.map((navItem) => (
          <MobileNavItem key={navItem.label} {...navItem} />
        ))}
      </Stack>
    );
  };
  const { colorMode, toggleColorMode } = useColorMode();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(logout());
  };
  const { isOpen, onToggle } = useDisclosure();

  // const aboutScroll = () => {
  //   const section = document.querySelector("#abt");
  //   section.scrollIntoView({ behavior: "smooth", block: "start" });
  // };
  // const ladiesScroll = () => {
  //   let path = "/";
  //   history.push(path);
  //   const section = document.querySelector("#ladies");
  //   section.scrollIntoView({ behavior: "smooth", block: "start" });
  // };
  // const kidsScroll = () => {
  //   let path = "/";
  //   history.push(path);
  //   const section = document.querySelector("#kids");
  //   section.scrollIntoView({ behavior: "smooth", block: "start" });
  // };
  return (
    // <div style={{ display: "unset" }}>
    //   <header style={{ display: "unset" }}>
    //     <Navbar
    //       style={{
    //         backgroundColor: "#000020",
    //         color: "white",
    //       }}
    //       variant="dark"
    //       expand="lg"
    //       collapseOnSelect
    //     >
    //       <Container>
    //         <LinkContainer to="/" style={{ marginRight: "0rem" }}>
    //           <Navbar.Brand>
    //             <img
    //               src="https://kamsincollection.s3.ap-south-1.amazonaws.com/Finalised+Modified+.png"
    //               width="200"
    //               height="70"
    //               className="d-inline-block align-top"
    //             />
    //           </Navbar.Brand>
    //         </LinkContainer>
    //         <Navbar.Toggle aria-controls="basic-navbar-nav" />
    //         <Navbar.Collapse id="basic-navbar-nav">
    //           <SearchBox />
    //           <Nav className="ml-auto">
    //             <NavDropdown title="Categories" id="categories">
    //               <LinkContainer to="#ladies" onClick={ladiesScroll}>
    //                 <NavItem className="nav-categories">Women</NavItem>
    //               </LinkContainer>
    //               <LinkContainer to="#kids" onClick={kidsScroll}>
    //                 <NavItem className="nav-categories">Kids</NavItem>
    //               </LinkContainer>
    //             </NavDropdown>
    //             <LinkContainer to="#abt" onClick={aboutScroll}>
    //               <Nav.Link>Company</Nav.Link>
    //             </LinkContainer>
    //             <LinkContainer to="/cart">
    //               <Nav.Link>
    //                 <i className="fas fa-shopping-cart"></i>Cart
    //               </Nav.Link>
    //             </LinkContainer>
    //             {userInfo ? (
    //               <NavDropdown title={userInfo.name} id="username">
    //                 <LinkContainer to="/profile">
    //                   <NavDropdown.Item>Profile</NavDropdown.Item>
    //                 </LinkContainer>
    //                 <NavDropdown.Item onClick={logoutHandler}>
    //                   Logout
    //                 </NavDropdown.Item>
    //               </NavDropdown>
    //             ) : (
    //               <LinkContainer to="/login">
    //                 <Nav.Link>
    //                   <i className="fas fa-user"></i>
    //                   Login
    //                 </Nav.Link>
    //               </LinkContainer>
    //             )}

    //             {userInfo && userInfo.isAdmin && (
    //               <NavDropdown title="ADMIN" id="adminmenu">
    //                 <LinkContainer to="/admin/userlist">
    //                   <NavDropdown.Item>Users</NavDropdown.Item>
    //                 </LinkContainer>

    //                 <LinkContainer to="/admin/productlist">
    //                   <NavDropdown.Item>Products</NavDropdown.Item>
    //                 </LinkContainer>

    //                 <LinkContainer to="/admin/orderlist">
    //                   <NavDropdown.Item>Orders</NavDropdown.Item>
    //                 </LinkContainer>
    //               </NavDropdown>
    //             )}
    //           </Nav>
    //         </Navbar.Collapse>
    //       </Container>
    //     </Navbar>
    //     <marquee
    //       style={{
    //         borderStyle: "solid",
    //         color: "white",
    //         width: "100%",
    //         backgroundColor: "black",
    //         fontFamily: "Raleway",
    //         fontStyle: "italic",
    //         fontSize: "1.5rem",
    //         textAlign: "top",
    //         height: "2.5rem",
    //         display: "block",
    //         position: "sticky",
    //         top: "0",
    //         justifyContent: "start",
    //         zIndex: "10",
    //         marginLeft: "-2px",
    //         borderBlock: "unset",
    //       }}
    //     >
    //       RAKHI OFFERS: Celebrate this Raksha Bandhan by getting discount upto
    //       70% on any footwear. USE CODE: SALE200
    //     </marquee>
    //   </header>
    // </div>

    <Box>
      <Flex
        bg={mode("white", "gray.800")}
        color={mode("gray.600", "white")}
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={mode("gray.200", "gray.900")}
        align={"center"}
      >
        <Flex
          flex={{ base: 1, md: "auto" }}
          ml={{ base: -2 }}
          display={{ base: "flex", md: "none" }}
        >
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={"ghost"}
            aria-label={"Toggle Navigation"}
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: "start", md: "start" }}>
          {/* <Text
            textAlign={useBreakpointValue({ base: "center", md: "center" })}
            fontFamily={"heading"}
            color={mode("gray.800", "white")}
          >
            KC
          </Text> */}
          {/* <Image
            src="https://res.cloudinary.com/sakshamtolani/image/upload/v1665218501/KC-LOGO-transformed_ehbibs.png"
            // borderRadius="full"
            boxSize="40px"
            alt="Dan Abramov"
          /> */}
          <Box
            as="div"
            position="relative"
            ml={4}
            w={size}
            h={size}
            _before={{
              content: "''",
              position: "relative",
              display: "block",
              width: "300%",
              height: "300%",
              boxSizing: "border-box",
              marginLeft: "-100%",
              marginTop: "-100%",
              borderRadius: "50%",
              bgColor: color,
              animation: `2.25s ${pulseRing} cubic-bezier(0.455, 0.03, 0.515, 0.955) -0.4s infinite`,
            }}
          >
            <Link href="/">
              <Avatar
                src="https://res.cloudinary.com/sakshamtolani/image/upload/v1665228048/KC-LOGO-transformed-w_iopj4x.png"
                size="full"
                position="absolute"
                top={0}
              />
            </Link>
          </Box>

          <Flex
            display={{ base: "none", md: "flex" }}
            ml={10}
            mt={5}
            h="50px"
            alignContent="flex-end"
            overflow="hidden"
          >
            {/* <DesktopNav /> */}
            <Stack
              direction={"row"}
              spacing={4}
              ml={20}
              fontSize={"lg"}
              letterSpacing={2}
              fontFamily={"Raleway"}
              // fontWeight={600}
              color={mode("gray.600", "gray.200")}
              textTransform={"uppercase"}
            >
              {NAV_ITEMS.map((navItem) => (
                <Box key={navItem.label}>
                  <Popover trigger={"hover"} placement={"bottom-start"}>
                    <PopoverTrigger>
                      <Link
                        p={2}
                        href={navItem.href ?? "#"}
                        fontSize={"lg"}
                        fontWeight={500}
                        color={mode("gray.900", "gray.200")}
                        _hover={{
                          textDecoration: "none",
                          borderBottom: "2px solid #0A0A0A",
                          transition: "all 300ms ease-in-out",
                          color: "mode('gray.800', 'white')",
                        }}
                      >
                        {navItem.label}
                      </Link>
                    </PopoverTrigger>

                    {navItem.children && (
                      <PopoverContent
                        border={0}
                        boxShadow={"xl"}
                        bg={mode("white", "gray.800")}
                        p={4}
                        rounded={"xl"}
                        minW={"sm"}
                      >
                        <Stack>
                          {navItem.children.map((child) => (
                            <DesktopSubNav key={child.label} {...child} />
                          ))}
                        </Stack>
                      </PopoverContent>
                    )}
                  </Popover>
                </Box>
              ))}
            </Stack>
          </Flex>
        </Flex>
        {!userInfo && (
          <Stack
            flex={{ base: 1, md: 0 }}
            justify={"flex-end"}
            direction={"row"}
            spacing={6}
          >
            <Button onClick={toggleColorMode} left={4}>
              {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
            </Button>
            <Button
              as={"a"}
              fontSize={"md"}
              mr={5}
              fontWeight={500}
              variant={"link"}
              href={"/cart"}
              color={mode("gray.500", "gray.200")}
              leftIcon={<FaShoppingBag />}
              _hover={{
                color: "pink.400",
              }}
            >
              <NotificationBadge
                count={cartItems.length}
                effect={Effect.ROTATE_X}
                style={{ backgroundColor: "#ED64A6" }}
              />
              Bag
            </Button>

            <Button
              as={"a"}
              fontSize={"sm"}
              fontWeight={400}
              variant={"link"}
              href={"/login"}
              _hover={{
                color: "pink.400",
              }}
            >
              Sign In
            </Button>
            <Button
              display={{ base: "none", md: "inline-flex" }}
              fontSize={"sm"}
              fontWeight={600}
              color={"white"}
              bg={"pink.400"}
              href={"/register"}
              _hover={{
                bg: "pink.300",
              }}
            >
              Sign Up
            </Button>
          </Stack>
        )}
        {userInfo && (
          <Flex alignItems={"center"} spacing={6}>
            <Button onClick={toggleColorMode} mr={5} size="xs">
              {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
            </Button>
            <Button
              as={"a"}
              fontSize={"md"}
              mr={5}
              fontWeight={500}
              variant={"link"}
              href={"/cart"}
              color={mode("gray.500", "gray.200")}
              leftIcon={<FaShoppingBag />}
              _hover={{
                color: "pink.400",
              }}
            >
              <NotificationBadge
                count={cartItems.length}
                effect={Effect.ROTATE_X}
                style={{ backgroundColor: "#ED64A6" }}
              />
              Bag
            </Button>
            <Menu>
              <MenuButton
                py={2}
                transition="all 0.3s"
                _focus={{ boxShadow: "none" }}
              >
                <HStack>
                  <Avatar
                    size={"sm"}
                    name={userInfo.name}
                    src={"https://bit.ly/broken-link"}
                  />
                  <VStack
                    display={{ base: "none", md: "flex" }}
                    alignItems="flex-start"
                    spacing="1px"
                    ml="2"
                  >
                    <Text fontSize="sm">{userInfo.name}</Text>
                    {userInfo.isAdmin && (
                      <Text fontSize="xs" color="gray.600">
                        Admin
                      </Text>
                    )}
                  </VStack>
                  <Box display={{ base: "none", md: "flex" }}>
                    <FiChevronDown />
                  </Box>
                </HStack>
              </MenuButton>
              {userInfo.isAdmin ? (
                <MenuList
                  bg={mode("white", "gray.900")}
                  borderColor={mode("gray.200", "gray.700")}
                  zIndex={"4"}
                >
                  <Link href="">
                    <MenuItem>Profile & Orders</MenuItem>
                  </Link>
                  <Link href="">
                    <MenuItem>Users</MenuItem>
                  </Link>
                  <Link href="">
                    <MenuItem>Products</MenuItem>
                  </Link>
                  <Link href="">
                    <MenuItem>Orders</MenuItem>
                  </Link>
                  <MenuDivider />
                  <Link onClick={logoutHandler}>
                    <MenuItem>Sign out</MenuItem>
                  </Link>
                </MenuList>
              ) : (
                <MenuList
                  bg={mode("white", "gray.900")}
                  borderColor={mode("gray.200", "gray.700")}
                  zIndex={"4"}
                >
                  <Link href="">
                    <MenuItem>Profile & Orders</MenuItem>
                  </Link>
                  <MenuDivider />
                  <Link onClick={logoutHandler}>
                    <MenuItem onClick={logoutHandler}>Sign out</MenuItem>
                  </Link>
                </MenuList>
              )}
            </Menu>
          </Flex>
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  );
}

export default Header;
