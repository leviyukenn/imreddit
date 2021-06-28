import { useCallback, useState } from "react";
import { useVoteMutation } from "../../generated/graphql";
import { useIsAuth } from "../../utils/hooks/useIsAuth";
import { VoteStatus } from "../types/types";

enum VoteType {
  UPVOTE = 1,
  DOWNVOTE = -1,
}

export function useVote(post: { __typename?: string; id: string }) {
  const [vote, { loading: voteLoading }] = useVoteMutation({
    update(cache, { data: voteResponse }) {
      cache.modify({
        id: cache.identify(post),
        fields: {
          points(existing: number) {
            if (!voteResponse) return existing;
            return existing + voteResponse.vote;
          },
        },
      });
    },
  });
  const { checkIsAuth, meLoading } = useIsAuth();
  const [voteStatus, setVoteStatus] = useState<VoteStatus>(VoteStatus.NOTVOTED);

  console.log(voteLoading);
  const onVote = useCallback(
    async (value) => {
      if (meLoading) return;
      if (!checkIsAuth()) return;
      const voteResponse = await vote({
        variables: { postId: post.id, value },
      });
      if (!voteResponse.data) return;
      const points = voteResponse.data.vote;

      if (value > 0 && points > 0) {
        setVoteStatus(VoteStatus.UPVOTED);
        return;
      }

      if (value < 0 && points < 0) {
        setVoteStatus(VoteStatus.DOWNVOTED);
        return;
      }

      if (Math.sign(value) !== Math.sign(points)) {
        setVoteStatus(VoteStatus.NOTVOTED);
      }
    },
    [vote, checkIsAuth, meLoading, post]
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
