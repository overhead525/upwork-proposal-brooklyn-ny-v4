import styled from "styled-components";
import { colors } from "../styledComponents";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

export const StyledElementSelectorWrapper = styled.div`
  height: 100%;

  display: grid;
  grid-template-rows: auto 1fr;
`;

export const StyledHeaderWrapper = styled.div`
  padding: 1rem 1.25rem;
  background-color: ${colors.headerGray};
`;

export const StyledElementsWrapper = styled.div`
  padding: 0 1.25rem;
  background-color: ${colors.spaceBackground};
`;

export const StyledElementCard = styled(Card)`
  height: 4.1rem;

  margin-top: 1.2rem;
`;

export const StyledCardContent = styled(CardContent)`
  display: flex;
`;
