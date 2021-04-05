import React, { useEffect, useState, useRef } from "react";
import {
  StyledHeaderWrapper,
  StyledElementsWrapper,
  StyledElementSelectorWrapper,
  StyledElementCard,
  StyledCardContent,
} from "./styledComponents";
import Typography from "@material-ui/core/Typography";
import { useSelector } from "react-redux";
import { elementsSelector } from "../../../features/formBuilder/formBuilderSlice";
import { motion, PanInfo } from "framer-motion";
import pointInPolygon from "point-in-polygon";

export interface Element {
  icon: JSX.Element;
  text: string;
}

export interface ElementSelectorProps {
  dropAreaRef: React.RefObject<any>;
}

export const ElementSelector: React.FC<ElementSelectorProps> = ({
  dropAreaRef,
}) => {
  const elements = useSelector(elementsSelector);

  const renderElementCards = (_elements: Element[]) => {
    return _elements.map((element, index) => {
      return (
        <motion.div
          drag
          dragConstraints={dropAreaRef}
          dragMomentum={false}
          key={index}
        >
          <StyledElementCard>
            <StyledCardContent>
              {element.icon}
              <Typography style={{ paddingLeft: "1rem" }}>
                {element.text}
              </Typography>
            </StyledCardContent>
          </StyledElementCard>
        </motion.div>
      );
    });
  };

  return (
    <StyledElementSelectorWrapper>
      <StyledHeaderWrapper>ELEMENTS</StyledHeaderWrapper>
      <StyledElementsWrapper>
        {renderElementCards(elements)}
      </StyledElementsWrapper>
    </StyledElementSelectorWrapper>
  );
};
