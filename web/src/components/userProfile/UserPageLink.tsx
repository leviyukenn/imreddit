import { createStyles, Link, makeStyles, Theme } from "@material-ui/core";
import NextLink from "next/link";
import React from "react";
import { createUserProfileLink } from "../../utils/links";

interface UserPageLinkProps {
  userName: string;
}
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    userPageLink: {
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

const UserPageLink = ({ userName }: UserPageLinkProps) => {
  const classes = useStyles();
  return (
    <NextLink href={createUserProfileLink(userName, "posts")} passHref>
      <Link className={classes.userPageLink}>{`u/${userName}`}</Link>
    </NextLink>
  );
};
export default UserPageLink;
