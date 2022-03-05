import { ReactElement } from "react";
import CommunityHomeContainer from "../components/community/CommunityHomeContainer";
import ContentLayout from "../components/ContentLayout";
import HomeMainContent from "../components/HomeMainContent";

const Index = () => {
  return (
    <CommunityHomeContainer>
      <ContentLayout>
        <HomeMainContent />
      </ContentLayout>
    </CommunityHomeContainer>
  );
};

// Index.getLayout = function getLayout(page: ReactElement) { return (
//     <CommunityHomeContainer>
//       <ContentLayout>{page}</ContentLayout>
//     </CommunityHomeContainer>
//   );
// };

export default Index;
