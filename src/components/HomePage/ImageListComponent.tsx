import {
  ImageList,
  ImageListItem,
  ImageListItemBar,
  ListSubheader,
} from "@mui/material";
import { mainTheme } from "../../theme/commonThemes";

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
        <ImageListItem key={data.id}>
          <img src={data.image} alt={data.name} />
          <ImageListItemBar title={data.name}></ImageListItemBar>
        </ImageListItem>
      ))}
    </ImageList>
  );
};
