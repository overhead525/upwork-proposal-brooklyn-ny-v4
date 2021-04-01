import OpenInNewIcon from "@material-ui/icons/OpenInNew";
import { ActionButtonProps } from "./actionButtonGroup";

export const actionButtons: ActionButtonProps[] = [
  {
    title: "View",
    appearance: "primary",
    text: (() => {
      return (
        <div style={{ display: "flex", alignItems: "center" }}>
          {"View"}
          <OpenInNewIcon style={{ marginLeft: "0.5rem" }} />
        </div>
      );
    })(),
  },
  {
    title: "Create New",
    appearance: "primary",
    text: "Create New",
  },
];
