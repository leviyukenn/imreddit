import ContentLayout from "../components/ContentLayout";
import HomeContainer from "../components/HomeContainer";
import HomeMainContent from "../components/HomeMainContent";

const Index = () => {
  return (
    <HomeContainer>
      <ContentLayout>
        <HomeMainContent />
      </ContentLayout>
    </HomeContainer>
  );
};

export default Index;
