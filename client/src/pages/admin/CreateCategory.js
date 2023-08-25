import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import Layout from "../../components/layout/Layout";
import axios from "axios";
import { Button, Table } from "react-bootstrap";
import CategoryForm from "../../components/form/CategoryForm";
import { Modal } from "antd";
const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");

  const handleSubmit = async (e) => {
    try {
      const { data } = await axios.post(
        `http://localhost:8080/api/v1/category/create-category`,
        { name }
      );
      if (data.success) {
        toast.success(`${name} is created`);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("soemthing went wrong tryagain");
    }
  };
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `http://localhost:8080/api/v1/category/update-category/${selected._id}`,
        { name: updatedName }
      );
      if (data.success) {
        toast.success(data.message);
        setSelected(null);
        setUpdatedName("");
        setVisible(false);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("someething went wronggg");
    }
  };
  const handleDelete = async (pId) => {
    try {
      const { data } = await axios.delete(
        `http://localhost:8080/api/v1/category/delete-category/${pId}`
      );
      if (data.success) {
        toast.success("category is deleted");

        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("someething went wronggg");
    }
  };
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/category/get-category`
      );
      if (data.success) {
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

  return (
    <>
      <Layout>
        <div className="m-3 p-3">
          <h1>Manage Category</h1>
          <div className="p-3">
            <CategoryForm
              handleSubmit={handleSubmit}
              value={name}
              setValue={setName}
            />
          </div>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col"> actions</th>
              </tr>
            </thead>
            <tbody>
              {categories?.map((c) => (
                <>
                  <tr>
                    <td key={c._id}>{c.name}</td>

                    <td>
                      <Button
                        variant="info"
                        onClick={() => {
                          setVisible(true);
                          setUpdatedName(c.name);
                          setSelected(c);
                        }}
                      >
                        edit
                      </Button>{" "}
                      <Button
                        onClick={() => {
                          handleDelete(c._id);
                        }}
                        variant="danger"
                      >
                        Delete
                      </Button>{" "}
                    </td>
                  </tr>
                </>
              ))}
            </tbody>
          </Table>
          <Modal
            onCancel={() => setVisible(false)}
            footer={null}
            visible={visible}
          >
            <CategoryForm
              value={updatedName}
              setValue={setUpdatedName}
              handleSubmit={handleUpdate}
            />
          </Modal>
        </div>
      </Layout>
    </>
  );
};

export default CreateCategory;
