import styled from "styled-components";
import {
  AlternateEmailRounded,
  CheckBoxRounded,
  LinkRounded,
  RadioButtonCheckedRounded,
  ShortTextRounded,
  SubjectRounded,
} from "@material-ui/icons";
import { FormElementType } from "../../models/interfaces";
import { StyledElementsSelectorIconWrapper } from "./styledComponents";

export function rgba(r: number, g: number, b: number, a: number): string {
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}

export const colors = {
  ocean: [100, 171, 177, 1],
  blue: [68, 110, 197, 1],
  orange: [199, 133, 103, 1],
  red: [202, 37, 43, 1],
  green: [41, 129, 98, 1],
  purple: [133, 126, 215, 1],
  gray: [157, 158, 163, 1],
};

const icons = {
  radio: (() => {
    const StyledRadioIcon = styled(RadioButtonCheckedRounded)`
      color: ${rgba(100, 171, 177, 1)};
    `;
    return <StyledRadioIcon style={{ height: "1rem" }} />;
  })(),
  checkboxes: (() => {
    const StyledCheckboxIcon = styled(CheckBoxRounded)`
      color: ${rgba(68, 110, 197, 1)};
    `;
    return <StyledCheckboxIcon style={{ height: "1rem" }} />;
  })(),
  short_answer: (() => {
    const StyledShortAnswerIcon = styled(ShortTextRounded)`
      color: ${rgba(199, 133, 103, 1)};
    `;
    return <StyledShortAnswerIcon style={{ height: "1rem" }} />;
  })(),
  long_answer: (() => {
    const StyledSubjectIcon = styled(SubjectRounded)`
      color: ${rgba(202, 37, 43, 1)};
    `;
    return <StyledSubjectIcon style={{ height: "1rem" }} />;
  })(),
  email: (() => {
    const StyledAlternateEmail = styled(AlternateEmailRounded)`
      color: ${rgba(41, 129, 98, 1)};
    `;
    return <StyledAlternateEmail style={{ height: "1rem" }} />;
  })(),
  url: (() => {
    const StyledLink = styled(LinkRounded)`
      color: ${rgba(133, 126, 215, 1)};
    `;
    return <StyledLink style={{ height: "1rem" }} />;
  })(),
};

interface ElementsSelectorIconProps {
  color: "ocean" | "blue" | "orange" | "red" | "green" | "purple" | "gray";
  icon: FormElementType;
}

export const ElementsSelectorIcon: React.FC<ElementsSelectorIconProps> = ({
  color,
  icon,
}) => {
  function genBGColor() {
    const values = colors[color];
    return rgba(values[0], values[1], values[2], 0.2);
  }

  return (
    <StyledElementsSelectorIconWrapper color={genBGColor()}>
      {icons[icon]}
    </StyledElementsSelectorIconWrapper>
  );
};
