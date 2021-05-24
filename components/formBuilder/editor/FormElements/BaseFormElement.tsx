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
import { motion } from "framer-motion";

export interface BaseFormElementProps {
  formElement: FormElement;
  reportState?: ReportStateFunction;
}

export type ReportStateFunction = (data: {
  question: string;
  type: string;
  value: any;
}) => void;

export const BaseFormElement: React.FC<BaseFormElementProps> = ({
  formElement,
  reportState,
}) => {
  const variants = {
    radio: <Radio reportState={reportState} formElement={formElement} />,
    checkbox: <Checkbox reportState={reportState} formElement={formElement} />,
    shortanswer: (
      <ShortAnswer reportState={reportState} formElement={formElement} />
    ),
    longanswer: (
      <LongAnswer reportState={reportState} formElement={formElement} />
    ),
    email: <Email reportState={reportState} formElement={formElement} />,
    url: <URL reportState={reportState} formElement={formElement} />,
  };

  const StyledRow = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
  `;

  return (
    <motion.div
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay: 0.3,
      }}
    >
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
    </motion.div>
  );
};
