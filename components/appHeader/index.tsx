import { useSession } from "next-auth/client";
import Image from "next/image";
import { ActionButtonProps, ActionButtonGroup } from "./actionButtonGroup";
import { AppSwitcher } from "./appSwitcher";
import { AvatarHandler } from "./avatarHandler";
import { BreadcrumbHandler } from "./breadcrumbHandler";
import { SettingsButton } from "./settingsButton";
import { StyledAppHeader, StyledSide } from "./styledComponents";
import {
  currentFormIndexSelector,
  formDataSelector,
} from "../../features/userData/userDataSlice";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

interface PageThemeObject {
  [page: string]: {
    actionButtons: ActionButtonProps[];
  };
}

interface AppHeaderProps {
  actionButtons: ActionButtonProps[];
}

export const AppHeader: React.FC<AppHeaderProps> = ({ actionButtons }) => {
  const [session, loading] = useSession();
  const [state, setState] = useState({
    title: null,
  });
  const formData = useSelector(formDataSelector);
  const currentFormIndex = useSelector(currentFormIndexSelector);
  const currentForm = formData[Object.keys(formData)[currentFormIndex]];

  useEffect(() => {
    if (currentForm)
      setState({
        ...state,
        title: currentForm.published.title,
      });
  }, [currentForm]);

  return (
    <StyledAppHeader>
      <StyledSide side="left">
        <AppSwitcher />
        <Image src="/logo.png" width={94} height={40} />
        <BreadcrumbHandler
          username={session ? session.user.name : null}
          formTitles={[!state.title ? "..." : state.title]}
        />
      </StyledSide>
      <StyledSide side="right">
        <ActionButtonGroup buttons={actionButtons} />
        <SettingsButton />
        <AvatarHandler />
      </StyledSide>
    </StyledAppHeader>
  );
};
