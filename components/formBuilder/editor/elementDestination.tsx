import {
  FormElementComponent,
  StyledFormElement,
} from "./FormElementComponent";
import { StyledDragDestination } from "./styledComponents";
import { DropArea } from "./dropArea";
import { MouseEvent, PropsWithRef, useEffect, useRef, useState } from "react";
import { EventInfo, motion, useAnimation } from "framer-motion";
import { Card, CardContent, Typography } from "@material-ui/core";
import { isInsidePolygon } from "./utility";

interface ElementsDestinationProps {
  dragPointerCoordinates: { x: number; y: number };
}

type Orientation = "above" | "below";

export const ElementsDestination: React.FC<ElementsDestinationProps> = ({
  dragPointerCoordinates,
}) => {
  const [formElements, setFormElements] = useState([0, 1, 2]);

  const renderSingleElement = (key) => {
    // const [translated, setTranslated] = useState(false);

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

    /*
    useEffect(() => {
      const inside = isInsidePolygon(elementRef, dragPointerCoordinates);
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
    */

    return (
      <motion.div key={key} ref={elementRef} animate={formElementControls}>
        <FormElementComponent />
      </motion.div>
    );
  };

  const renderFormElements = () => {
    const formElementsArr = formElements.map((el, index, arr) => {
      return index < arr.length - 1
        ? renderSingleElement(index)
        : renderSingleElement(index);
    });
    const finalFEs = [];
    formElementsArr.forEach((el, i, arr) => {
      if (i < arr.length - 1) {
        finalFEs.push(el);
        finalFEs.push(
          <DropArea
            dragPointerCoordinates={dragPointerCoordinates}
            className="between"
          />
        );
      } else {
        finalFEs.push(el);
      }
    });
    console.log(finalFEs);
    return finalFEs;
  };

  return (
    <StyledDragDestination>
      <DropArea dragPointerCoordinates={dragPointerCoordinates} />
      <div>{renderFormElements()}</div>
      <DropArea dragPointerCoordinates={dragPointerCoordinates} />
    </StyledDragDestination>
  );
};
