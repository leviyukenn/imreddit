import {
  Box,
  createStyles,
  IconButton,
  Link,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";
import ArrowBackIosOutlinedIcon from "@material-ui/icons/ArrowBackIosOutlined";
import ArrowForwardIosOutlinedIcon from "@material-ui/icons/ArrowForwardIosOutlined";
import React, { useCallback, useState } from "react";
import { SERVER_URL } from "../../const/const";
import { RegularImageFragment } from "../../generated/graphql";

interface ImgaePostSwiperProps {
  images: RegularImageFragment[];
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    imageContainer: {
      position: "relative",
      height: "512px",
      width: "100%",
      overflow: "hidden",
    },
    caption: {
      width: "100%",
      height: "40px",
      backgroundColor: "#edeff1",
      padding: "0 8px",
    },
    forwardButton: {
      position: "absolute",
      backgroundColor: "#fff",
      top: "50%",
      left: "16px",
      zIndex: 100,
      boxShadow: "0 4px 14px rgb(0 0 0 / 10%)",
      "&:hover": {
        backgroundColor: "#fff",
      },
    },
    backwardButton: {
      position: "absolute",
      backgroundColor: "#fff",
      top: "50%",
      right: "16px",
      zIndex: 100,
      boxShadow: "0 4px 14px rgb(0 0 0 / 10%)",
      "&:hover": {
        backgroundColor: "#fff",
      },
    },
    slide: {
      width: "100%",
      height: "100%",
      position: "absolute",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    slideImage: {
      maxHeight: "100%",
      maxWidth: "100%",
    },
  })
);

const ImgaePostSwiper = ({ images }: ImgaePostSwiperProps) => {
  const classes = useStyles();
  const [current, setCurrent] = useState(0);

  const toNextImage = useCallback(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      event.stopPropagation();

      setCurrent((prevState) =>
        prevState === images.length - 1 ? 0 : prevState + 1
      );
    },
    [images]
  );

  const toPrevImage = useCallback(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      event.stopPropagation();
      setCurrent((prevState) =>
        prevState === 0 ? images.length - 1 : prevState - 1
      );
    },
    [images]
  );

  return (
    <>
      <Box className={classes.imageContainer}>
        <IconButton
          className={classes.forwardButton}
          style={{ display: current === 0 ? "none" : "block" }}
          onClick={toPrevImage}
        >
          <ArrowBackIosOutlinedIcon />
        </IconButton>
        <IconButton
          className={classes.backwardButton}
          style={{ display: current === images.length - 1 ? "none" : "block" }}
          onClick={toNextImage}
        >
          <ArrowForwardIosOutlinedIcon />
        </IconButton>
        {images.map((img, index) => (
          <Box
            className={classes.slide}
            style={{ left: index !== current ? "-100%" : "0" }}
            key={img.id}
          >
            <img src={SERVER_URL + img.path} className={classes.slideImage} />
          </Box>
        ))}
      </Box>
      {images[current].caption || images[current].link ? (
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          className={classes.caption}
        >
          <Typography variant="caption">{images[current].caption}</Typography>
          {images[current].link ? (
            <Box>
              <Link href={images[current].link!} target="_blank">
                {images[current].link}
              </Link>
            </Box>
          ) : null}
        </Box>
      ) : null}
    </>
  );
};
export default ImgaePostSwiper;
