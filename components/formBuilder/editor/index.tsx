import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { dragPointerCoordinatesSelector } from "../../../features/formBuilder/editorDragAndDropSlice";
import { ElementsDestination } from "./elementDestination";
import { ElementSelector } from "./elementSelector";
import { StyledDragDestination } from "./styledComponents";

const StyledEditorWrapper = styled.div`
  width: 100%;

  display: grid;
  grid-template-columns: 0.2fr 4fr;
`;

const StyledDragWrapper = styled.div`
  width: 100%;

  display: grid;
  grid-template-columns: 1.3fr 2.7fr;
`;

interface EditorProps {}

export const Editor: React.FC<EditorProps> = () => {
  const dragPointerCoordinates = useSelector(dragPointerCoordinatesSelector);

  const elementsHome = useRef(null);
  const dropArea = useRef(null);

  return (
    <StyledEditorWrapper>
      <div style={{ backgroundColor: "blue" }}></div>
      <StyledDragWrapper ref={dropArea}>
        <div ref={elementsHome}>
          <ElementSelector dropAreaRef={dropArea} />
        </div>
        <ElementsDestination dragPointerCoordinates={dragPointerCoordinates} />
      </StyledDragWrapper>
    </StyledEditorWrapper>
  );
};
