import { Box, createStyles, makeStyles, Theme } from "@material-ui/core";
import React from "react";
import CreateCommunityForm from "../components/community/CreateCommunityForm";
import Container from "../components/Container";
import { SERVER_URL } from "../const/const";

interface createCommunityProps {}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    sideImage: {
      backgroundImage: `url(${
        SERVER_URL + "/resources/backgroundImages/createCommunityImg.jpeg"
      })`,
      minHeight: "calc(100vh - 56px)",
      width: "140px",
      backgroundPosition: "60%",
    },
  })
);
const createCommunity = ({}: createCommunityProps) => {
  const classes = useStyles();
  return (
    <Container backgroundMode="light">
      <Box display="flex">
        <Box className={classes.sideImage} />
        <CreateCommunityForm />
      </Box>
    </Container>
  );
};
export default createCommunity;
