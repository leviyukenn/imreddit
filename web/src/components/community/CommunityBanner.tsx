import { createStyles, makeStyles, Theme } from "@material-ui/core";
import React from "react";

interface CommunityBannerProps {}
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    bannerImage: {
      background:
        'url("https://styles.redditmedia.com/t5_12p4l2/styles/bannerBackgroundImage_w5jk6fw1kg181.png?width=4000&s=681933d1131c611f797fa5827040908dadb60ffa") center center / cover no-repeat',
      height: 228,
    },
  })
);

const CommunityBanner = ({}: CommunityBannerProps) => {
  const classes = useStyles();
  return <div className={classes.bannerImage}></div>;
};
export default CommunityBanner;
