import {
  Box,
  createStyles,
  IconButton,
  makeStyles,
  Theme,
} from "@material-ui/core";
import ArrowBackIosOutlinedIcon from "@material-ui/icons/ArrowBackIosOutlined";
import ArrowForwardIosOutlinedIcon from "@material-ui/icons/ArrowForwardIosOutlined";
import React, { useCallback, useState } from "react";
import { SERVER_URL } from "../../const/const";
import { UploadedImage } from "../types/types";

interface ImgaePostSwiperProps {
  images: UploadedImage[];
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      position: "relative",
      height: "512px",
      width: "100%",
      overflow: "hidden",
    },
    forwardButton: {
      position: "absolute",
      backgroundColor: "#fff",
      top: "50%",
      left: "16px",
      zIndex: 100,
      boxShadow: "0 4px 14px rgb(0 0 0 / 10%)",
    },
    backwardButton: {
      position: "absolute",
      backgroundColor: "#fff",
      top: "50%",
      right: "16px",
      zIndex: 100,
      boxShadow: "0 4px 14px rgb(0 0 0 / 10%)",
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

  const toNextImage = useCallback(() => {
    setCurrent((prevState) =>
      prevState === images.length - 1 ? 0 : prevState + 1
    );
  }, [images]);

  const toPrevImage = useCallback(() => {
    setCurrent((prevState) =>
      prevState === 0 ? images.length - 1 : prevState - 1
    );
  }, [images]);

  return (
    <Box className={classes.container}>
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
        >
          <img src={SERVER_URL + img.path} className={classes.slideImage} />
        </Box>
      ))}
    </Box>
  );
};
export default ImgaePostSwiper;
