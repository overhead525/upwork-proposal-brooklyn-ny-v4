import { AppSwitcher } from "./appSwitcher";
import { StyledAppHeader, StyledSide } from "./styledComponents";

interface AppHeaderProps {}

export const AppHeader: React.FC<AppHeaderProps> = () => {
  return (
    <StyledAppHeader>
      <StyledSide side="left">
        <AppSwitcher />
      </StyledSide>
      <StyledSide side="right">Right</StyledSide>
    </StyledAppHeader>
  );
};
