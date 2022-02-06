import { Reference } from "@apollo/client";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { FrontendError } from "../../const/errors";
import {
  RegularPostDetailFragment,
  RegularPostDetailFragmentDoc,
  useCreateCommentMutation,
} from "../../generated/graphql";
import { useSnackbarAlert } from "../../redux/hooks/useSnackbarAlert";
import { AlertSeverity } from "../../redux/types/types";
import { useIsAuth } from "../../utils/hooks/useIsAuth";

export function useCreateComment(replyTo: RegularPostDetailFragment) {
  const { checkIsAuth } = useIsAuth();
  const { onOpenSnackbarAlert } = useSnackbarAlert();
  const router = useRouter();
  const [createCommentMutation, { loading }] = useCreateCommentMutation({
    update(cache, { data: createCommentResponse }) {
      cache.modify({
        id: cache.identify(replyTo),
        fields: {
          children(existingPostRefs: Reference[]) {
            if (!createCommentResponse?.createComment.post)
              return existingPostRefs;
            const commentRef = cache.writeFragment({
              fragment: RegularPostDetailFragmentDoc,
              data: createCommentResponse.createComment.post,
              fragmentName: "RegularPostDetail",
            });

            return [commentRef, ...existingPostRefs];
          },
        },
      });
      cache.modify({
        id: cache.identify(replyTo.ancestor || replyTo),
        fields: {
          totalComments(existing: number) {
            if (!createCommentResponse?.createComment.post) return existing;
            return existing + 1;
          },
        },
      });
    },
  });

  const createComment = useCallback(
    async (text: string) => {
      if (!checkIsAuth) return;
      const response = await createCommentMutation({
        variables: {
          text,
          communityId: replyTo.community.id,
          parentId: replyTo.id,
          ancestorId: replyTo.ancestor?.id || replyTo.id,
        },
      }).catch(() => null);
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

      const createCommentResult = response.data?.createComment;
      if (createCommentResult?.errors?.length) {
        onOpenSnackbarAlert({
          message: createCommentResult.errors[0].message,
          severity: AlertSeverity.ERROR,
        });
        return false;
      }

      if (createCommentResult?.post) {
        return true;
      }
      return false;
    },
    [replyTo, router, onOpenSnackbarAlert, createCommentMutation, checkIsAuth]
  );

  return { createComment, loading };
}
