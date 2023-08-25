import React from "react";
import {
  Container,
  FormControl,
  FormLabel,
  Input,
  Button,
  Heading,
} from "@chakra-ui/react";

const CategoryForm = ({ handleSubmit, value, setValue }) => {
  const handleCategoryChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <Container maxW="sm">
      <Heading as="h4" size="md" mb="4">
        Enter New Category
      </Heading>
      <form onSubmit={handleSubmit}>
        <FormControl id="category" mb="4">
          <FormLabel>Category</FormLabel>
          <Input
            type="text"
            placeholder="Enter category"
            value={value}
            onChange={handleCategoryChange}
          />
        </FormControl>
        <Button colorScheme="blue" type="submit" width="100%">
          Submit
        </Button>
      </form>
    </Container>
  );
};

export default CategoryForm;
