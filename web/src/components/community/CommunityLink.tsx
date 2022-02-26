import { createStyles, Link, makeStyles, Theme } from "@material-ui/core";
import NextLink from "next/link";
import React from "react";
import { createCommunityHomeLink } from "../../utils/links";

interface CommunityLinkProps {
  communityName: string;
}
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    communityLink: {
      lineHeight: "20px",
      fontSize: "12px",
      color: theme.palette.text.primary,
      fontWeight: 700,
      "&:hover": {
        textDecoration: "underLine",
        textDecorationColor: theme.palette.text.primary,
      },
    },
  })
);

const CommunityLink = ({ communityName }: CommunityLinkProps) => {
  const classes = useStyles();
  return (
    <NextLink href={createCommunityHomeLink(communityName)} passHref>
      <Link className={classes.communityLink}>{`r/${communityName}`}</Link>
    </NextLink>
  );
};
export default CommunityLink;
