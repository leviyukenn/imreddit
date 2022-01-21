import React, { ReactNode, useEffect, useMemo, useState } from "react";
import {
  CommunityQuery,
  useCommunityQuery,
  useUserRoleQuery,
} from "../../generated/graphql";
import { useSaveOrInitCommunityAppearance } from "../../redux/hooks/useCommunityAppearance";
import { useIsAuth } from "../../utils/hooks/useIsAuth";
import ContentLayout from "../ContentLayout";
import { LoadingPostCard } from "../post/PostCard";
import CommunityAppearanceDrawer from "./CommunityAppearanceDrawer";
import CommunityBanner from "./CommunityBanner";
import CommunityDescription from "./CommunityDescription";
import CommunityDescriptionModeratorMode from "./CommunityDescriptionModerorMode";
import CommunityHomeContainer from "./CommunityHomeContainer";

interface CommunityProps {
  communityName: string;
  serverSideCommunity?: CommunityQuery["community"];
  children: ReactNode;
}

const useCommunity = (
  communityName: string,
  serverSideCommunity?: CommunityQuery["community"]
) => {
  const { data: communityResponse } = useCommunityQuery({
    skip: typeof window === "undefined",
    variables: { communityName },
  });
  const clientSideCommunity = useMemo(() => communityResponse?.community, [
    communityResponse,
  ]);
  const community = useMemo(() => clientSideCommunity || serverSideCommunity, [
    clientSideCommunity,
    serverSideCommunity,
  ]);

  const { me } = useIsAuth();
  const { data: userRoleResponse } = useUserRoleQuery({
    skip: typeof window === "undefined" || !me?.id || !community?.id,
    variables: { userId: me?.id!, communityId: community?.id! },
  });

  const userRole = useMemo(() => userRoleResponse?.userRole, [
    userRoleResponse,
  ]);

  return { community, userRole };
};

const CommunityHomePage = ({
  communityName,
  serverSideCommunity,
  children,
}: CommunityProps) => {
  const { community, userRole } = useCommunity(
    communityName,
    serverSideCommunity
  );
  const { initiateCommunityAppearance } = useSaveOrInitCommunityAppearance(
    community
  );
  const [openDrawer, setOpenDrawer] = useState(false);

  useEffect(() => {
    if (!community) {
      return;
    }
    initiateCommunityAppearance();
  }, [community]);

  const communityDescription = useMemo(() => {
    if (!community) {
      return undefined;
    }
    if (userRole?.isModerator) {
      return (
        <CommunityDescriptionModeratorMode
          community={community}
          setOpenDrawer={setOpenDrawer}
        />
      );
    }
    return <CommunityDescription community={community} />;
  }, [userRole, community, setOpenDrawer]);

  const communityAppearanceDrawer = useMemo(() => {
    if (!community || !userRole?.isModerator) {
      return undefined;
    }
    return (
      <CommunityAppearanceDrawer
        community={community}
        setOpenDrawer={setOpenDrawer}
        openDrawer={openDrawer}
      />
    );
  }, [userRole, community, openDrawer, setOpenDrawer]);

  return community ? (
    <CommunityHomeContainer
      banner={<CommunityBanner community={community} />}
      drawer={communityAppearanceDrawer}
    >
      <ContentLayout rightSideContent={communityDescription}>
        {children}
      </ContentLayout>
    </CommunityHomeContainer>
  ) : (
    <LoadingPostCard />
  );
};

export default CommunityHomePage;
