import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";
import { listProductDetails, updateProduct } from "../actions/productActions";
import { PRODUCT_UPDATE_RESET } from "../constants/productConstants";
import axios from "axios";
import MultiSelect from "react-multiple-select-dropdown-lite";
import "react-multiple-select-dropdown-lite/dist/index.css";

function ProductEditScreen({ match, history }) {
  const productId = match.params.id;

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [lastPrice, setLastPrice] = useState(Number(price) - 300);
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [productType, setProductType] = useState("");
  const [productColour, setProductColour] = useState("");
  const [productHeel, setProductHeel] = useState("");
  const [productOccasion, setProductOccasion] = useState("");
  const [productUMaterial, setProductUMaterial] = useState("");
  const [sizes, setSizes] = useState("");
  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { error, loading, product } = productDetails;

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    error: errorUpdate,
    loading: loadingUpdate,
    success: successUpdate,
  } = productUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      history.push("/admin/productlist");
    } else {
      if (!product.name || product._id !== Number(productId)) {
        dispatch(listProductDetails(productId));
      } else {
        setName(product.name);
        setPrice(product.price);
        setLastPrice(product.lastPrice);
        setBrand(product.brand);
        setImage(product.image);
        setCategory(product.category);
        setProductType(product.productType);
        setProductColour(product.productColour);
        setProductHeel(product.productHeel);
        setProductOccasion(product.productOccasion);
        setProductUMaterial(product.productUMaterial);
        setCountInStock(product.countInStock);
        setSizes(product.sizes);
      }
    }
  }, [product, productId, history, dispatch, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateProduct({
        _id: productId,
        name,
        price,
        lastPrice,
        image,
        brand,
        category,
        countInStock,
        productType,
        productColour,
        productOccasion,
        productHeel,
        productUMaterial,
        sizes,
      })
    );
  };
  const options = [
    { label: "1 UK(S)", value: "1 UK(S)" },
    { label: "2 UK(S)", value: "2 UK(S)" },
    { label: "3 UK(S)", value: "3 UK(S)" },
    { label: "4 UK(S)", value: "4 UK(S)" },
    { label: "5 UK(S)", value: "5 UK(S)" },
    { label: "6 UK(S)", value: "6 UK(S)" },
    { label: "7 UK(S)", value: "7 UK(S)" },
    { label: "8 UK(S)", value: "8 UK(S)" },
    { label: "9 UK(S)", value: "9 UK(S)" },
    { label: "10 UK(S)", value: "10 UK(S)" },
    { label: "11 UK(S)", value: "11 UK(S)" },
    { label: "12 UK(S)", value: "12 UK(S)" },
    { label: "1 UK(L)", value: "1 UK(L)" },
    { label: "2 UK(L)", value: "2 UK(L)" },
    { label: "3 UK(L)", value: "3 UK(L)" },
    { label: "4 UK(L)", value: "4 UK(L)" },
    { label: "5 UK(L)", value: "5 UK(L)" },
    { label: "6 UK(L)", value: "6 UK(L)" },
    { label: "7 UK(L)", value: "7 UK(L)" },
    { label: "8 UK(L)", value: "8 UK(L)" },
  ];
  const uploadFileHandler = async (e) => {
    const files = e.target.files;
    const formData = new FormData();
    for (let i = 0; i < 4; i++) {
      formData.append(`image_one`, files[0]);
      formData.append(`image_two`, files[1]);
    }
    formData.append("product_id", productId);
    setUploading(true);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.post(
        "/api/products/upload/",
        formData,
        config
      );

      setImage(data);
      setUploading(false);
    } catch (error) {
      setUploading(false);
    }
  };
  const handleOnchange = (val) => {
    setSizes(val);
  };
  return (
    <motion.div
      initial={{ width: 0 }}
      animate={{ width: "100%" }}
      exit={{ x: window.innerWidth, transition: { duration: 0.1 } }}
    >
      <Link onClick={() => history.goBack()}>
        <i className="fas fa-arrow-left mr-1"></i>
        GO BACK
      </Link>

      <FormContainer>
        <h1>Edit Product</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                required
                type="name"
                placeholder="Enter name*"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="price">
              <Form.Label>Price</Form.Label>
              <Form.Control
                required
                type="number"
                placeholder="Enter price*"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="image">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter image"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>

              <Form.Control
                type="file"
                multiple
                onChange={uploadFileHandler}
                size="md"
              />
            </Form.Group>
            <Form.Group controlId="lastprice">
              <Form.Label>Last Price</Form.Label>
              <Form.Control
                required
                type="number"
                placeholder="Enter last price*"
                value={lastPrice}
                onChange={(e) => setLastPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="brand">
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter brand"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="countinstock">
              <Form.Label>Stock</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter stock"
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="sizes">
              <Form.Label>Sizes</Form.Label>
              <MultiSelect onChange={handleOnchange} options={options} />
            </Form.Group>
            <Form.Group controlId="category">
              <Form.Label>Category</Form.Label>
              <Form.Control
                required
                as="select"
                placeholder="Enter category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option>Select Category*</option>
                <option value="ladies">Ladies</option>
                <option value="kids">Kids</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="productType">
              <Form.Label>Product Type</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Product Type"
                value={productType}
                onChange={(e) => setProductType(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="productColour">
              <Form.Label>Product Colour</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Product Colour"
                value={productColour}
                onChange={(e) => setProductColour(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="productOccasion">
              <Form.Label>Product Occasion</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Product Occasion"
                value={productOccasion}
                onChange={(e) => setProductOccasion(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="productHeel">
              <Form.Label>Product Heel Type</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Heel Type"
                value={productHeel}
                onChange={(e) => setProductHeel(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="productUMaterial">
              <Form.Label>Product Upper Material</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Upper Material"
                value={productUMaterial}
                onChange={(e) => setProductUMaterial(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Button type="submit" variant="primary" className="mt-3">
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </motion.div>
  );
}

export default ProductEditScreen;
