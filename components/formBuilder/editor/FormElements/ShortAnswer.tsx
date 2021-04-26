import TextField from "@material-ui/core/TextField";
import { useState } from "react";
import { FormElement } from "../../../../src/generated/graphql";

export interface ShortAnswerProps {
  formElement: FormElement;
}

export const ShortAnswer: React.FC<ShortAnswerProps> = ({ formElement }) => {
  const [value, setValue] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <TextField
      style={{ width: "100%" }}
      value={value}
      onChange={handleChange}
    />
  );
};
