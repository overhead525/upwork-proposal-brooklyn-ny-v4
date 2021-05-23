import styled from "styled-components";
import { colors } from "../styledComponents";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { motion } from "framer-motion";

export const StyledElementSelectorWrapper = styled.div`
  height: 100%;

  display: grid;
  grid-template-rows: auto 1fr;
`;

export const StyledHeaderWrapper = styled(motion.div)`
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

export const StyledDragDestination = styled.div`
  display: grid;
  grid-template-rows: 1fr auto 1fr;

  height: 66vh;
  overflow: auto;

  padding: 0 5rem;

  &::-webkit-scrollbar {
    display: none;
  }

  margin: auto;

  -ms-overflow-style: none;
  scrollbar-width: none;
`;

export const StyledFormElementWrapper = styled.div`
  margin: 0 auto;
`;

export const StyledFormElementSkeleton = styled(Card)`
  width: 34rem;
`;

/*
export const StyledDropArea = styled.div`
  width: 34rem;
  height: 100%;

  background-color: ${(props) =>
    props.about === "hovered" ? "rgba(0, 0, 255, 0.5)" : ""};
  border: ${(props) => (props.about === "hovered" ? "3px solid blue" : "")};
  border-radius: ${(props) => (props.about === "hovered" ? "3px" : "")};
`;
*/

export const StyledDropArea = styled.div`
  width: 100%;
  height: ${(props) => (props.className === "between" ? "3rem" : "100%")};

  display: grid;
  place-items: center;

  min-height: 3rem;

  background-color: ${(props) =>
    props.about === "hovered" ? "rgba(0, 0, 255, 0.5)" : ""};
  border-radius: ${(props) => (props.about === "hovered" ? "3px" : "")};
`;

export const StyledDropAreaCube = styled.div`
  width: 5%;
  height: 3%;
  background-color: rgba(0, 0, 255, 0.5);
  border-radius: 3px;
`;
