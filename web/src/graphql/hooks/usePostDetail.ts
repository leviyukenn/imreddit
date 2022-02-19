import { useEffect, useMemo } from "react";
import { format } from "timeago.js";
import { FrontendError } from "../../const/errors";
import { usePostDetailQuery } from "../../generated/graphql";
import { useSnackbarAlert } from "../../redux/hooks/useSnackbarAlert";
import { AlertSeverity } from "../../redux/types/types";

export function usePostDetail(postId?: string) {
  const { onOpenSnackbarAlert } = useSnackbarAlert();
  const { data: postDetailResponse, loading, error } = usePostDetailQuery({
    skip: typeof window === "undefined" || !postId,
    variables: { postId: postId! },
  });

  useEffect(() => {
    if (error) {
      onOpenSnackbarAlert({
        message: FrontendError.ERR0002,
        severity: AlertSeverity.ERROR,
      });
    }
  }, [error]);

  const post = useMemo(() => postDetailResponse?.postDetail, [
    postDetailResponse,
  ]);

  const timeago = useMemo(
    () => post?.createdAt && format(parseInt(post.createdAt)),
    [post]
  );
  return { post, loading, timeago };
}
