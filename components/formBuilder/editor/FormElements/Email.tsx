import TextField from "@material-ui/core/TextField";
import { useEffect, useState } from "react";
import { FormElement } from "../../../../src/generated/graphql";
import { ReportStateFunction } from "./BaseFormElement";

export interface EmailProps {
  formElement: FormElement;
  reportState?: ReportStateFunction;
}

export const Email: React.FC<EmailProps> = ({ formElement, reportState }) => {
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const isEmail = (email) => {
    return /^([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22))*\x40([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d))*$/.test(
      email
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
    setError(!isEmail(value));
  }, [value]);

  return (
    <TextField
      error={error}
      style={{ width: "100%" }}
      placeholder="Email"
      value={value}
      onChange={handleChange}
    />
  );
};
