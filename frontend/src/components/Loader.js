import { Spinner } from "@chakra-ui/react";
import React from "react";
// import { Spinner } from "react-bootstrap";
function Loader() {
  return (
    // <Spinner
    //   animation="grow"
    //   role="status"
    //   style={{
    //     height: "100px",
    //     width: "100px",
    //     margin: "auto",
    //     display: "block",
    //   }}
    // >
    //   <span>Loading...</span>
    // </Spinner>
    <Spinner
      thickness="4px"
      speed="0.65s"
      emptyColor="gray.200"
      color="blue.500"
      size="xl"
    >
      <span>Loading...</span>
    </Spinner>
  );
}

export default Loader;
