import styled from "styled-components";
import Card from "@material-ui/core/Card";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { motion } from "framer-motion";

export const StyledOverviewWrapper = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  padding: 1rem 0;
`;

export const StyledOverviewRow = styled.div`
  width: 100%;

  display: grid;
  grid-template-columns: 1fr 1fr;
`;

export const StyledOverviewNestedColumn = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  width: 100%;

  margin-right: ${(props) => (props.about === "left" ? "2rem" : "0")};
`;

export const StyledQuestionSummaryCard = styled(Card)`
  padding: 0.5rem 1rem;

  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

export const StyledQuestionDetailCard = styled(Card)`
  width: 60%;
  display: grid;
  justify-items: start;
  padding: 1rem 1.3rem;
`;

export const StyledVisibilityIcon = styled(Visibility)`
  cursor: pointer;
  color: rgba(0, 0, 0, 0.25);

  &:hover {
    color: rgba(0, 0, 0, 0.75);
  }
`;

export const StyledVisibilityOffIcon = styled(VisibilityOff)`
  cursor: pointer;
  color: rgba(0, 0, 0, 0.25);

  &:hover {
    color: rgba(0, 0, 0, 0.75);
  }
`;
