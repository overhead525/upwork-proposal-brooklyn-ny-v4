import { StyledAppHeader, StyledSide } from "./styledComponents";

interface AppHeaderProps {}

export const AppHeader: React.FC<AppHeaderProps> = () => {
  return (
    <StyledAppHeader>
      <StyledSide side="left">Left</StyledSide>
      <StyledSide side="right">Right</StyledSide>
    </StyledAppHeader>
  );
};
