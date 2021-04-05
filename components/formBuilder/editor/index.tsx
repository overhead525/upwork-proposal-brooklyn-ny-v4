import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { ElementSelector } from "./elementSelector";

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
  const elementsHome = useRef(null);
  const elementsDestination = useRef(null);
  const dropArea = useRef(null);

  return (
    <StyledEditorWrapper>
      <div style={{ backgroundColor: "blue" }}></div>
      <StyledDragWrapper ref={dropArea}>
        <div ref={elementsHome}>
          <ElementSelector dropAreaRef={dropArea} />
        </div>
        <div
          style={{ backgroundColor: "yellow" }}
          ref={elementsDestination}
        ></div>
      </StyledDragWrapper>
    </StyledEditorWrapper>
  );
};
