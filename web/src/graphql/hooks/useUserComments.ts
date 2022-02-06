import { useUserCommentsQuery } from "../../generated/graphql";

export function useUserComments(userName: string, ancestorId: string) {
  const response = useUserCommentsQuery({
    skip: typeof window === "undefined",
    variables: { userName, ancestorId },
  });

  const comments = response.data?.userComments || [];

  return comments;
}
