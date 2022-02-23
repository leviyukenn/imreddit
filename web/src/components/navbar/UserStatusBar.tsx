import React from "react";
import { useIsAuth } from "../../utils/hooks/useIsAuth";
import LoginRegisterButtonGroup from "./LoginRegisterButtonGroup";
import UserDropDown from "./userDropDown/UserDropDown";

interface UserStatusBarProps {}

const UserStatusBar = ({}: UserStatusBarProps) => {
  const { me } = useIsAuth();

  if (me) {
    return <UserDropDown me={me} />;
  } else {
    return <LoginRegisterButtonGroup />;
  }
};
export default UserStatusBar;
