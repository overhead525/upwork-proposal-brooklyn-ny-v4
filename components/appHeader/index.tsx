import Image from "next/image";
import { AppSwitcher } from "./appSwitcher";
import { BreadcrumbHandler } from "./breadcrumbHandler";
import { StyledAppHeader, StyledSide } from "./styledComponents";

interface AppHeaderProps {}

export const AppHeader: React.FC<AppHeaderProps> = () => {
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
      <StyledSide side="right">Right</StyledSide>
    </StyledAppHeader>
  );
};
