import { Tab, Tabs } from "@material-ui/core";
import React from "react";

interface UserProfileNavigationProps {
  route: number;
  setRoute: React.Dispatch<React.SetStateAction<number>>;
}

const UserProfileNavigation = ({
  route,
  setRoute,
}: UserProfileNavigationProps) => {
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setRoute(newValue);
  };
  return (
    <Tabs
      indicatorColor="primary"
      textColor="primary"
      value={route}
      onChange={handleChange}
    >
      <Tab label="Posts" />
      <Tab label="Comments" />
      <Tab label="Upvoted" />
      <Tab label="Downvoted" />
    </Tabs>
  );
};
export default UserProfileNavigation;
