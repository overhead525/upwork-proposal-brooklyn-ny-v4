import { StyledDragDestination, StyledFormElement } from "./styledComponents";
import { elementsSelector } from "../../../features/formDisplay/formDisplaySlice";
import { useSelector } from "react-redux";
import { MouseEvent, PropsWithRef, useEffect, useRef, useState } from "react";
import { EventInfo, motion, useAnimation } from "framer-motion";
import { Card, CardContent, Typography } from "@material-ui/core";

interface ElementsDestinationProps {
  dragPointerCoordinates: { x: number; y: number };
}

type Orientation = "above" | "below";

export const ElementsDestination: React.FC<ElementsDestinationProps> = ({
  dragPointerCoordinates,
}) => {
  const [formElements, setFormElements] = useState([0, 1, 2, 3, 4]);

  const renderSingleElement = (key) => {
    const [translated, setTranslated] = useState(false);

    const elementRef = useRef(null);

    const formElementControls = useAnimation();

    const makeRoom = (invert: boolean = true) => {
      const multiplier = invert ? -1 : 1;
      formElementControls.start({
        y: 15 * multiplier,
        transition: { duration: 0.2 },
      });
      if (!invert) {
        elementRef.current.style.borderTop = "3px solid blue";
        elementRef.current.style.borderRadius = "3px";
        return;
      }
      elementRef.current.style.borderBottom = "3px solid blue";
      elementRef.current.style.borderRadius = "3px";
    };

    const undoMakeRoom = () => {
      formElementControls.set({
        y: 0,
        transition: { duration: 0.2 },
      });
      elementRef.current.style.border = "";
    };

    const isInsidePolygon = (): boolean => {
      const boundingRect: DOMRect = elementRef.current.getBoundingClientRect();
      if (!boundingRect) return;

      const withinBounds = (
        point: { x: number; y: number },
        top: number,
        right: number,
        bottom: number,
        left: number
      ): boolean => {
        if (
          left < point.x &&
          point.x < right &&
          top < point.y &&
          point.y < bottom
        ) {
          return true;
        }
        return false;
      };

      return withinBounds(
        dragPointerCoordinates,
        boundingRect.top - boundingRect.height / 3,
        boundingRect.right,
        boundingRect.bottom + boundingRect.height / 3,
        boundingRect.left
      );
    };

    const determineHalf = (): "upper" | "lower" => {
      const boundingRect: DOMRect = elementRef.current.getBoundingClientRect();
      if (!boundingRect) return;

      const upperOrLowerHalf = (
        point: { x: number; y: number },
        top: number,
        bottom: number,
        height: number
      ): "upper" | "lower" => {
        if (point.y > top && point.y < top + height / 2) return "upper";
        if (point.y > top + height / 2 && point.y < bottom) return "lower";
      };

      return upperOrLowerHalf(
        dragPointerCoordinates,
        boundingRect.top - boundingRect.height / 3,
        boundingRect.bottom + boundingRect.height / 3,
        boundingRect.height
      );
    };

    useEffect(() => {
      const inside = isInsidePolygon();
      if (inside && !translated) {
        setTranslated(true);

        const half = determineHalf();
        if (half === "upper") {
          makeRoom(false);
        }
        if (half === "lower") {
          makeRoom(true);
        }
      }
      if (!inside) {
        setTranslated(false);
        if (!translated) {
          undoMakeRoom();
        }
      }
    });

    return (
      <motion.div key={key} ref={elementRef} animate={formElementControls}>
        <StyledFormElement>
          <CardContent>
            <Typography>Wonder</Typography>
          </CardContent>
        </StyledFormElement>
      </motion.div>
    );
  };

  const renderFormElements = () => {
    return formElements.map((el, index) => {
      return renderSingleElement(index);
    });
  };

  return <StyledDragDestination>{renderFormElements()}</StyledDragDestination>;
};
