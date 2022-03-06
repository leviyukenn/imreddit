import { Box, Typography } from "@material-ui/core";
import React from "react";
import { format } from "timeago.js";
import CommunityIcon from "../community/CommunityIcon";
import CommunityLink from "../community/CommunityLink";
import UserPageLink from "../userProfile/UserPageLink";

interface PostInfoProps {
  communityName: string;
  userName: string;
  postCreatedAt: string;
  communityIcon?: string;
}

const PostInfo = ({
  communityName,
  userName,
  postCreatedAt,
  communityIcon,
}: PostInfoProps) => {
  const timeago = format(parseInt(postCreatedAt));
  return (
    <Box display="flex" alignItems="center" lineHeight="1.25rem">
      {communityIcon != undefined ? (
        <Box marginRight={1} display="flex" alignItems="center">
          <CommunityIcon icon={communityIcon} size="extraSmall" />
        </Box>
      ) : null}
      <CommunityLink communityName={communityName} />
      <Typography variant="caption" style={{ color: "rgb(120, 124, 126)" }}>
        &nbsp;&#183;&nbsp;Posted by&nbsp;
        <UserPageLink userName={userName} />
        &nbsp;
        {timeago}
      </Typography>
    </Box>
  );
};
export default PostInfo;
