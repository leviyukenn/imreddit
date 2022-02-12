import { Tab, Tabs } from "@material-ui/core";
import { useRouter } from "next/router";
import React from "react";
import { UserProfileTabType } from "../../pages/user/[userName]/[sectionName]";
import { useIsAuth } from "../../utils/hooks/useIsAuth";
import { createUserProfileLink } from "../../utils/links";

interface UserProfileNavigationProps {
  userName: string;
  sectionName: string;
}

const UserProfileNavigation = ({
  userName,
  sectionName,
}: UserProfileNavigationProps) => {
  const router = useRouter();
  const { me } = useIsAuth();
  const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
    router.push(createUserProfileLink(userName, newValue));
  };

  const isMe = me?.username && me.username === userName;
  return isMe ? (
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
  ) : (
    <Tabs
      indicatorColor="primary"
      textColor="primary"
      value={sectionName}
      onChange={handleChange}
    >
      <Tab label="Posts" value={UserProfileTabType.POSTS} />
      <Tab label="Comments" value={UserProfileTabType.COMMENTS} />
    </Tabs>
  );
};
export default UserProfileNavigation;
