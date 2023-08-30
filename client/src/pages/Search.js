import React from "react";
import Layout from "../components/layout/Layout";
import { useSearch } from "../context/Search";
import { Button } from "react-bootstrap";

const Search = () => {
  const [values, setValues] = useSearch();
  return (
    <>
      <Layout>
        <div className="container">
          <div className="text-center">
            <h1>Search Results</h1>
            <h6>
              {values?.results.length < 1
                ? "no products found "
                : `Found ${values?.results.length}`}
            </h6>
            <div className="d-flex flex-wrap ">
              {values?.results.map((p) => (
                <div className="card m-2" style={{ width: "18rem" }}>
                  <img
                    src={`http://localhost:8080/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{p.name}</h5>
                    <p className="card-text">
                      {p.description.substring(0, 30)}...
                    </p>
                    <p className="card-text">${p?.price}</p>
                    <Button variant="info">More Details</Button>{" "}
                    <Button variant="outline-info">Add to Cart</Button>{" "}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};
export default Search;
