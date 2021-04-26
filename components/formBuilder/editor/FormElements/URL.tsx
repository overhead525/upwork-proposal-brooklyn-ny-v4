import TextField from "@material-ui/core/TextField";
import { useEffect, useState } from "react";
import { FormElement } from "../../../../src/generated/graphql";

export interface URLProps {
  formElement: FormElement;
}

export const URL: React.FC<URLProps> = ({ formElement }) => {
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

  useEffect(() => {
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
