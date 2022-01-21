import React from "react";
import { useIsAuth } from "../../utils/hooks/useIsAuth";
import CreatePostCard from "../post/CreatePostCard";
import { CommunityPostsInfiniteScroll } from "../post/PostInfiniteScroll";

const CommunityHomeHeartContent = ({
  communityName,
}: {
  communityName: string;
}) => {
  const { isAuth } = useIsAuth();
  return (
    <>
      {isAuth ? <CreatePostCard /> : null}
      <CommunityPostsInfiniteScroll communityName={communityName} />
    </>
  );
};

export default CommunityHomeHeartContent;
