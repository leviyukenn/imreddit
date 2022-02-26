import { Box } from "@material-ui/core";
import { useRouter } from "next/router";
import React from "react";
import { useUserRolesQuery } from "../../generated/graphql";
import { useFindUser } from "../../graphql/hooks/useFindUser";
import { useIsAuth } from "../../utils/hooks/useIsAuth";
import MyModeratorMemberShips from "./profile/MyModeratorMemberShips";
import MyProfile from "./profile/MyProfile";
import UserProfile from "./profile/UserProfile";

interface UserPageRightSideContentProps {}

const UserPageRightSideContent = ({}: UserPageRightSideContentProps) => {
  const router = useRouter();
  const { me } = useIsAuth();
  const userName =
    typeof router.query.userName === "string" ? router.query.userName : "";
  const isMe = me?.username && me.username === userName;
  const user = useFindUser(userName);

  const { data: userRolesResponse } = useUserRolesQuery({
    skip: !me?.id,
    variables: { userId: me?.id! },
  });

  const myRoles = userRolesResponse?.userRoles || [];
  const moderatingCommunities = myRoles
    .filter((role) => role.isModerator)
    .map((role) => role.community);

  return (
    <>
      {isMe ? (
        <Box>
          <MyProfile user={me!} />
          {moderatingCommunities.length !== 0 ? (
            <MyModeratorMemberShips
              moderatingCommunities={moderatingCommunities}
            />
          ) : null}
        </Box>
      ) : null}
      {!isMe && user ? <UserProfile user={user} /> : null}
      <Box></Box>
    </>
  );
};
export default UserPageRightSideContent;
