import { Box, createStyles, makeStyles, Theme } from "@material-ui/core";
import React from "react";
import { useInView } from "react-intersection-observer";
import { RegularCommunityFragment } from "../../generated/graphql";
import CommunityHeader from "./CommunityHeader";

interface CommunityBannerProps {
  community: RegularCommunityFragment;
}
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    bannerImage: {
      background:
        'url("https://styles.redditmedia.com/t5_12p4l2/styles/bannerBackgroundImage_w5jk6fw1kg181.png?width=4000&s=681933d1131c611f797fa5827040908dadb60ffa") center center / cover no-repeat',
      height: 228,
    },
  })
);

const CommunityBanner = ({ community }: CommunityBannerProps) => {
  const classes = useStyles();
  const { ref, inView } = useInView({ threshold: 0.5 });

  return (
    <>
      <Box className={classes.bannerImage} />
      <CommunityHeader ref={ref} community={community} pinnedHeader={false} />
      {!inView ? (
        <CommunityHeader community={community} pinnedHeader={true} />
      ) : null}
    </>
  );
};
export default CommunityBanner;
