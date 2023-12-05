import { Col, Row, ListGroup, Form } from "react-bootstrap";
import { useGetProductsQuery } from "../slices/productsApiSlice";
import { useGetAllCategoriesQuery } from "../slices/categoriesApiSlice";
import Product from "../components/Product";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useEffect, useState } from "react";
import Rating from "../components/Rating";

function AllProducts() {
  const {
    data,
    isLoading: isLoadingProducts,
    error,
    refetch: refetchProducts,
  } = useGetProductsQuery();
  const {
    data: categories,
    isLoading: isLoadingCategories,
    error: categoriesError,
    refetch,
  } = useGetAllCategoriesQuery();
  const [products, setProducts] = useState(isLoadingProducts ? [] : data);
  const [minPrice, setMinPrice] = useState();
  const [maxPrice, setMaxPrice] = useState();
  const [category, setCategory] = useState();
  const [search, setSearch] = useState();

  useEffect(() => {
    let filteredProducts = data; // Initialize with the original data

    if (category) {
      filteredProducts = data?.filter(
        (product) => product.category === category
      );

      setProducts(filteredProducts);
    } else {
      setProducts(data);
    }

    /**
     * const searchChangeHandler = (event) => {
    setSearch(event.target.value);
    const filteredProducts = products?.filter((product) =>
      product.name.toLowerCase().includes(search.toLowerCase())
    );
    setProducts(filteredProducts);
  };
     */
  }, [category, data, search]);

  return (
    <div className="page-all-products">
      <div className="container">
        <Row>
          <Col md={3}>
            <div className="side-filter">
              <h5>Search</h5>
              <ListGroup>
                <Form.Control
                  type="text"
                  placeholder="Search"
                  value={search}
                  aria-label="Disabled input example"
                  onChange={(event) => setSearch(event.target.value)}
                />
              </ListGroup>

              <h5>Category</h5>
              <ListGroup>
                <ListGroup.Item>
                  <Form.Check
                    defaultChecked
                    type="radio"
                    label="all"
                    name="category"
                    onClick={() => setProducts(data)}
                  />
                </ListGroup.Item>
                {!isLoadingCategories &&
                  !categoriesError &&
                  categories?.map((category) => {
                    return (
                      <ListGroup.Item key={category._id}>
                        <Form.Check
                          type="radio"
                          label={category.name}
                          value={category._id}
                          name="category"
                          onClick={(event) => setCategory(event.target.value)}
                        />
                      </ListGroup.Item>
                    );
                  })}
              </ListGroup>
              <h5>Price</h5>
              <ListGroup>
                <ListGroup.Item>
                  <Form.Check type="radio" label="$0 - $25" />
                </ListGroup.Item>
                <ListGroup.Item>
                  <Form.Check type="radio" label="$25 - $50" />
                </ListGroup.Item>
                <ListGroup.Item>
                  <Form.Check type="radio" label="$50 - $100" />
                </ListGroup.Item>
                <ListGroup.Item>
                  <Form.Check type="radio" label="$100 - $200" />
                </ListGroup.Item>
                <ListGroup.Item>
                  <Form.Check type="radio" label="$200 - above" />
                </ListGroup.Item>
              </ListGroup>

              <h5>Rating</h5>
              <ListGroup>
                <ListGroup.Item>
                  <Form.Check
                    type="radio"
                    label={
                      <>
                        <Rating ratingValue={4} addRate></Rating>
                      </>
                    }
                  />
                </ListGroup.Item>
                <ListGroup.Item className="d-flex align-content-center">
                  <Form.Check
                    type="radio"
                    label={<Rating ratingValue={3} addRate></Rating>}
                  />
                </ListGroup.Item>
                <ListGroup.Item>
                  <Form.Check
                    type="radio"
                    label={<Rating ratingValue={2} addRate></Rating>}
                  />
                </ListGroup.Item>
                <ListGroup.Item>
                  <Form.Check
                    type="radio"
                    label={<Rating ratingValue={1} addRate></Rating>}
                  />
                </ListGroup.Item>
              </ListGroup>
            </div>
          </Col>

          <Col md={9}>
            <div className="show-products">
              <Row>
                {isLoadingProducts ? (
                  <Loader></Loader>
                ) : error ? (
                  <Message variant={"danger"}>
                    {error?.data?.message || error.error}
                  </Message>
                ) : (
                  <div className="all-products">
                    <Row>
                      {products?.map((product) => {
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
