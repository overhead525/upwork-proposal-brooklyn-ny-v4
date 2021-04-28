import styled from "styled-components";
import Card from "@material-ui/core/Card";

export const StyledOverviewWrapper = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;

export const StyledOverviewRow = styled.div`
  width: 100%;

  display: grid;
  grid-template-columns: 1fr 1fr;
`;

export const StyledOverviewNestedColumn = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;

export const StyledQuestionSummaryCard = styled(Card)`
  width: 100%;
  padding: 0.5rem 1rem;

  display: grid;
  place-items: center;
  grid-template-columns: 1fr 5fr;
`;
