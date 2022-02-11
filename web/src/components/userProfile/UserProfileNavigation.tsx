import { Tab, Tabs } from "@material-ui/core";
import { useRouter } from "next/router";
import React from "react";
import { UserProfileTabType } from "../../pages/user/[userName]/[sectionName]";

interface UserProfileNavigationProps {
  userName: string;
  sectionName: string;
}

const UserProfileNavigation = ({
  userName,
  sectionName,
}: UserProfileNavigationProps) => {
  const router = useRouter();
  const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
    router.push(`/user/${userName}/${newValue}`);
  };
  return (
    <Tabs
      indicatorColor="primary"
      textColor="primary"
      value={sectionName}
      onChange={handleChange}
    >
      <Tab label="Posts" value={UserProfileTabType.POSTS} />
      <Tab label="Comments" value={UserProfileTabType.COMMENTS} />
      <Tab label="Upvoted" value={UserProfileTabType.UPVOTED} />
      <Tab label="Downvoted" value={UserProfileTabType.DOWNVOTED} />
    </Tabs>
  );
};
export default UserProfileNavigation;
