import { Box } from "@material-ui/core";
import React from "react";
import CreateCommunity from "../components/community/CreateCommunity";

const createCommunity = () => {
  return (
    <Box height="100vh" minHeight="900px">
      <CreateCommunity />
    </Box>
  );
};
export default createCommunity;
