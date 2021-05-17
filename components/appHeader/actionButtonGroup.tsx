import Button, { ButtonGroup } from "@atlaskit/button";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  currentFormIndexSelector,
  formDataSelector,
} from "../../features/userData/userDataSlice";

export interface ActionButtonProps {
  text: string | JSX.Element;
  appearance:
    | "primary"
    | "subtle"
    | "link"
    | "subtle-link"
    | "warning"
    | "danger";
  title: string;
}

interface ActionButtonGroupProps {
  buttons: ActionButtonProps[];
}

export const ActionButtonGroup: React.FC<ActionButtonGroupProps> = ({
  buttons,
}) => {
  const formData = useSelector(formDataSelector);
  const currentFormIndex = useSelector(currentFormIndexSelector);
  const currentFormID = Object.keys(formData)[currentFormIndex];
  const [current, setCurrent] = useState(null);

  useEffect(() => {
    if (currentFormID) {
      setCurrent(currentFormID);
    }
  }, [currentFormID]);

  const ButtonWrapper = (button: ActionButtonProps): JSX.Element => {
    const outputtedButton = (
      <Button
        appearance={button.appearance}
        key={button.title}
        style={{ marginRight: "0.65rem" }}
      >
        {button.text}
      </Button>
    );

    return currentFormID && button.title.toLowerCase() === "view" ? (
      <a
        href={`/forms/${currentFormID}`}
        target="_blank"
        style={{ textDecoration: "none" }}
      >
        {outputtedButton}
      </a>
    ) : (
      outputtedButton
    );
  };

  return (
    <ButtonGroup>
      {buttons.map((button, index, arr) => {
        return index < arr.length - 1 ? (
          ButtonWrapper(button)
        ) : (
          <Button appearance={button.appearance} key={button.title}>
            {button.text}
          </Button>
        );
      })}
    </ButtonGroup>
  );
};
