import TextField from "@material-ui/core/TextField";
import { useState } from "react";
import { FormElement } from "../../../../src/generated/graphql";

export interface LongAnswerProps {
  formElement: FormElement;
}

export const LongAnswer: React.FC<LongAnswerProps> = ({ formElement }) => {
  const [value, setValue] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <TextField
      style={{ width: "100%" }}
      value={value}
      multiline
      rows={4}
      rowsMax={7}
      onChange={handleChange}
      variant="outlined"
    />
  );
};
