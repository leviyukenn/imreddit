import React, { useMemo, useState } from "react";
import ContentLayout from "../../components/ContentLayout";
import HomeContainer from "../../components/HomeContainer";
import UserCommentsContent from "../../components/userProfile/UserCommentsContent";
import UserPostsContent from "../../components/userProfile/UserPostsContents";
import UserProfileNavigation from "../../components/userProfile/UserProfileNavigation";

interface UserProfileProps {}
export enum UserProfileTabType {
  POSTS,
  COMMENTS,
  UPVOTED,
  DOWNVOTED,
}

const UserProfile = ({}: UserProfileProps) => {
  const [route, setRoute] = useState<UserProfileTabType>(
    UserProfileTabType.POSTS
  );

  const content = useMemo(() => {
    switch (route) {
      case UserProfileTabType.POSTS:
        return <UserPostsContent />;

      case UserProfileTabType.COMMENTS:
        return <UserCommentsContent />;
      default:
        return null;
    }
  }, [route]);

  return (
    <HomeContainer banner={<UserProfileNavigation {...{ route, setRoute }} />}>
      <ContentLayout fullWidth={true}>{content}</ContentLayout>
    </HomeContainer>
  );
};
export default UserProfile;
