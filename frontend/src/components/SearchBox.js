import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
function SearchBox() {
  const [keyword, setKeyword] = useState("");

  let history = useHistory();
  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword) {
      history.push(`/?keyword=${keyword}&page=1`);
    } else {
      history.push(history.location.pathname);
    }
  };
  return (
    <Form onSubmit={submitHandler} className="d-flex">
      <Form.Control
        type="text"
        name="q"
        placeholder="Search Product"
        onChange={(e) => setKeyword(e.target.value)}
        className="mr-sm-2 ml-sm-5 mt-2"
      ></Form.Control>

      <Button type="submit" variant="outline-success" className="p-2 mt-2">
        Submit
      </Button>
    </Form>
  );
}

export default SearchBox;
