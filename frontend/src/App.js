import Footer from "./components/Footer";
import Header from "./components/Header";

import { BrowserRouter as Router, Link, Route } from "react-router-dom";

import AnimatedRoutes from "./components/AnimatedRoutes";
import ScrollToTop from "./components/ScrollToTop";
import ProductCarousel from "./components/ProductCarousel";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Header />
      {/* <ProductCarousel /> */}
      <AnimatedRoutes />
      {/* <div>
        <Col
          style={{
            fontFamily: "Times, 'Times New Roman', Georgia, serif",
            backgroundColor: "yellow",
            padding: "40px 20px",
            textAlign: "center",
          }}
        >
          <span
            style={{
              display: "inline-block",
              marginRight: "110px",
            }}
          >
            <h1>Join our family and get 10% OFF</h1>
          </span>
          <p style={{ display: "inline-block" }}>
            <Button style={{ marginBottom: "0.7rem" }}>
              <Link
                to="/register"
                style={{
                  color: "white",
                  fontFamily: "'Nunito Sans'",
                  fontSize: "1.5rem",
                }}
              >
                Sign Up{"  "}
                <i className="fas fa-arrow-right"></i>
              </Link>
            </Button>
          </p>
        </Col>
      </div> */}
      <Footer />
    </Router>
  );
}

export default App;
