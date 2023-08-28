import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import { useAuth } from "../context/auth";
import axios from "axios";
import { toast } from "react-hot-toast";
const HomePage = () => {
  const [auth, setAuth] = useAuth();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/product/get-product`
      );
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };
  useEffect(() => {
    getAllProducts();
  }, []);
  return (
    <div>
      <Layout>
        <h1>Homepage</h1>
        <div className="row mt-3">
          <div className="col-md-3">
            <h3 className="text-center">filter by category</h3>
          </div>
          <div className="col-md-9">
            <h1 className="text-center"> all Products</h1>
          </div>

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
                    <p className="card-text">{p?.description}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
        {/* <pre>{JSON.stringify(auth, null, 4)}</pre> */}
      </Layout>
    </div>
  );
};

export default HomePage;
