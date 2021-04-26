import { IconButton, Typography } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import { FormElement } from "../../../../src/generated/graphql";
import { Checkbox } from "./Checkbox";
import { Radio } from "./Radio";
import { ShortAnswer } from "./ShortAnswer";
import styled from "styled-components";
import { LongAnswer } from "./LongAnswer";
import { Email } from "./Email";
import { URL } from "./URL";

export interface BaseFormElementProps {
  formElement: FormElement;
}

export const BaseFormElement: React.FC<BaseFormElementProps> = ({
  formElement,
}) => {
  const variants = {
    radio: <Radio formElement={formElement} />,
    checkbox: <Checkbox formElement={formElement} />,
    shortanswer: <ShortAnswer formElement={formElement} />,
    longanswer: <LongAnswer formElement={formElement} />,
    email: <Email formElement={formElement} />,
    url: <URL formElement={formElement} />,
  };

  const StyledRow = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
  `;

  return (
    <div>
      <StyledRow>
        <Typography variant="h5">{formElement.question}</Typography>
        <IconButton aria-label="edit">
          <EditIcon />
        </IconButton>
      </StyledRow>
      <Typography variant="body1" style={{ marginBottom: "1rem" }}>
        {formElement.helperText}
      </Typography>
      {typeof formElement.type === "string"
        ? variants[formElement.type.toLowerCase()]
        : null}
    </div>
  );
};
