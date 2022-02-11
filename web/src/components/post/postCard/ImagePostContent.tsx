import {
  Box,
  createStyles,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";
import React from "react";
import { RegularImageFragment } from "../../../generated/graphql";
import ImagePostSwiper from "./ImgaePostSwiper";

interface ImagePostContentProps {
  title: string;
  images: RegularImageFragment[];
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    imagePostContent: {
      maxHeight: "600px",
      overflow: "hidden",
    },
  })
);
const ImagePostContent = ({ title, images }: ImagePostContentProps) => {
  const classes = useStyles();
  return (
    <Box className={classes.imagePostContent}>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <ImagePostSwiper images={images} />
    </Box>
  );
};
export default ImagePostContent;
