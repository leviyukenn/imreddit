import React from "react";
import { useIsAuth } from "../../utils/hooks/useIsAuth";
import CreatePostCard from "../post/createPost/CreatePostCard";
import { CommunityPostsInfiniteScroll } from "../post/PostInfiniteScroll";

const CommunityHomeHeartContent = ({
  communityName,
}: {
  communityName: string;
}) => {
  const { me } = useIsAuth();
  return (
    <>
      {me ? <CreatePostCard avatar={me.avatar} /> : null}
      <CommunityPostsInfiniteScroll communityName={communityName} />
    </>
  );
};

export default CommunityHomeHeartContent;
