import { Alert, AlertIcon } from "@chakra-ui/react";
import React from "react";
function Message({ variant, children }) {
  // return <Alert variant={variant}>{children}</Alert>;
  return (
    <Alert status={variant} key={children}>
      <AlertIcon />
      {children}
    </Alert>
  );
}

export default Message;
