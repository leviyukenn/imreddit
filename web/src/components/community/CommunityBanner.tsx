import { Box, createStyles, makeStyles, Theme } from "@material-ui/core";
import React from "react";
import { useInView } from "react-intersection-observer";

interface CommunityBannerProps {}
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    bannerImage: {
      background:
        'url("https://styles.redditmedia.com/t5_12p4l2/styles/bannerBackgroundImage_w5jk6fw1kg181.png?width=4000&s=681933d1131c611f797fa5827040908dadb60ffa") center center / cover no-repeat',
      height: 228,
    },
    header: {
      backgroundColor: theme.palette.background.paper,
      height: "100px",
    },
    pinndedHeader: {
      position: "sticky",
      height: "58px",
      top: "56px",
      zIndex: 80,
      backgroundColor: theme.palette.background.paper,
      borderBottom: "#edeff1",
    },
    headerContent: {},
    communityIcon: {
      borderRadius: "100%",
      border: "4px solid #fff",
      height: "72px",
      width: "72px",
    },
  })
);

const CommunityBanner = ({}: CommunityBannerProps) => {
  const classes = useStyles();
  const { ref, inView, entry } = useInView({ threshold: 0.5 });
  console.log(inView);
  return (
    <>
      <Box className={classes.bannerImage} />
      <div ref={ref} className={classes.header}>
        <Box display="flex" justifyContent="center">
          <img
            src="https://styles.redditmedia.com/t5_12p4l2/styles/communityIcon_buxnyc6v9pq61.png?width=256&s=88c56db4f5865262d369b99d559922921b8d2991"
            className={classes.communityIcon}
          />
        </Box>
      </div>
      {!inView ? <div className={classes.pinndedHeader}></div> : null}
    </>
  );
};
export default CommunityBanner;
