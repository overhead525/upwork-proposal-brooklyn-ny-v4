import styled from "styled-components";

export const StyledElementsSelectorIconWrapper = styled.div`
  background-color: ${(props) => (props.color ? props.color : "blue")};
  border-radius: 50%;
  width: fit-content;
  display: grid;
  place-items: center;
`;
