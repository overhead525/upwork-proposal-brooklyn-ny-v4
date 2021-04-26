import MuiCheckbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { useState } from "react";
import { FormElement } from "../../../../src/generated/graphql";

export interface CheckboxProps {
  formElement: FormElement;
}

const formatChoice = (choice: string) =>
  choice.replaceAll(" ", "").toLowerCase();

export const Checkbox: React.FC<CheckboxProps> = ({ formElement }) => {
  const [state, setState] = useState(
    (() => {
      const checkedState: { [choice: string]: boolean } = {};

      formElement.choices.forEach((choice) => {
        const formattedChoice = formatChoice(choice);
        checkedState[formattedChoice] = false;
      });

      return checkedState;
    })()
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  return (
    <div>
      {formElement.choices.map((choice, index) => {
        return (
          <FormControlLabel
            key={index}
            control={
              <MuiCheckbox
                checked={state[formatChoice(choice)]}
                onChange={handleChange}
                name={formatChoice(choice)}
              />
            }
            label={choice}
          />
        );
      })}
    </div>
  );
};
