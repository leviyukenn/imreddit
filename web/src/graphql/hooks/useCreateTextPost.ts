import { Reference } from "@apollo/client";
import { useRouter } from "next/router";
import { useCallback } from "react";
import {
  CreateTextPostMutationVariables,
  RegularPostDetailFragmentDoc,
  useCreateTextPostMutation,
} from "../../generated/graphql";
import { useSnackbarAlert } from "../../redux/hooks/useSnackbarAlert";
import { AlertSeverity } from "../../redux/types/types";
import { useIsAuth } from "../../utils/hooks/useIsAuth";
import { createPostDetailPageLink } from "../../utils/links";

export function useCreateTextPost() {
  const { redirectToLoginIfNotLoggedIn } = useIsAuth();
  const { onOpenSnackbarAlert, handleMutationError } = useSnackbarAlert();
  const router = useRouter();
  const [createTextPostMutation, { loading }] = useCreateTextPostMutation({
    onError: handleMutationError,
    update(cache, { data: createPostResponse }) {
      cache.modify({
        fields: {
          paginatedPosts(
            existingPostRefs: {
              posts: { [key: string]: Reference };
              hasMore: boolean;
            } = { posts: {}, hasMore: false }
          ) {
            if (!createPostResponse?.createTextPost.post)
              return existingPostRefs;
            const merged = { ...existingPostRefs.posts };

            if (createPostResponse?.createTextPost.post) {
              const newPostRef = cache.writeFragment({
                data: createPostResponse.createTextPost.post,
                fragment: RegularPostDetailFragmentDoc,
                fragmentName: "RegularPostDetail",
              });

              merged[createPostResponse.createTextPost.post.id] = newPostRef!;
            }
            return { posts: merged, hasMore: existingPostRefs.hasMore };
          },
        },
      });
    },
  });

  const createTextPost = useCallback(
    async (variables: CreateTextPostMutationVariables) => {
      redirectToLoginIfNotLoggedIn();
      const response = await createTextPostMutation({ variables });
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

      const createPostResult = response.data?.createTextPost;
      if (createPostResult?.errors?.length) {
        onOpenSnackbarAlert({
          message: createPostResult.errors[0].message,
          severity: AlertSeverity.ERROR,
        });
        return false;
      }

      if (createPostResult?.post) {
        router.push(
          createPostDetailPageLink(
            createPostResult.post.community.name,
            createPostResult.post.id
          )
        );
        return true;
      }
      return false;
    },
    [router, onOpenSnackbarAlert, createTextPostMutation]
  );

  return { createTextPost, loading };
}
