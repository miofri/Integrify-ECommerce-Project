import { useSelector } from "react-redux";

import { RootState } from "../../store/store";
import { useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
} from "@mui/material";

export const CategoryPages = () => {
  const [currentItems, setCurrentItems] = useState([]);
  const { categoryId } = useParams<{ categoryId: string }>();
  const url = `https://api.escuelajs.co/api/v1/products/?categoryId=${categoryId}`;

  useEffect(() => {
    const getCurrentItems = async () => {
      const response = await axios.get(url);
      const finalData = response.data;
      setCurrentItems(finalData);
    };
    getCurrentItems();
  }, [categoryId]);

  return (
    <Container sx={{ maxWidth: "md" }}>
      <Grid container spacing={2}>
        {currentItems.map((data: any) => (
          <Grid item xs={4}>
            <Card sx={{ maxWidth: "sm" }}>
              <CardMedia
                component="img"
                height="200"
                image={data.images[0]}
                alt={data.title}
              />
              <CardContent>
                <Typography variant="h4" component="div">
                  {data.title}
                </Typography>
                <Typography variant="body2">{data.description}</Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Add to cart</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};
