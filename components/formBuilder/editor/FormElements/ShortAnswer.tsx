import TextField from "@material-ui/core/TextField";
import { useEffect, useState } from "react";
import { FormElement } from "../../../../src/generated/graphql";
import { ReportStateFunction } from "./BaseFormElement";

export interface ShortAnswerProps {
  formElement: FormElement;
  reportState?: ReportStateFunction;
}

export const ShortAnswer: React.FC<ShortAnswerProps> = ({
  formElement,
  reportState,
}) => {
  const [value, setValue] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const reporting = () => {
    const data: {
      question: string;
      type: string;
      value: any;
    } = {
      question: formElement.question,
      type: formElement.type,
      value,
    };

    reportState(data);
  };

  useEffect(() => {
    reportState && reporting();
  }, [value]);

  return (
    <TextField
      style={{ width: "100%" }}
      value={value}
      onChange={handleChange}
    />
  );
};
