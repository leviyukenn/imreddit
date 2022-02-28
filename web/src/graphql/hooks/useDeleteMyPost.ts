import { Reference } from "@apollo/client";
import { useCallback } from "react";
import { useDeleteMyPostMutation } from "../../generated/graphql";
import { useSnackbarAlert } from "../../redux/hooks/useSnackbarAlert";
import { AlertSeverity } from "../../redux/types/types";

export function useDeleteMyPost(userName: string) {
  const { onOpenSnackbarAlert, handleMutationError } = useSnackbarAlert();
  const [deleteMyPostMutation, { loading }] = useDeleteMyPostMutation({
    onError: handleMutationError,
    update(cache, { data: deleteMyPostResponse }) {
      if (!deleteMyPostResponse?.deleteMyPost) return;
      cache.evict({ id: deleteMyPostResponse.deleteMyPost });
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
            delete merged[deleteMyPostResponse.deleteMyPost];
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
            delete merged[deleteMyPostResponse.deleteMyPost];
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
      const { data } = await deleteMyPostMutation({
        variables: { postId },
      });

      const deleteMyPostResult = data?.deleteMyPost;

      if (deleteMyPostResult) {
        onOpenSnackbarAlert({
          message: "Post deleted successfully.",
          severity: AlertSeverity.SUCCESS,
        });
        return true;
      }
      return false;
    },
    [deleteMyPostMutation, onOpenSnackbarAlert]
  );

  return { deleteMyPost, loading };
}
