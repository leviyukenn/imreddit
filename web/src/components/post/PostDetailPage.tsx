import React, { useMemo } from "react";
import { PostDetailQuery, usePostDetailQuery } from "../../generated/graphql";
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

  // const { data: communityResponse } = useCommunityQuery({
  //   skip: typeof window === "undefined" || !post?.community.name,
  //   variables: { communityName: post?.community.name! },
  // });

  // const community = useMemo(() => communityResponse?.community, [
  //   communityResponse,
  // ]);
  return { post };
};

const PostDetailPage = ({ postId, serverSidePost }: PostDetaiPageProps) => {
  const { post } = usePostDetail(postId, serverSidePost);

  return <PostDetail post={post} />;
};

export default PostDetailPage;
