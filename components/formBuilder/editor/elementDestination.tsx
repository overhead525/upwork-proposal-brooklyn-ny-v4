import {
  FormElementComponent,
  StyledFormElement,
} from "./FormElementComponent";
import { StyledDragDestination } from "./styledComponents";
import { DropArea } from "./dropArea";
import { useSelector } from "react-redux";
import { MouseEvent, PropsWithRef, useEffect, useRef, useState } from "react";
import { EventInfo, motion, useAnimation } from "framer-motion";
import { Card, CardContent, Typography } from "@material-ui/core";
import { isInsidePolygon } from "./utility";
import {
  userDataSelector,
  formDataSelector,
  formElementDataSelector,
} from "../../../features/userData/userDataSlice";

interface ElementsDestinationProps {
  dragPointerCoordinates: { x: number; y: number };
}

export const ElementsDestination: React.FC<ElementsDestinationProps> = ({
  dragPointerCoordinates,
}) => {
  const formElements = Object.entries(useSelector(formElementDataSelector));

  const dragDestinationRef = useRef(null);

  const renderSingleElement = (key) => {
    const elementRef = useRef(null);

    const formElementControls = useAnimation();

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
    let initialDPKey = 101;
    formElementsArr.forEach((el, i, arr) => {
      if (i < arr.length - 1) {
        finalFEs.push(el);
        finalFEs.push(
          <DropArea
            dragPointerCoordinates={dragPointerCoordinates}
            className="between"
            key={initialDPKey}
          />
        );
        initialDPKey += 1;
      } else {
        finalFEs.push(el);
      }
    });
    console.log(finalFEs);
    return finalFEs;
  };

  useEffect(() => {
    const dragDestRect: DOMRect = dragDestinationRef.current.getBoundingClientRect();
    const dragDestClientTop = dragDestinationRef.current.clientTop;
    const dragDestClientHeight = dragDestinationRef.current.clientHeight;
    const areas = {
      upperTop: dragDestRect.top,
      upperBottom: dragDestRect.height / 6 + dragDestRect.top,
      lowerTop:
        dragDestRect.top + dragDestClientHeight - dragDestClientHeight / 6,
      lowerBottom: dragDestRect.top + dragDestClientHeight,
    };

    if (isInsidePolygon(dragDestinationRef, dragPointerCoordinates)) {
      if (
        dragPointerCoordinates.y < areas.upperBottom &&
        dragPointerCoordinates.y > areas.upperTop
      ) {
        dragDestinationRef.current.scroll({
          top: -100,
          behavior: "smooth",
        });
      }
      if (
        dragPointerCoordinates.y < areas.lowerBottom &&
        dragPointerCoordinates.y > areas.lowerTop
      ) {
        console.log("in the money");
        dragDestinationRef.current.scroll({
          top: 300,
          behavior: "smooth",
        });
      }
    }
  }, [dragPointerCoordinates]);

  return (
    <StyledDragDestination ref={dragDestinationRef}>
      <DropArea dragPointerCoordinates={dragPointerCoordinates} />
      <div>{renderFormElements()}</div>
      <DropArea dragPointerCoordinates={dragPointerCoordinates} />
    </StyledDragDestination>
  );
};
