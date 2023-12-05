import { Col, Row, ListGroup, Form } from "react-bootstrap";
import { useGetProductsQuery } from "../slices/productsApiSlice";
import Product from "../components/Product";
import Loader from "../components/Loader";
import Message from "../components/Message";

function AllProducts() {
  const { data: products, isLoading, error } = useGetProductsQuery();
  return (
    <div className="page-all-products">
      <div className="container">
        <Row>
          <Col md={3}>
            <div className="side-filter">
              <h5>Category</h5>
              <ListGroup>
                <ListGroup.Item>
                  <Form.Check type="checkbox" label="Category 1" />
                </ListGroup.Item>
                <ListGroup.Item>
                  <Form.Check type="checkbox" label="Category 2" />
                </ListGroup.Item>
              </ListGroup>

              <h5>Price</h5>
              <ListGroup>
                <ListGroup.Item>
                  <Form.Check type="checkbox" label="$0 - $50" />
                </ListGroup.Item>
                <ListGroup.Item>
                  <Form.Check type="checkbox" label="$50 - $100" />
                </ListGroup.Item>
              </ListGroup>

              <h5>Rating</h5>
              <ListGroup>
                <ListGroup.Item>
                <Form.Check type="checkbox" label={<><i className="star-filter bi bi-star-fill"></i><i className="star-filter bi bi-star-fill"></i><i className="star-filter bi bi-star-fill"></i><i className="star-filter bi bi-star-fill"></i></>} />
                </ListGroup.Item>
                <ListGroup.Item>
                <Form.Check type="checkbox" label={<><i className="star-filter bi bi-star-fill"></i><i className="star-filter bi bi-star-fill"></i><i className="star-filter bi bi-star-fill"></i></>} />
                </ListGroup.Item>
                <ListGroup.Item>
                <Form.Check type="checkbox" label={<><i className="star-filter bi bi-star-fill"></i><i className="star-filter bi bi-star-fill"></i></>} />
                </ListGroup.Item>
                <ListGroup.Item>
                <Form.Check type="checkbox" label={<><i className="star-filter bi bi-star-fill"></i></>} />
                </ListGroup.Item>
              </ListGroup>
            </div>
          </Col>

          <Col md={9}>
            <div className="show-products">
              <Row>
                {isLoading ? (
                  <Loader></Loader>
                ) : error ? (
                  <Message variant={"danger"}>
                    {error?.data?.message || error.error}
                  </Message>
                ) : (
                  <div className="all-products">
                    <Row>
                      {products.map((product) => {
                        return (
                          <Col key={product._id} sm={12} md={4} lg={4} lx={3}>
                            <Product
                              className="product"
                              product={product}
                            ></Product>
                          </Col>
                        );
                      })}
                    </Row>
                  </div>
                )}
              </Row>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default AllProducts;
