import { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { dragPointerCoordinatesSelector } from "../../../features/formBuilder/editorDragAndDropSlice";
import {
  fetchFormData,
  fetchUserData,
} from "../../../features/userData/userDataSlice";
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

  const dispatch = useDispatch();
  dispatch(fetchUserData("hmcilwrick0"));
  dispatch(
    fetchFormData([
      "608055d8cac45a2092177173",
      "608055d8cac45a209217717f",
      "608055d8cac45a2092177182",
    ])
  );

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
