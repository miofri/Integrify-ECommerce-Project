import {
  ImageList,
  ImageListItem,
  ImageListItemBar,
  ListSubheader,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { v4 as uuid } from "uuid";

import { Category } from "../../interface/SingleProductInterface";

export const ImageListComponent = ({
  localCategory,
}: {
  localCategory: Category[];
}) => {
  return (
    <ImageList sx={{ width: "100%", textAlign: "center" }} cols={5}>
      <ImageListItem key="subheader" cols={5}>
        <ListSubheader
          component="div"
          sx={{
            color: "white",
          }}
        >
          <Typography variant="h2" sx={{ padding: "1rem" }}>
            Categories
          </Typography>
        </ListSubheader>
      </ImageListItem>
      {localCategory.map((data: any) => {
        const key = `${uuid()}-${data.id}`;
        return (
          <Link to={`/categories/${data.id}`} key={key}>
            <ImageListItem>
              <img src={data.image} alt={data.name} />
              <ImageListItemBar title={data.name}></ImageListItemBar>
            </ImageListItem>
          </Link>
        );
      })}
    </ImageList>
  );
};
