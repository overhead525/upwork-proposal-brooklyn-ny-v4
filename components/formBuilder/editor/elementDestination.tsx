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
  const [formElements, setFormElements] = useState([0, 1, 2]);

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
      elementRef.current.style.boxShadow = "-1px 35px 6px -13px #446ec5";
    };

    const undoMakeRoom = (invert: boolean = true) => {
      const multiplier = invert ? -1 : 1;
      formElementControls.start({
        y: -15 * multiplier,
        transition: { duration: 0.2 },
      });
      elementRef.current.style.boxShadow = "";
    };

    const isInsidePolygon = (): {
      inside: boolean;
      half: "upper" | "lower";
    } => {
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

      const upperOrLowerHalf = (
        point: { x: number; y: number },
        top: number,
        bottom: number,
        height: number
      ): "upper" | "lower" => {
        if (point.y > top && point.y < top + height / 2) return "upper";
        if (point.y > top + height / 2 && point.y < bottom) return "lower";
      };

      return {
        inside: withinBounds(
          dragPointerCoordinates,
          boundingRect.top,
          boundingRect.right,
          boundingRect.bottom,
          boundingRect.left
        ),
        half: upperOrLowerHalf(
          dragPointerCoordinates,
          boundingRect.top,
          boundingRect.bottom,
          boundingRect.height
        ),
      };
    };

    useEffect(() => {
      const inside = isInsidePolygon().inside;
      const half = isInsidePolygon().half;
      if (inside && !translated) {
        setTranslated(true);
        makeRoom();
      }
      if (!inside && translated) {
        undoMakeRoom();
        setTranslated(false);
      }
    }, [dragPointerCoordinates]);

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
