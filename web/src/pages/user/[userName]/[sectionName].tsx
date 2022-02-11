import { useRouter } from "next/router";
import { useMemo } from "react";
import ContentLayout from "../../../components/ContentLayout";
import HomeContainer from "../../../components/HomeContainer";
import UserCommentsContent from "../../../components/userProfile/UserCommentsContent";
import UserDownvotedPostsContent from "../../../components/userProfile/UserDownvotedPostsContent";
import UserPostsContent from "../../../components/userProfile/UserPostsContents";
import UserProfileNavigation from "../../../components/userProfile/UserProfileNavigation";
import UserUpvotedPostsContent from "../../../components/userProfile/UserUpvotedPostsContent";

interface UserProfileProps {}
export enum UserProfileTabType {
  POSTS = "posts",
  COMMENTS = "comments",
  UPVOTED = "upvoted",
  DOWNVOTED = "downvoted",
}

const UserProfile = ({}: UserProfileProps) => {
  const router = useRouter();
  const userName =
    typeof router.query.userName === "string" ? router.query.userName : "";
  const sectionName =
    typeof router.query.sectionName === "string"
      ? router.query.sectionName
      : "";

  const content = useMemo(() => {
    switch (sectionName) {
      case UserProfileTabType.POSTS:
        return <UserPostsContent userName={userName} />;

      case UserProfileTabType.COMMENTS:
        return <UserCommentsContent userName={userName} />;
      case UserProfileTabType.UPVOTED:
        return <UserUpvotedPostsContent userName={userName} />;
      case UserProfileTabType.DOWNVOTED:
        return <UserDownvotedPostsContent userName={userName} />;
      default:
        return null;
    }
  }, [userName, sectionName]);

  return (
    <HomeContainer
      banner={
        userName && sectionName ? (
          <UserProfileNavigation {...{ userName, sectionName }} />
        ) : undefined
      }
    >
      <ContentLayout fullWidth={true}>{content}</ContentLayout>
    </HomeContainer>
  );
};
export default UserProfile;
