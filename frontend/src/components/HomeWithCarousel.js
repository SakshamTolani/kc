import React from "react";
import HomeScreen from "../screens/HomeScreen";
import ProductCarousel from "./ProductCarousel";

function HomeWithCarousel() {
  return (
    <div>
      <ProductCarousel />
      <HomeScreen />
    </div>
  );
}

export default HomeWithCarousel;
