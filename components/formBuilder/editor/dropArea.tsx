import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { lastDragPointsSelector } from "../../../features/formBuilder/editorDragAndDropSlice";
import { StyledDropArea, StyledDropAreaCube } from "./styledComponents";
import { isInsidePolygon } from "./utility";

export interface DropAreaProps {
  dragPointerCoordinates: { x: number; y: number };
  className?: string;
}

export const DropArea: React.FC<DropAreaProps> = ({
  dragPointerCoordinates,
  className,
}) => {
  const [hovered, setHovered] = useState(false);
  const lastDragPoints = useSelector(lastDragPointsSelector);

  const dropAreaRef = useRef(null);

  useEffect(() => {
    isInsidePolygon(dropAreaRef, dragPointerCoordinates, 0)
      ? setHovered(true)
      : setHovered(false);
  });

  useEffect(() => {
    isInsidePolygon(dropAreaRef, lastDragPoints, 0)
      ? console.log(dropAreaRef.current)
      : null;
  }, [lastDragPoints]);

  return (
    <div>
      <StyledDropArea
        about={hovered ? "hovered" : ""}
        ref={dropAreaRef}
        className={className}
      >
        {hovered ? " " : <StyledDropAreaCube />}
      </StyledDropArea>
    </div>
  );
};
