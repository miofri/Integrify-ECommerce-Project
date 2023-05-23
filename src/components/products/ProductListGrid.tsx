import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";
import { AllProductsInterface } from "../../interface/ProductsInterface";
import { cartSlice } from "../../store/cartSlice";
import { store } from "../../store/store";

interface Product {
  products: AllProductsInterface[];
}

export const ProductListGrid = ({ products }: Product) => {
  const handleAddToCart = (data: AllProductsInterface) => {
    store.dispatch(cartSlice.actions.addProduct(data));
  };
  return (
    <Grid container spacing={2}>
      {products.map((data: any) => (
        <Grid item xs={4}>
          <Card sx={{ maxWidth: "sm" }}>
            <CardMedia
              component="img"
              loading="lazy"
              height="200"
              image={data.images[0]}
              alt={data.title}
            />
            <CardContent>
              <Typography variant="subtitle2" component="div">
                {data.price}€
              </Typography>
              <Typography variant="h4" component="div">
                {data.title}
              </Typography>
              <Typography variant="body2">{data.description}</Typography>
            </CardContent>
            <CardActions>
              <Button size="small" onClick={() => handleAddToCart(data)}>
                Add to cart
              </Button>
              <Link to={`/product/${data.id}`}>
                <Button size="small">More details</Button>
              </Link>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};
