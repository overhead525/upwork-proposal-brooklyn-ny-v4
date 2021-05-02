import React, {
  useEffect,
  useState,
  useRef,
  Dispatch,
  SetStateAction,
} from "react";
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
import { ElementCard } from "./elementCard";

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
        <ElementCard
          dropAreaRef={dropAreaRef}
          key={index}
          icon={element.icon}
          text={element.text}
        />
      );
    });
  };

  return (
    <StyledElementSelectorWrapper>
      <StyledHeaderWrapper
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
          duration: 2,
        }}
      >
        ELEMENTS
      </StyledHeaderWrapper>
      <StyledElementsWrapper>
        {renderElementCards(elements)}
      </StyledElementsWrapper>
    </StyledElementSelectorWrapper>
  );
};
