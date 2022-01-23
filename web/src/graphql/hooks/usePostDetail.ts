import { useMemo } from "react";
import { usePostDetailQuery } from "../../generated/graphql";

export function usePostDetail(postId?: string) {
  const { data: postDetailResponse, loading } = usePostDetailQuery({
    skip: typeof window === "undefined" || !postId,
    variables: { postId: postId! },
  });

  const post = useMemo(() => postDetailResponse?.postDetail, [
    postDetailResponse,
  ]);
  return { post, loading };
}
