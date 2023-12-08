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
import Carousel from "../components/Carousel";
import Categories from "../components/Categories";
import Testimonial from "../components/Testimonial";
import Value from "../components/Value";
import NavBarCategories from "../components/NavBarCategories";
import { useGetAllCategoriesQuery } from "../slices/categoriesApiSlice";

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
          <source src="https://res.cloudinary.com/doye6tvxz/video/upload/v1701812558/background2-video_online-video-cutter.com_rztuey.mp4" type="video/mp4" />
        </video>
        <div className="content-video">
        <h1>Welcome to Advenshop</h1>
        <p>Find the best outdoor gear for your next adventure</p>
        
        <button className="btn btn-primary" onClick={()=>navigate("/products")}>Shop Now</button>
        </div>
      </div>
      </div>

      <section className="choose-us">
        <div className="container">
        <h2 className="title">Why Choose Us</h2>
            <span className="line-title"></span>
          <div className="row">
            <div className="col-md-4">
              <div className="choose-item">
                <i className="bi bi-diagram-3"></i>
                <h4>Expertly Curated Selection</h4>
                <p>
                  Our team of outdoor enthusiasts meticulously selects each
                  product to ensure it meets the highest standards of
                  performance and reliability
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="choose-item">
                <i className="bi bi-tree"></i>
                <h4>Passion for Adventure</h4>
                <p>
                  We don't just sell gear; we live and breathe the outdoor
                  lifestyle. Our passion for adventure fuels our dedication to
                  providing you with the best tools for your journey
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="choose-item">
                <i className="bi bi-nut"></i>
                <h4>Centric Approach</h4>
                <p>
                  Your satisfaction is our top priority. We are here to assist
                  you at every step, from choosing the right gear to ensuring a
                  smooth shopping experience
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
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
