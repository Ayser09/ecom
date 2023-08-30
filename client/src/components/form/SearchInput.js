import React from "react";
import { useSearch } from "../../context/Search";
import { Button, Form } from "react-bootstrap";
import { Input } from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const SearchInput = () => {
  const [values, setValues] = useSearch();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/product/search/${values.keyword}`
      );
      setValues({ ...values, results: data });
      navigate("/search");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Form className="d-flex" role="search" onSubmit={handleSubmit}>
        <Input
          className="form-control me-2"
          type="search"
          placeholder="Search"
          value={values.keyword}
          onChange={(e) => setValues({ ...values, keyword: e.target.value })}
          aria-label="Search "
        />
        <Button variant="info" type="submit">
          Search
        </Button>
      </Form>
    </div>
  );
};

export default SearchInput;
