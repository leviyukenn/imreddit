import { useCallback, useMemo } from "react";
import { useGetMyUpvoteQuery, useVoteMutation } from "../../generated/graphql";
import { useSnackbarAlert } from "../../redux/hooks/useSnackbarAlert";
import { AlertSeverity } from "../../redux/types/types";
import { useIsAuth } from "../../utils/hooks/useIsAuth";
import { VoteStatus } from "../../components/types/types";

enum VoteType {
  UPVOTE = 1,
  DOWNVOTE = -1,
}

export function useVote(post: { __typename?: string; id: string }) {
  const { checkIsAuth, meLoading, me } = useIsAuth();
  const { onOpenSnackbarAlert } = useSnackbarAlert();
  const [vote, { loading: voteLoading }] = useVoteMutation({
    update(cache, { data: voteResponse }) {
      if (!voteResponse) return;
      cache.modify({
        id: cache.identify(post),
        fields: {
          points(existing: number) {
            if (!voteResponse) return existing;
            return existing + voteResponse.vote;
          },
        },
      });
      cache.modify({
        id: cache.identify({
          __typename: "Upvote",
          userId: me?.id,
          postId: post.id,
        }),
        fields: {
          value(existing: number) {
            return existing + voteResponse.vote;
          },
        },
      });
    },
  });
  const { data: myUpvoteResponse } = useGetMyUpvoteQuery({
    skip: !me?.id,
    variables: { postId: post.id },
  });

  const voteStatus = useMemo(() => {
    const myUpvoteValue = myUpvoteResponse?.getUpvote?.value;
    if (!myUpvoteValue) return VoteStatus.NOTVOTED;
    if (myUpvoteValue === 1) return VoteStatus.UPVOTED;
    return VoteStatus.DOWNVOTED;
  }, [myUpvoteResponse]);

  const onVote = useCallback(
    async (value) => {
      if (!checkIsAuth()) return false;
      const voteResponse = await vote({
        variables: { postId: post.id, value },
      }).catch((err) => {
        onOpenSnackbarAlert({
          message: err.message,
          severity: AlertSeverity.ERROR,
        });
        return null;
      });

      if (voteResponse?.data) return true;
      return false;
    },
    [vote, checkIsAuth, post]
  );

  const onUpvote = useCallback(() => {
    onVote(VoteType.UPVOTE);
  }, [onVote]);

  const onDownvote = useCallback(() => {
    onVote(VoteType.DOWNVOTE);
  }, [onVote]);

  return {
    voteStatus,
    loading: voteLoading || meLoading,
    onUpvote,
    onDownvote,
  };
}
