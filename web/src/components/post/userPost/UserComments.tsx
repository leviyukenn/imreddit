import { Box } from "@material-ui/core";
import React from "react";
import { useUserComments } from "../../../graphql/hooks/useUserComments";
import UserCommentCard from "./UserCommentCard";

interface UserCommentsProps {
  ancestorId: string;
  userName: string;
  communityName: string;
}

const UserComments = ({
  userName,
  communityName,
  ancestorId,
}: UserCommentsProps) => {
  const comments = useUserComments(userName, ancestorId);
  const sortedComments = [...comments].sort((a, b) => a.layer - b.layer);

  return (
    <Box>
      {sortedComments.map((comment) => (
        <UserCommentCard
          comment={comment}
          key={comment.id}
          communityName={communityName}
        />
      ))}
    </Box>
  );
};
export default UserComments;
