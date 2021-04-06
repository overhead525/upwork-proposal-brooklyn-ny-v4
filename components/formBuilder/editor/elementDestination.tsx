import { StyledDragDestination, StyledFormElement } from "./styledComponents";
import { elementsSelector } from "../../../features/formDisplay/formDisplaySlice";
import { useSelector } from "react-redux";
import { MouseEvent, PropsWithRef, useEffect, useRef, useState } from "react";
import { EventInfo, motion, useAnimation } from "framer-motion";
import { Card, CardContent, Typography } from "@material-ui/core";

interface ElementsDestinationProps {}

type Orientation = "above" | "below";

export const ElementsDestination: React.FC<ElementsDestinationProps> = ({}) => {
  const [formElements, setFormElements] = useState([0, 1, 2, 3, 4, 5, 6, 7]);

  const renderSingleElement = (key) => {
    return (
      <motion.div whileHover={{ translateY: 20 }} key={key}>
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
