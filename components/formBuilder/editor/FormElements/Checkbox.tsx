import MuiCheckbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { useEffect, useState } from "react";
import { FormElement } from "../../../../src/generated/graphql";
import { ReportStateFunction } from "./BaseFormElement";

export interface CheckboxProps {
  formElement: FormElement;
  reportState?: ReportStateFunction;
}

const formatChoice = (choice: string) =>
  choice.replaceAll(" ", "").toLowerCase();

export const Checkbox: React.FC<CheckboxProps> = ({
  formElement,
  reportState,
}) => {
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

  const reporting = () => {
    const data: {
      question: string;
      type: string;
      value: any;
    } = {
      question: formElement.question,
      type: formElement.type,
      value: state,
    };

    reportState(data);
  };

  useEffect(() => {
    reportState && reporting();
  }, [state]);

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
