import React from "react";
import { Nav, NavDropdown, Image } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const NavBarCategories = ({ categories, products }) => {
  const navigate = useNavigate();
  return (
    <>
      <div className="nav-menu">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <ul className="navbar-nav navbar-menu">
            {categories?.slice(0, 4).map((category) => {
              return (
                <li
                  className="nav-item dropdown"
                  key={category._id}
                  onClick={() =>
                    navigate("/products", {
                      state: { category: category._id },
                    })
                  }
                >
                  <Link
                    className="nav-link dropdown-toggle nav-menu-link"
                    id="womenDropdown"
                    role="button"
                    data-toggle="dropdown"
                  >
                    {category.name}
                  </Link>
                  <div className="dropdown-menu">
                    {products?.map((product) => {
                      if (product.category === category._id) {
                        return (
                          <>
                            <Link
                              className="dropdown-item"
                              key={product._id}
                              to={`/products/${product._id}`}
                            >
                              <Image
                                src={product.image}
                                width={"25px"}
                                rounded
                              ></Image>{" "}
                              {product.name.substring(0, 50)}
                            </Link>
                          </>
                        );
                      }
                    })}
                  </div>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default NavBarCategories;
