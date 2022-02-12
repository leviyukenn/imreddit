import { useRouter } from "next/router";
import { useMemo } from "react";
import ContentLayout from "../../../components/ContentLayout";
import HomeContainer from "../../../components/HomeContainer";
import UserCommentsContent from "../../../components/userProfile/UserCommentsContent";
import UserPostsContent from "../../../components/userProfile/UserPostsContents";
import UserProfileNavigation from "../../../components/userProfile/UserProfileNavigation";
import UserUpvotedPostsContent, {
  UpvoteType,
} from "../../../components/userProfile/UserUpvotedPostsContent";
import { useIsAuth } from "../../../utils/hooks/useIsAuth";

interface UserProfileProps {}
export enum UserProfileTabType {
  POSTS = "posts",
  COMMENTS = "comments",
  UPVOTED = "upvoted",
  DOWNVOTED = "downvoted",
}

const UserProfile = ({}: UserProfileProps) => {
  const router = useRouter();
  const { me } = useIsAuth();
  const userName =
    typeof router.query.userName === "string" ? router.query.userName : "";
  const sectionName =
    typeof router.query.sectionName === "string"
      ? router.query.sectionName
      : "";
  const isMe = me?.username && me.username === userName;

  const content = useMemo(() => {
    switch (sectionName) {
      case UserProfileTabType.POSTS:
        return <UserPostsContent userName={userName} />;

      case UserProfileTabType.COMMENTS:
        return <UserCommentsContent userName={userName} />;
      case UserProfileTabType.UPVOTED:
        if (!isMe) return null;
        return (
          <UserUpvotedPostsContent
            userName={userName}
            upvoteType={UpvoteType.UPVOTE}
          />
        );
      case UserProfileTabType.DOWNVOTED:
        if (!isMe) return null;
        return (
          <UserUpvotedPostsContent
            userName={userName}
            upvoteType={UpvoteType.DOWNVOTE}
          />
        );
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
      <ContentLayout fullWidth={true} rightSideContent={<UserProfile />}>
        {content}
      </ContentLayout>
    </HomeContainer>
  );
};
export default UserProfile;
