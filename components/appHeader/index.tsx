import { useSession } from "next-auth/client";
import Image from "next/image";
import { ActionButtonProps, ActionButtonGroup } from "./actionButtonGroup";
import { AppSwitcher } from "./appSwitcher";
import { AvatarHandler } from "./avatarHandler";
import { BreadcrumbHandler } from "./breadcrumbHandler";
import { SettingsButton } from "./settingsButton";
import { StyledAppHeader, StyledSide } from "./styledComponents";
import { formDataSelector } from "../../features/userData/userDataSlice";
import { useSelector } from "react-redux";

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
  const formData = useSelector(formDataSelector);

  return (
    <StyledAppHeader>
      <StyledSide side="left">
        <AppSwitcher />
        <Image src="/logo.png" width={94} height={40} />
        <BreadcrumbHandler
          username={session ? session.user.name : null}
          formTitles={["Water Gun"]}
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
