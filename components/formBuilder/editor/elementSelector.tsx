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

export interface Element {
  icon: JSX.Element;
  text: string;
}

export interface ElementSelectorProps {}

export const ElementSelector: React.FC<ElementSelectorProps> = () => {
  const elements = useSelector(elementsSelector);

  const renderElementCards = (_elements: Element[]) => {
    return _elements.map((element, index) => {
      return (
        <StyledElementCard key={index}>
          <StyledCardContent>
            {element.icon}
            <Typography style={{ paddingLeft: "1rem" }}>
              {element.text}
            </Typography>
          </StyledCardContent>
        </StyledElementCard>
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
