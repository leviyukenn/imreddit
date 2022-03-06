import { useRouter } from "next/router";
import React from "react";
import ContentLayout from "../../components/ContentLayout";
import HomeContainer from "../../components/HomeContainer";
import SearchPostsContent from "../../components/searchResult/SearchPostContent";

interface SearchResultPageProps {}

const SearchResultPage = ({}: SearchResultPageProps) => {
  const router = useRouter();
  const keyword = (router.query.keyword || "") as string;
  const communityName = (router.query.communityName as string) || undefined;

  if (!keyword) return null;
  return (
    <HomeContainer>
      <ContentLayout
      // rightSideContent={<UserPageRightSideContent />}
      >
        <SearchPostsContent keyword={keyword} communityName={communityName} />
      </ContentLayout>
    </HomeContainer>
  );
};
export default SearchResultPage;
