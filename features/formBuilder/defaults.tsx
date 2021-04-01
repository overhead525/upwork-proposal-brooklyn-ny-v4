import OpenInNewIcon from "@material-ui/icons/OpenInNew";
import Typography from "@material-ui/core/Typography";
import { ActionButtonProps } from "../../components/appHeader/actionButtonGroup";
import { TabsHandlerProps } from "../../components/formBuilder/tabsHandler";

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

export const tabs: TabsHandlerProps = {
  tabs: [
    {
      label: "Overview",
      content: <Typography variant="subtitle1">Overview</Typography>,
    },
    {
      label: "Editor",
      content: <Typography variant="subtitle1">Editor</Typography>,
    },
    {
      label: "Workflows",
      content: <Typography variant="subtitle1">Workflows</Typography>,
    },
    {
      label: "Results",
      content: <Typography variant="subtitle1">Results</Typography>,
    },
    {
      label: "Settings",
      content: <Typography variant="subtitle1">Settings</Typography>,
    },
  ],
};
