import FormControl from "@material-ui/core/FormControl";
import MuiRadio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { FormElement } from "../../../../src/generated/graphql";
import { useState } from "react";

export interface RadioProps {
  formElement: FormElement;
}

export const Radio: React.FC<RadioProps> = ({ formElement }) => {
  const [value, setValue] = useState(formElement.choices[0]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };

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
