import Image from "next/image";
import { ActionButtonProps, ActionButtonGroup } from "./actionButtonGroup";
import { actionButtons } from "./actionButtonHandler";
import { AppSwitcher } from "./appSwitcher";
import { AvatarHandler } from "./avatarHandler";
import { BreadcrumbHandler } from "./breadcrumbHandler";
import { SettingsButton } from "./settingsButton";
import { StyledAppHeader, StyledSide } from "./styledComponents";

interface PageThemeObject {
  [page: string]: {
    actionButtons: ActionButtonProps[];
  };
}

interface AppHeaderProps {}

export const AppHeader: React.FC<AppHeaderProps> = () => {
  const pageTheme: PageThemeObject = {
    formBuilder: {
      actionButtons,
    },
  };

  return (
    <StyledAppHeader>
      <StyledSide side="left">
        <AppSwitcher />
        <Image src="/logo.png" width={94} height={40} />
        <BreadcrumbHandler
          username="stephanie47"
          formTitles={["Political Survey"]}
        />
      </StyledSide>
      <StyledSide side="right">
        <ActionButtonGroup buttons={pageTheme.formBuilder.actionButtons} />
        <SettingsButton />
        <AvatarHandler />
      </StyledSide>
    </StyledAppHeader>
  );
};
