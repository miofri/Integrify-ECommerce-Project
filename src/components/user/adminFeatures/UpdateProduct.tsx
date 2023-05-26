import {
  Box,
  Button,
  ImageList,
  ImageListItem,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState, store } from "../../../store/store";
import { Products } from "../../../interface/ProductsInterface";
import { Category } from "../../../interface/SingleProductInterface";
import { useAppDispatch } from "../../../store/hooks";
import { updateProductThunk } from "../../../store/thunksFunctions/productsThunks/updateProductThunk";
import {
  ImagesObject,
  ProductVals,
  updateImg,
} from "../../../interface/UpdateProductInterface";
import { uploadNewProductImageThunk } from "../../../store/thunksFunctions/productsThunks/uploadNewProductImageThunk";

export const UpdateProduct = () => {
  const [images, setImages] = useState<ImagesObject>({});
  const [values, setValues] = useState<ProductVals>({ id: 0 });
  const [updateImgValues, setUpdateImgValues] = useState<updateImg>();
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

  const handleReplaceImage = (productToUpdate: Products) => {
    /* This is to replace corresponding image with the correct index.
    For example if there's [img1, img2, img3] and we only want to replace only
    the 2nd image. */
    const updatedImageArray = productToUpdate?.images.map(
      (img, index: number) => {
        const imgIdentifier: string = `img${index + 1}`;

        if (images !== undefined && imgIdentifier in images) {
          return images[imgIdentifier as keyof typeof images];
        } else {
          return img;
        }
      }
    );
    return updatedImageArray as string[];
  };

  const handleFindCategory = (originalCategory: Category) => {
    const categoryCopy = [...selectCategory];
    const findCategory = categoryCopy.find(
      (cat) => cat.id === Number(values.categoryId)
    );

    if (findCategory === undefined) {
      return originalCategory;
    }
    return findCategory;
  };

  const handleFindProduct = (id: number) => {
    const IdProductToUpdate = id;
    const findProductToUpdate: Products | undefined = selectProduct.find(
      (prod) => prod.id === Number(IdProductToUpdate)
    );
    if (!findProductToUpdate) {
      window.alert("Product not found!");
      return;
    } else {
      return findProductToUpdate;
    }
  };
  const handleConsolidateObject = () => {
    const findProduct: Products | void = handleFindProduct(values.id);
    if (!findProduct) return;

    const productToUpdate = { ...findProduct };

    if (values.title !== undefined) {
      productToUpdate.title = values.title;
    }
    if (values.description !== undefined) {
      productToUpdate.description = values.description;
    }
    if (values.price !== undefined) {
      productToUpdate.price = Number(values.price);
    }
    productToUpdate.images = handleReplaceImage(productToUpdate);
    productToUpdate.category = handleFindCategory(productToUpdate.category);
    productToUpdate.updatedAt = new Date();
    dispatch(updateProductThunk(productToUpdate));
  };

  const handleUploadImageChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setUpdateImgValues({ ...updateImgValues, [name]: value });
  };

  const handleUploadImage = () => {
    if (updateImgValues?.id === undefined) {
      return window.alert("Product not found!");
    }
    const findProduct: Products | void = handleFindProduct(updateImgValues.id);
    if (findProduct === undefined) {
      return;
    }
    const imagesToUpdate = [...findProduct.images];
    console.log(
      imagesToUpdate !== undefined,
      updateImgValues.newImg !== undefined,
      imagesToUpdate.length > 3,
      imagesToUpdate.length
    );

    if (
      imagesToUpdate !== undefined &&
      updateImgValues.newImg !== undefined &&
      imagesToUpdate.length > 2
    ) {
      console.log("shifting");

      imagesToUpdate.shift();
      imagesToUpdate.push(updateImgValues.newImg);
    } else if (
      imagesToUpdate !== undefined &&
      updateImgValues.newImg !== undefined &&
      imagesToUpdate.length < 3
    ) {
      imagesToUpdate.push(updateImgValues.newImg);
      console.log("pushign");
    }
    const dispatchData = {
      img: imagesToUpdate,
      id: updateImgValues.id,
    };

    dispatch(uploadNewProductImageThunk(dispatchData));
  };

  return (
    <>
      <Box>
        <Typography variant={"h4"} sx={{ mt: "2rem" }}>
          Edit product
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
            required
            type="number"
            name="id"
            label="Product ID"
            onChange={(e) => handleChange(e)}
          />
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
        </Box>
        <Typography variant={"body1"}>Replace image</Typography>

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
            label="Link to new image"
            name="img1"
            onChange={(e) => handleImageChange(e)}
          />
          <TextField
            label="Link to new image"
            name="img2"
            onChange={(e) => handleImageChange(e)}
          />
          <TextField
            label="Link to new image"
            name="img3"
            onChange={(e) => handleImageChange(e)}
          />
        </Box>
        <Button variant="contained" onClick={() => handleConsolidateObject()}>
          Update product
        </Button>
      </Box>
      <Box
        sx={{
          my: "2rem",
        }}
      >
        <Typography variant="h4" sx={{ mb: "1rem" }}>
          Add new picture
        </Typography>
        <Typography variant="subtitle2" sx={{ mb: "1rem" }}>
          *If there is already more than three pictures, the oldest one will be
          replaced. <br /> If you want to replace an image, use "Replace image"
          above instead.
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            flexFlow: "row wrap",
            gap: "1rem",
          }}
        >
          <TextField
            required
            type="number"
            name="id"
            label="Product ID"
            onChange={(e) => handleUploadImageChange(e)}
          />
          <TextField
            label="Link to new picture"
            name="newImg"
            onChange={(e) => handleUploadImageChange(e)}
          />
          <Button onClick={() => handleUploadImage()} variant="contained">
            Upload image
          </Button>
        </Box>
      </Box>
    </>
  );
};
