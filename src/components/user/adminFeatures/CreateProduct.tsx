import { Box, Typography, TextField, Button } from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../../store/hooks";
import { RootState } from "../../../store/store";
import { CreateNewProduct } from "../../../interface/CreateProductInterface";
import { ImagesObject } from "../../../interface/UpdateProductInterface";
import { createProductThunk } from "../../../store/thunksFunctions/productsThunks/createProductThunk";

export const CreateProduct = () => {
  const initValues: CreateNewProduct = {
    title: "",
    price: 0,
    description: "",
    images: [],
    categoryId: 0,
  };
  const [values, setValues] = useState<CreateNewProduct>(initValues);
  const [images, setImages] = useState<ImagesObject>({});

  const selectProduct = useSelector(
    (state: RootState) => state.product.products
  );
  const selectCategory = useSelector(
    (state: RootState) => state.category.categories
  );
  const dispatch = useAppDispatch();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };
  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const imgName = e.target.name;
    const imgVal = e.target.value;
    setImages({ ...images, [imgName]: imgVal });
  };
  const handleCreateUser = () => {
    const imagesToAdd = [images.img1, images.img2, images.img3];
    const newProduct = {
      title: values.title,
      price: values.price,
      description: values.description,
      categoryId: values.categoryId,
      images: imagesToAdd,
    };
    dispatch(createProductThunk(newProduct as CreateNewProduct));
  };

  return (
    <>
      <Box>
        <Typography variant={"h4"} sx={{ mt: "2rem" }}>
          Create product
        </Typography>
        <Box
          sx={{
            my: "1rem",
            display: "flex",
            flexDirection: "column",
            flexFlow: "row wrap",
            gap: "1rem",
          }}
        >
          <TextField
            label="New title"
            name="title"
            onChange={(e) => handleChange(e)}
          />
          <TextField
            label="New Description"
            name="description"
            onChange={(e) => handleChange(e)}
          />
          <TextField
            label="New Price"
            name="price"
            type="number"
            onChange={(e) => handleChange(e)}
          />
          <TextField
            label="New category ID"
            name="categoryId"
            onChange={(e) => handleChange(e)}
          />
          <TextField
            label="Link to image 1"
            name="img1"
            onChange={(e) => handleImageChange(e)}
          />
          <TextField
            label="Link to image 1"
            name="img2"
            onChange={(e) => handleImageChange(e)}
          />
          <TextField
            label="Link to image 1"
            name="img3"
            onChange={(e) => handleImageChange(e)}
          />
        </Box>
        <Button onClick={() => handleCreateUser()} variant="contained">
          Create product
        </Button>
      </Box>
    </>
  );
};
