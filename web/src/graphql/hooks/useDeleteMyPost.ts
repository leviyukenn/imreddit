import { Reference } from "@apollo/client";
import { useCallback } from "react";
import { FrontendError } from "../../const/errors";
import { useDeleteMyPostMutation } from "../../generated/graphql";
import { useSnackbarAlert } from "../../redux/hooks/useSnackbarAlert";
import { AlertSeverity } from "../../redux/types/types";

export function useDeleteMyPost(userName: string) {
  const { onOpenSnackbarAlert } = useSnackbarAlert();
  const [deleteMyPostMutation, { loading, error }] = useDeleteMyPostMutation({
    update(cache, { data: deleteMyPostResponse }) {
      if (!deleteMyPostResponse?.deleteMyPost.postId) return;
      cache.evict({ id: deleteMyPostResponse.deleteMyPost.postId });
      cache.gc();
      cache.modify({
        fields: {
          paginatedPosts(
            existingPostRefs: {
              posts: { [key: string]: Reference };
              hasMore: boolean;
            } = { posts: {}, hasMore: false }
          ) {
            const merged = { ...existingPostRefs.posts };
            delete merged[deleteMyPostResponse.deleteMyPost.postId!];
            return { posts: merged, hasMore: existingPostRefs.hasMore };
          },
          userPosts(
            existingUserPostRefs: {
              posts: { [key: string]: Reference };
              hasMore: boolean;
            },
            { storeFieldName }
          ) {
            if (!storeFieldName.includes(userName)) return existingUserPostRefs;
            const merged = { ...existingUserPostRefs.posts };
            delete merged[deleteMyPostResponse.deleteMyPost.postId!];
            return {
              posts: merged,
              hasMore: existingUserPostRefs.hasMore,
            };
          },
        },
      });
    },
  });

  const deleteMyPost = useCallback(
    async (postId: string) => {
      const response = await deleteMyPostMutation({
        variables: { postId },
      }).catch((err) => {
        onOpenSnackbarAlert({
          message: err.message || FrontendError.ERR0002,
          severity: AlertSeverity.ERROR,
        });
        return null;
      });
      if (!response) {
        return false;
      }

      if (response.errors?.length) {
        onOpenSnackbarAlert({
          message: response.errors[0].message,
          severity: AlertSeverity.ERROR,
        });
        return false;
      }

      const deleteMyPostResult = response.data?.deleteMyPost;
      if (deleteMyPostResult?.errors?.length) {
        onOpenSnackbarAlert({
          message: deleteMyPostResult.errors[0].message,
          severity: AlertSeverity.ERROR,
        });
        return false;
      }

      if (deleteMyPostResult?.postId) {
        onOpenSnackbarAlert({
          message: "Post deleted successfully.",
          severity: AlertSeverity.SUCCESS,
        });
        return true;
      }
      return false;
    },
    [ deleteMyPostMutation, onOpenSnackbarAlert]
  );

  return { deleteMyPost, loading };
}
