import { useEffect, useRef, useState } from "react";
import { StyledDropArea } from "./styledComponents";
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

  const dropAreaRef = useRef(null);

  useEffect(() => {
    isInsidePolygon(dropAreaRef, dragPointerCoordinates, 0)
      ? setHovered(true)
      : setHovered(false);
  });

  return (
    <div>
      <StyledDropArea
        about={hovered ? "hovered" : ""}
        ref={dropAreaRef}
        className={className}
      >
        {" "}
      </StyledDropArea>
    </div>
  );
};
