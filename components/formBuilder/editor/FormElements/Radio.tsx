import FormControl from "@material-ui/core/FormControl";
import MuiRadio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { FormElement } from "../../../../src/generated/graphql";
import { useEffect, useState } from "react";
import { ReportStateFunction } from "./BaseFormElement";

export interface RadioProps {
  formElement: FormElement;
  reportState?: ReportStateFunction;
}

export const Radio: React.FC<RadioProps> = ({ formElement, reportState }) => {
  const [value, setValue] = useState(formElement.choices[0]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
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
    <FormControl component="fieldset">
      <RadioGroup
        aria-label={formElement.questionKey}
        name={formElement.question.replace(" ", "_")}
        value={value}
        onChange={handleChange}
      >
        {formElement.choices.map((choice) => {
          return (
            <FormControlLabel
              value={choice}
              control={<MuiRadio color="primary" />}
              label={choice}
            />
          );
        })}
      </RadioGroup>
    </FormControl>
  );
};
