import {
  ImageList,
  ImageListItem,
  ImageListItemBar,
  ListSubheader,
} from "@mui/material";
import { mainTheme } from "../../theme/commonThemes";
import { Link } from "react-router-dom";

export const ImageListComponent = ({
  localCategory,
}: {
  localCategory: string[];
}) => {
  return (
    <ImageList sx={{ width: "100%", textAlign: "center" }}>
      <ImageListItem key="Subheader" cols={2}>
        <ListSubheader
          component="div"
          sx={{
            backgroundColor: mainTheme.palette.divider,
            color: mainTheme.palette.primary.main,
            textAlign: "center",
          }}
        >
          Categories
        </ListSubheader>
      </ImageListItem>
      {localCategory.map((data: any) => (
        <Link to={"/categories"} state={{ id: data.id }}>
          <ImageListItem key={data.id}>
            <img src={data.image} alt={data.name} />
            <ImageListItemBar title={data.name}></ImageListItemBar>
          </ImageListItem>
        </Link>
      ))}
    </ImageList>
  );
};
