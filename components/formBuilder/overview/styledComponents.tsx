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
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  margin-right: ${(props) => (props.about === "left" ? "2rem" : "0")};
`;

export const StyledQuestionSummaryCard = styled(Card)`
  padding: 0.5rem 1rem;

  display: flex;
  justify-content: flex-start;
`;

export const StyledQuestionDetailCard = styled(Card)`
  width: 60%;
  display: grid;
  justify-items: start;
  padding: 1rem 1.3rem;
`;
