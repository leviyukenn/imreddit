import { useRouter } from "next/router";
import { useMemo } from "react";
import HomeContainer from "../../components/HomeContainer";
import { CommunityPostsInfiniteScroll } from "../../components/post/PostInfiniteScroll";

const CommunityHome = () => {
  const router = useRouter();
  const communityName = useMemo(
    () => (router.query.communityName as string) || "",
    [router]
  );

  return (
    <HomeContainer>
      {communityName ? (
        <CommunityPostsInfiniteScroll communityName={communityName} />
      ) : null}
    </HomeContainer>
  );
};

export default CommunityHome;
