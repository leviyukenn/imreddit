import React, { ReactNode, useEffect, useMemo, useState } from "react";
import { CommunityQuery } from "../../generated/graphql";
import { useCommunity } from "../../graphql/hooks/useCommunity";
import { useUserCommunityRole } from "../../graphql/hooks/useUserCommunityRole";
import { useSaveOrInitCommunityAppearance } from "../../redux/hooks/useCommunityAppearance";
import ContentLayout from "../ContentLayout";
import { LoadingPostCard } from "../post/postCard/PostCard";
import CommunityAppearanceDrawer from "./appearance/CommunityAppearanceDrawer";
import CommunityBanner from "./CommunityBanner";
import CommunityHomeContainer from "./CommunityHomeContainer";
import CommunityDescription from "./description/CommunityDescription";
import CommunityDescriptionModeratorMode from "./description/CommunityDescriptionModeratorMode";

interface CommunityProps {
  communityName: string;
  serverSideCommunity?: CommunityQuery["community"];
  children: ReactNode;
}

const CommunityHomePage = ({
  communityName,
  serverSideCommunity,
  children,
}: CommunityProps) => {
  const { community } = useCommunity(communityName, serverSideCommunity);
  const { userRole } = useUserCommunityRole(community?.id);
  const {
    initiateCommunityAppearance,
    clearCommunityAppearance,
  } = useSaveOrInitCommunityAppearance(community);
  const [openDrawer, setOpenDrawer] = useState(false);

  useEffect(() => {
    if (!community) {
      return;
    }
    initiateCommunityAppearance();
    return () => clearCommunityAppearance();
  }, [community]);

  const communityDescription = useMemo(() => {
    if (!community) return undefined;
    if (userRole?.isModerator) {
      return (
        <CommunityDescriptionModeratorMode
          community={community}
          openDrawer={() => setOpenDrawer(true)}
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
