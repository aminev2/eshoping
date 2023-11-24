import React from "react";
import { Row, Col } from "react-bootstrap";
import { useGetProductsQuery } from "../slices/productsApiSlice";
import Product from "../components/Product";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Carousel from "../components/Carousel";

const HomeScreen = () => {
  const { data: products, isLoading, error } = useGetProductsQuery();

  return (
    <>
      <Carousel></Carousel>
      <div className="container">
        <div className="last-posts">
        {isLoading ? (
        <Loader></Loader>
      ) : error ? (
        <Message variant={"danger"}>
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <div>
          <h2>Latest Products</h2>
          <Row>
            {products.slice(0, 4).map((product) => {
              return (
                <Col key={product._id} sm={12} md={4} lg={3} lx={3}>
                  <Product className="product" product={product}></Product>
                </Col>
              );
            })}
          </Row>
        </div>
      )}

        </div>

      </div>

    </>
  );
};

export default HomeScreen;
