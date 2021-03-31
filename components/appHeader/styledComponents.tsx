import styled from "styled-components";

export const StyledAppHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
`;

interface StyledSideProps {
  side: string;
}
export const StyledSide = styled.div`
  display: flex;
  margin: 0 1rem;

  justify-content: ${(props: StyledSideProps) =>
    props.side === "left" ? "flex-start" : "flex-end"};
`;
