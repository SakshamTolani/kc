import {
  AbsoluteCenter,
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Center,
  Divider,
  Flex,
  HStack,
  Link,
  LinkBox,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import { Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { ChevronRightIcon } from "@chakra-ui/icons";

const properties = {
  top: {
    transform: "skew(var(--arrow-skew))",
    borderToOmit: "borderBottom",
  },
  bottom: {
    transform: "skew(calc(var(--arrow-skew) * -1))",
    borderToOmit: "borderTop",
  },
};
const StepContent = (props) => (
  <AbsoluteCenter height="full" width="full" position="absolute" zIndex={1}>
    <Center height="full" fontSize="sm" fontWeight="semibold" {...props} />
  </AbsoluteCenter>
);
const SkewBox = ({ placement, isCurrent, ...rest }) => {
  const defaultColor = useColorModeValue("white", "gray.800");
  const accentColor = useColorModeValue("blue.500", "blue.300");
  const hoverBgColor = useColorModeValue("gray.100", "gray.700");

  const { borderToOmit, transform } = properties[placement];
  const placementProps = {
    [placement]: 0,
    transform,
    [borderToOmit]: "0",
    borderColor: isCurrent ? accentColor : undefined,
  };

  return (
    <Box
      aria-hidden
      bg={isCurrent ? accentColor : defaultColor}
      borderWidth="1px"
      position="absolute"
      height="50%"
      _groupHover={{
        bg: !isCurrent ? hoverBgColor : undefined,
      }}
      _groupFocus={{
        border: "2px solid",
        borderColor: useColorModeValue("blue.200", "blue.300"),
        [borderToOmit]: "0",
      }}
      width="full"
      {...placementProps}
      {...rest}
    />
  );
};

const Step = ({ children, isCurrent }) => {
  const color = useColorModeValue("white", "gray.900");
  return (
    <Box as="li" flex="1">
      <Box as="button" outline={0} className="group" width="full">
        <Flex
          align="center"
          height="12"
          justify="center"
          position="relative"
          css={{ "--arrow-skew": "20deg" }}
        >
          <SkewBox isCurrent={isCurrent} placement="top" />
          <StepContent color={isCurrent ? color : "inherit"}>
            {children}
          </StepContent>
          <SkewBox isCurrent={isCurrent} placement="bottom" />
        </Flex>
      </Box>
    </Box>
  );
};
function CheckoutSteps({ step1, step2, step3, step4 }) {
  return (
    // <Nav className="justify-content-center mb-4">
    //   <Nav.Item>
    //     {step1 ? (
    //       <LinkContainer to="/login">
    //         <Nav.Link>Login</Nav.Link>
    //       </LinkContainer>
    //     ) : (
    //       <Nav.Link disabled>Login</Nav.Link>
    //     )}
    //   </Nav.Item>

    //   <Nav.Item>
    //     {step2 ? (
    //       <LinkContainer to="/shipping">
    //         <Nav.Link>Shipping</Nav.Link>
    //       </LinkContainer>
    //     ) : (
    //       <Nav.Link disabled>Shipping</Nav.Link>
    //     )}
    //   </Nav.Item>

    //   <Nav.Item>
    //     {step3 ? (
    //       <LinkContainer to="/payment">
    //         <Nav.Link>Payment</Nav.Link>
    //       </LinkContainer>
    //     ) : (
    //       <Nav.Link disabled>Payment</Nav.Link>
    //     )}
    //   </Nav.Item>

    //   <Nav.Item>
    //     {step4 ? (
    //       <LinkContainer to="/placeorder">
    //         <Nav.Link>Place Order</Nav.Link>
    //       </LinkContainer>
    //     ) : (
    //       <Nav.Link disabled>Place Order</Nav.Link>
    //     )}
    //   </Nav.Item>
    // </Nav>
    // <Breadcrumb
    //   spacing="16px"
    //   mb={5}
    //   fontWeight="medium"
    //   fontSize="md"
    //   separator={<ChevronRightIcon color="gray.500" />}
    // >
    //   {step1 ? (
    //     <BreadcrumbItem>
    //       <BreadcrumbLink href="/login">Login</BreadcrumbLink>
    //     </BreadcrumbItem>
    //   ) : (
    //     <Text fontWeight="100" _hover={{ cursor: "not-allowed" }}>
    //       Login
    //     </Text>
    //   )}
    //   {step2 ? (
    //     <BreadcrumbItem>
    //       <BreadcrumbLink href="/shipping">Shipping</BreadcrumbLink>
    //     </BreadcrumbItem>
    //   ) : (
    //     <Text fontWeight="100" _hover={{ cursor: "not-allowed" }}>
    //       Shipping
    //     </Text>
    //   )}
    //   <BreadcrumbItem>
    //     {step3 ? (
    //       <BreadcrumbLink href="/payment">Payment</BreadcrumbLink>
    //     ) : (
    //       <Text fontWeight="100" _hover={{ cursor: "not-allowed" }}>
    //         Payment
    //       </Text>
    //     )}
    //   </BreadcrumbItem>
    //   <BreadcrumbItem>
    //     {step4 ? (
    //       <BreadcrumbLink href="/placeorder">Place Order</BreadcrumbLink>
    //     ) : (
    //       <Text fontWeight="100" _hover={{ cursor: "not-allowed" }}>
    //         Place Order
    //       </Text>
    //     )}
    //   </BreadcrumbItem>
    // </Breadcrumb>
    <Box mx="auto" maxW="3xl" py="10" px={{ base: "6", md: "8" }}>
      <nav aria-label="Progress steps">
        <HStack as="ol" listStyleType="none" spacing="0">
          {step1 && (
            <Step isCurrent>
              <Link>Login</Link>
            </Step>
          )}{" "}
          {step2 && (
            <Step isCurrent>
              <Link href={"/shipping"}>Shipping</Link>
            </Step>
          )}{" "}
          {step3 && (
            <Step isCurrent>
              <Link>Payment</Link>
            </Step>
          )}{" "}
          {step4 && (
            <Step isCurrent>
              <Link>Place Order</Link>
            </Step>
          )}
        </HStack>
      </nav>
    </Box>
  );
}

export default CheckoutSteps;
