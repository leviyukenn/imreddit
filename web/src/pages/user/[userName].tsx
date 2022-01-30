import { useRouter } from "next/router";
import React, { useState } from "react";
import ContentLayout from "../../components/ContentLayout";
import HomeContainer from "../../components/HomeContainer";
import { UserPostsInfiniteScroll } from "../../components/post/PostInfiniteScroll";
import UserProfileNavigation from "../../components/userProfile/UserProfileNavigation";

interface UserProfileProps {}

const UserProfile = ({}: UserProfileProps) => {
  const router = useRouter();
  const [route, setRoute] = useState(0);

  return (
    <HomeContainer banner={<UserProfileNavigation {...{ route, setRoute }} />}>
      <ContentLayout fullWidth={true}>
        <UserPostsInfiniteScroll userName={router.query.userName as string} />
      </ContentLayout>
    </HomeContainer>
  );
};
export default UserProfile;
