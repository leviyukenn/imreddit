import { useRouter } from "next/router";
import { useMemo } from "react";

export function usePostInfoRoute() {
  const router = useRouter();

  const postInfo = useMemo(() => (router.query.postInfo || []) as string[], [
    router,
  ]);

  const communityName = useMemo(() => postInfo[0] || "", [postInfo]);
  const postId = useMemo(() => postInfo[1] || "", [postInfo]);
  const modalPostId = useMemo(
    () => (router.query.modalPostId || "") as string,
    [router]
  );

  const isPostDetailPage = useMemo(
    () => !!(communityName && postId && !modalPostId),

    [postId, communityName, modalPostId]
  );

  return { communityName, postId, modalPostId, isPostDetailPage };
}
