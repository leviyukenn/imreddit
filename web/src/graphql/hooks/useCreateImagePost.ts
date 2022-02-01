import { Reference } from "@apollo/client";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { FrontendError } from "../../const/errors";
import {
  CreateImagePostMutationVariables,
  RegularPostDetailFragmentDoc,
  useCreateImagePostMutation,
} from "../../generated/graphql";
import { useSnackbarAlert } from "../../redux/hooks/useSnackbarAlert";
import { AlertSeverity } from "../../redux/types/types";
import { useIsAuth } from "../../utils/hooks/useIsAuth";
import { createPostDetailPageLink } from "../../utils/links";

export function useCreateImagePost() {
  const { redirectToLoginIfNotLoggedIn } = useIsAuth();
  const { onOpenSnackbarAlert } = useSnackbarAlert();
  const router = useRouter();

  const [createImagePostMutation, { loading }] = useCreateImagePostMutation({
    update(cache, { data: createPostResponse }) {
      cache.modify({
        fields: {
          paginatedPosts(
            existingPostRefs: {
              posts: { [key: string]: Reference };
              hasMore: boolean;
            } = { posts: {}, hasMore: false }
          ) {
            if (!createPostResponse?.createImagePost.post)
              return existingPostRefs;
            const merged = { ...existingPostRefs.posts };

            if (createPostResponse?.createImagePost.post) {
              const newPostRef = cache.writeFragment({
                data: createPostResponse.createImagePost.post,
                fragment: RegularPostDetailFragmentDoc,
                fragmentName: "RegularPostDetail",
              });

              merged[createPostResponse.createImagePost.post.id] = newPostRef!;
            }
            return { posts: merged, hasMore: existingPostRefs.hasMore };
          },
        },
      });
    },
  });

  const createImagePost = useCallback(
    async (variables: CreateImagePostMutationVariables) => {
      redirectToLoginIfNotLoggedIn();
      const response = await createImagePostMutation({ variables }).catch(
        () => null
      );
      if (!response) {
        onOpenSnackbarAlert({
          message: FrontendError.ERR0002,
          severity: AlertSeverity.ERROR,
        });
        return false;
      }

      if (response.errors?.length) {
        onOpenSnackbarAlert({
          message: response.errors[0].message,
          severity: AlertSeverity.ERROR,
        });
        return false;
      }

      const createPostResult = response.data?.createImagePost;
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
    [router, onOpenSnackbarAlert, createImagePostMutation]
  );

  return { createImagePost, loading };
}
