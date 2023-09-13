import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Checkbox,
  VStack,
  Textarea,
  Toast,
} from "@chakra-ui/react";
import Layout from "../../components/layout/Layout";
import { toast } from "react-hot-toast";
import { Select } from "antd";
import { useNavigate } from "react-router-dom";
const { Option } = Select;
const CreateProduct = () => {
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [photo, setPhoto] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const navigate = useNavigate();
  //get all categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/category/get-category`
      );
      if (data?.success) {
        setCategories(data.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting categroy");
    }
  };
  useEffect(() => {
    getAllCategory();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("photo", photo);
      productData.append("category", category);
      productData.append("shipping", shipping);
      const { data } = await axios.post(
        `http://localhost:8080/api/v1/product/create-product`,
        // name,
        // description,
        // price,
        // quantity,
        // photo,
        // category,
        // shipping
        productData
      );
      if (data?.success) {
        navigate(`/dashboard/admin`);
        toast.success("product created successfully");
      } else {
        Toast.error("data.message");
        navigate(`/dashboard/admin/products`);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in creating prod");
    }
  };
  return (
    <>
      <Layout>
        <div className="m-3 p-3">
          <h1>Create Products</h1>
          <div className="p-3 m-1">
            <Select
              bordered={false}
              placeholder="select a category"
              size="large"
              showSearch
              className="form-select mb-3"
              onChange={(value) => {
                setCategory(value);
              }}
            >
              {categories?.map((c) => (
                <Option key={c._id} value={c._id}>
                  {c.name}
                </Option>
              ))}
            </Select>
            <div className="mb-3">
              <label className="btn btn-outline-secondary col-md-12">
                {photo ? photo.name : "upload photo"}
                <Input
                  type="file"
                  name="photo "
                  accept="image/*"
                  onChange={(e) => setPhoto(e.target.files[0])}
                  hidden
                />
              </label>
            </div>
            <div className="mb-3">
              {photo && (
                <div className="text-center">
                  <img
                    src={URL.createObjectURL(photo)}
                    alt="product photo"
                    height={"200px"}
                    className="img img-responsive "
                  />
                </div>
              )}
            </div>
            <div className="mb-3">
              <Input
                type="text"
                placeHolder={"Write a name"}
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
            </div>
            <div className="mb-3">
              <Textarea
                type="text"
                placeHolder={"Write a description"}
                onChange={(e) => setDescription(e.target.value)}
                value={description}
              />
            </div>
            <div className="mb-3">
              <VStack spacing={4}>
                <FormControl>
                  <FormLabel>Price</FormLabel>
                  <Input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Quantity</FormLabel>
                  <Input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                </FormControl>
                <FormControl>
                  <div className="mb-3">
                    <Select
                      bordered={false}
                      placeholder="Select Shipping "
                      size="large"
                      showSearch
                      className="form-select mb-3"
                      onChange={(value) => {
                        setShipping(value);
                      }}
                    >
                      <Option value="0">No</Option>
                      <Option value="1">Yes</Option>
                    </Select>
                  </div>
                </FormControl>
                <Button type="submit" colorScheme="teal" onClick={handleCreate}>
                  Create Product
                </Button>
              </VStack>

              {/* change this 17:50 */}
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default CreateProduct;
