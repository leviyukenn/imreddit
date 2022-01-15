import { Box, createStyles, makeStyles, Theme } from "@material-ui/core";
import React, { useMemo } from "react";
import { useInView } from "react-intersection-observer";
import { SERVER_URL } from "../../const/const";
import { RegularCommunityFragment } from "../../generated/graphql";
import { useCommunityAppearance } from "../../redux/hooks/useCommunityAppearance";
import CommunityHeader from "./CommunityHeader";

interface CommunityBannerProps {
  community: RegularCommunityFragment;
}
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    bannerImage: {
      height: 228,
    },
  })
);

const CommunityBanner = ({ community }: CommunityBannerProps) => {
  const classes = useStyles();
  const { ref, inView } = useInView({ threshold: 0.5 });
  const { banner, bannerColor } = useCommunityAppearance();
  const bannerStyle = useMemo(() => {
    if (banner)
      return {
        background: `url(${
          SERVER_URL + banner
        }) center center / cover no-repeat ${bannerColor}`,
      };

    if (bannerColor)
      return {
        background: bannerColor,
      };
  }, [banner, bannerColor]);

  return (
    <>
      <Box className={classes.bannerImage} style={bannerStyle} />
      <CommunityHeader ref={ref} community={community} pinnedHeader={false} />
      {!inView ? (
        <CommunityHeader community={community} pinnedHeader={true} />
      ) : null}
    </>
  );
};
export default CommunityBanner;
