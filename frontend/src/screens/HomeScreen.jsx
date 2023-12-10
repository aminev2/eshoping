import React, { useEffect } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { useGetProductsQuery } from "../slices/productsApiSlice";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, selectCart } from "../slices/cartSlice";
import { useNavigate } from "react-router-dom";
import Product from "../components/Product";
import Loader from "../components/Loader";
import Message from "../components/Message";
import OffCanvasCartScreen from "../screens/OffCanvasCartScreen";
import Carousel from "react-bootstrap/Carousel";
import Categories from "../components/Categories";
import Testimonial from "../components/Testimonial";
import Value from "../components/Value";
import NavBarCategories from "../components/NavBarCategories";
import { useGetAllCategoriesQuery } from "../slices/categoriesApiSlice";

import ChooseUs from "../components/ChooseUs";

import SeasonSection from "../components/SeasonSection";
import HeaderVideo from "../components/HeaderVideo";


const HomeScreen = () => {
  const {
    data: products,
    isLoading: isLoadingProducts,
    error,
    refetch,
  } = useGetProductsQuery();
  const {
    data: categories,
    isLoading: isLoadingCategories,
    error: categoriesError,
    refetch: refetchCategories,
  } = useGetAllCategoriesQuery();
  // Redux hooks for accessing state and dispatching actions
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector(selectCart);
  const { cartItems } = cart;

  // Handles the addition of a product to the shopping cart.

  const addToCartHandler = async (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };

  return (
    <>
      {!isLoadingCategories && !isLoadingProducts && (
        <NavBarCategories
          categories={categories}
          products={products}
        ></NavBarCategories>
      )}
    
      <HeaderVideo />
      <SeasonSection />

      <ChooseUs></ChooseUs>
      <Categories />
        
      <div className="container">
        <div className="last-posts">
          {isLoadingProducts ? (
            <Loader></Loader>
          ) : error ? (
            <Message variant={"danger"} className={"text-center"}>
              {
                "We're sorry, but we encountered an issue while processing your request."
              }
            </Message>
          ) : (
            <section className="last-products">
              <h2 className="title">Latest products</h2>
              <span className="line-title"></span>

              <Row className="text-center">
                <Carousel indicators={false} variant="dark" interval={2500}>
                  <Carousel.Item>
                    <Row>
                      {products?.slice(0, 4).map((product) => {
                        return (
                          <Col key={product._id} sm={12} md={4} lg={3} lx={3}>
                            <Product className="product" product={product}>
                              {
                                <OffCanvasCartScreen
                                  disabled={product.countInStock <= 0}
                                  onClick={() => addToCartHandler(product, 1)}
                                >
                                  add to cart
                                </OffCanvasCartScreen>
                              }
                            </Product>
                          </Col>
                        );
                      })}
                    </Row>
                  </Carousel.Item>

                  <Carousel.Item>
                    <Row>
                      {products?.slice(0, 4).map((product) => {
                        return (
                          <Col key={product._id} sm={12} md={4} lg={3} lx={3}>
                            <Product className="product" product={product}>
                              {
                                <OffCanvasCartScreen
                                  disabled={product.countInStock <= 0}
                                  onClick={() => addToCartHandler(product, 1)}
                                >
                                  add to cart
                                </OffCanvasCartScreen>
                              }
                            </Product>
                          </Col>
                        );
                      })}
                    </Row>
                  </Carousel.Item>
                </Carousel>

                <Col>
                  <Button onClick={() => navigate("/products")}>
                    Show more
                  </Button>
                </Col>

            </section>
          )}
        </div>
      </div>

      <Testimonial />
      <Value />
      <button
        className="top"
        onClick={() => window.scrollTo(0, 0)}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
        }}
      >
        <i className="bi bi-chevron-up"></i>
      </button>
    </>
  );
};

export default HomeScreen;
