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
import { motion, PanInfo, useAnimation } from "framer-motion";

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
  const cardControls = useAnimation();

  const renderElementCards = (_elements: Element[]) => {
    return _elements.map((element, index) => {
      return (
        <motion.div
          animate={cardControls}
          drag
          dragConstraints={dropAreaRef}
          dragMomentum={false}
          onDragEnd={(event, info: PanInfo) => {
            if (info.offset.x > 360) {
              cardControls.start({
                x: -info.delta.x,
                y: -info.delta.y,
                transition: { duration: 0 },
              });
              return;
            }
            cardControls.start({
              x: -info.delta.x,
              y: -info.delta.y,
              transition: { duration: 0.2 },
            });
          }}
          whileHover={{ scale: 1.1 }}
          whileDrag={{ scale: 0.75, opacity: 0.8 }}
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
