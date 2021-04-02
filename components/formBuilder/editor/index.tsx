import styled from "styled-components";
import { ElementSelector } from "./elementSelector";

const StyledEditorWrapper = styled.div`
  width: 100%;

  display: grid;
  grid-template-columns: 0.2fr 1.2fr 2.5fr;
`;

interface EditorProps {}

export const Editor: React.FC<EditorProps> = () => {
  return (
    <StyledEditorWrapper>
      <div style={{ backgroundColor: "blue" }}></div>
      <ElementSelector />
      <div style={{ backgroundColor: "yellow" }}></div>
    </StyledEditorWrapper>
  );
};
