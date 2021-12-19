import React, { useMemo } from "react";
import {
  PostDetailQuery,
  useCommunityQuery,
  usePostDetailQuery,
} from "../../generated/graphql";
import CommunityDescription from "../community/CommunityDescription";
import HomeContainer from "../HomeLayout";
import PostDetail from "./PostDetail";

interface PostDetaiPageProps {
  postId: string;
  serverSidePost?: PostDetailQuery["postDetail"];
}

const usePostDetail = (
  postId: string,
  serverSidePost?: PostDetailQuery["postDetail"]
) => {
  const { data: postDetailResponse } = usePostDetailQuery({
    skip: typeof window === "undefined",
    variables: { postId },
  });

  const clientSidePost = useMemo(() => postDetailResponse?.postDetail, [
    postDetailResponse,
  ]);

  const post = useMemo(() => clientSidePost || serverSidePost, [
    clientSidePost,
    serverSidePost,
  ]);

  const { data: communityResponse } = useCommunityQuery({
    skip: typeof window === "undefined" || !post?.community.name,
    variables: { communityName: post?.community.name! },
  });

  const community = useMemo(() => communityResponse?.community, [
    communityResponse,
  ]);
  return { post, community };
};

const PostDetailPage = ({ postId, serverSidePost }: PostDetaiPageProps) => {
  const { post, community } = usePostDetail(postId, serverSidePost);

  return (
    <HomeContainer
      mainContent={<PostDetail post={post} />}
      rightSideContent={
        community ? <CommunityDescription community={community} /> : undefined
      }
    />
  );
};

export default PostDetailPage;
