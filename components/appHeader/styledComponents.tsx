import styled from "styled-components";

export const StyledAppHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
`;

interface StyledSideProps {
  side: "left" | "right";
}
export const StyledSide = styled.div`
  display: flex;
  ${(props: StyledSideProps) =>
    props.side.toLowerCase() === "left"
      ? "margin-left: 1rem;"
      : "margin-right: 1rem;"}

  align-items: center;
  justify-content: ${(props: StyledSideProps) =>
    props.side.toLowerCase() === "left" ? "flex-start" : "flex-end"};
`;

export const StyledList = styled.div`
  width: 18rem;
`;
