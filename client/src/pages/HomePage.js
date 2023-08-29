import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";

import axios from "axios";
import Button from "react-bootstrap/Button";

import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";
import { useAuth } from "../context/auth";
const HomePage = () => {
  const [auth, setAuth] = useAuth();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const getTotal = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/product/product-count`
      );
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/category/get-category`
      );
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);
  //have to add for get by categroyr function
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/product/get-product`
      );
      setProducts(data.products);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length]);
  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  const filterProduct = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/product/product-filters`,
        { checked, radio }
      );
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <div>
      <Layout>
        <h1>Homepage</h1>
        <div className="row mt-3 p-3">
          <div className="col-md-3">
            <h3 className="text-center mt-4">filter by price</h3>
            <div className="d-flex flex-column">
              <div className="d-flex flex-column">
                <button
                  className="btn btn-danger"
                  onClick={() => window.location.reload()}
                >
                  Reset filter
                </button>
              </div>
              <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                {Prices?.map((p) => (
                  <div key={p._id}>
                    <Radio value={p.array}>{p.name}</Radio>
                  </div>
                ))}
              </Radio.Group>
            </div>
            <h3 className="text-center">filter by category</h3>
            <div className="d-flex flex-column">
              {categories?.map((c) => (
                <Checkbox
                  key={c._id}
                  onChange={(e) => handleFilter(e.target.checked, c._id)}
                >
                  {c.name}
                </Checkbox>
              ))}
            </div>
          </div>

          <div className="col-md-9">
            {JSON.stringify(checked, null, 4)}
            {JSON.stringify(radio, null, 4)}
            <h1 className="text-center"> all Products</h1>
            <div className="d-flex flex-wrap ">
              {products &&
                products.map((p) => (
                  <div className="card m-2" style={{ width: "18rem" }}>
                    <img
                      src={`http://localhost:8080/api/v1/product/product-photo/${p._id}`}
                      className="card-img-top"
                      alt={p?.name}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{p?.name}</h5>
                      <p className="card-text">
                        {p?.description.substring(0, 30)}
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
        <div className="m-2 p-3">
          {products && products.length < total && (
            <Button
              variant="info"
              onClick={(e) => {
                e.preventDefault();
                setPage(page + 1);
              }}
            >
              {loading ? "Loading .." : "Loadmore"}
            </Button>
          )}
        </div>
        <pre>{JSON.stringify(auth, null, 4)}</pre>
      </Layout>
    </div>
  );
};

export default HomePage;
