import TextField from "@material-ui/core/TextField";
import { useEffect, useState } from "react";
import { FormElement } from "../../../../src/generated/graphql";
import { ReportStateFunction } from "./BaseFormElement";

export interface URLProps {
  formElement: FormElement;
  reportState?: ReportStateFunction;
}

export const URL: React.FC<URLProps> = ({ formElement, reportState }) => {
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const isURL = (URL) => {
    return /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/.test(
      URL
    );
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
    setError(!isURL(value));
  }, [value]);

  return (
    <TextField
      error={error}
      style={{ width: "100%" }}
      placeholder="URL"
      value={value}
      onChange={handleChange}
    />
  );
};
