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

const HomeScreen = () => {
  const { data: products, isLoading, error, refetch } = useGetProductsQuery();
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
      {!isLoading && (
        <NavBarCategories
          categories={categories}
          products={products}
        ></NavBarCategories>
      )}

      <div className="header-video">
        <div className="video-container">
          <video className="background-video" autoPlay loop muted>
            <source
              src="https://res.cloudinary.com/doye6tvxz/video/upload/v1701812558/background2-video_online-video-cutter.com_rztuey.mp4"
              type="video/mp4"
            />
          </video>
          <div className="content-video">
            <h1>Welcome to Advenshop</h1>
            <p>Find the best outdoor gear for your next adventure</p>

            <button
              className="btn btn-primary"
              onClick={() => navigate("/products")}
            >
              Shop Now
            </button>
          </div>
        </div>
      </div>

      <ChooseUs></ChooseUs>
      <Categories />
      <div className="container">
        <div className="last-posts">
          {isLoading ? (
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
              <Row>
                <Carousel indicators={false} variant="dark">
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
              </Row>
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
