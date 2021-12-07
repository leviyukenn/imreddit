import React from "react";
import CreateCommunityForm from "../components/community/CreateCommunityForm";
import LoginRegisterPageLayout from "../components/LoginRegisterLayout";

const createCommunity = () => {
  return (
    <LoginRegisterPageLayout>
      <CreateCommunityForm />
    </LoginRegisterPageLayout>
  );
};
export default createCommunity;
