import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import Layout from "../../components/layout/Layout";
import { Link } from "react-router-dom";

const Products = () => {
  const [product, setProduct] = useState([]);
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/product/get-product`
      );
      setProduct(data.products);
    } catch (error) {
      console.log(error);
      toast.error("something twent wrong");
    }
  };
  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <>
      <Layout>
        <div className="col-md-9 p-3">
          <h1>ALL PRODUCTS LISTS</h1>
          <div className="d-flex">
            {product?.map((p) => (
              <Link
                key={p._id}
                to={`/dashboard/admin/product/${p.slug}`}
                className="product-link"
              >
                <div className="card m-2" style={{ width: "18rem" }}>
                  <img
                    src={`http://localhost:8080/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{p.name}</h5>
                    <p className="card-text">{p.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Products;
