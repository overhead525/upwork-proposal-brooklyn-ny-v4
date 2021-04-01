import Button, { ButtonGroup } from "@atlaskit/button";

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
  return (
    <ButtonGroup>
      {buttons.map((button, index, arr) => {
        return index < arr.length - 1 ? (
          <Button
            appearance={button.appearance}
            key={button.title}
            style={{ marginRight: "0.65rem" }}
          >
            {button.text}
          </Button>
        ) : (
          <Button appearance={button.appearance} key={button.title}>
            {button.text}
          </Button>
        );
      })}
    </ButtonGroup>
  );
};
