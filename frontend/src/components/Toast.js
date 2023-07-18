import { useToast } from "@chakra-ui/react";
import React from "react";

function Toast({ title, children, variant }) {
  const toast = useToast();
  return toast({
    title: { title },
    description: { children },
    status: { variant },
    duration: 9000,
    isClosable: true,
  });
}

export default Toast;
