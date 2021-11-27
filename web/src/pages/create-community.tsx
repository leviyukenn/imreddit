import React from "react";
import CreateCommunityForm from "../components/community/CreateCommunityForm";
import LoginRegisterPageLayout from "../components/LoginRegisterPageLayout";

const createCommunity = () => {
  return (
    <LoginRegisterPageLayout>
      <CreateCommunityForm />
    </LoginRegisterPageLayout>
  );
};
export default createCommunity;
