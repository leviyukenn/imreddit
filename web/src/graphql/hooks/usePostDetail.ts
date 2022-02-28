import { useMemo } from "react";
import { format } from "timeago.js";
import { usePostDetailQuery } from "../../generated/graphql";

export function usePostDetail(postId?: string) {
  const { data: postDetailResponse, loading } = usePostDetailQuery({
    skip: typeof window === "undefined" || !postId,
    variables: { postId: postId! },
  });

  const post = useMemo(() => postDetailResponse?.postDetail, [
    postDetailResponse,
  ]);

  const timeago = useMemo(
    () => post?.createdAt && format(parseInt(post.createdAt)),
    [post]
  );
  return { post, loading, timeago };
}
