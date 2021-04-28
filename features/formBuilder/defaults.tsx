import OpenInNewIcon from "@material-ui/icons/OpenInNew";
import Typography from "@material-ui/core/Typography";
import { ActionButtonProps } from "../../components/appHeader/actionButtonGroup";
import { Editor } from "../../components/formBuilder/editor";
import { Overview } from "../../components/formBuilder/overview";
import { TabsHandlerProps } from "../../components/formBuilder/tabsHandler";
import { Element } from "../../components/formBuilder/editor/elementSelector";
import { ElementsSelectorIcon } from "./components";

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
      content: <Editor />,
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

export const elements: Element[] = [
  {
    icon: <ElementsSelectorIcon color="ocean" icon="radio" />,
    text: "Radio",
  },
  {
    icon: <ElementsSelectorIcon color="blue" icon="checkbox" />,
    text: "Checkbox",
  },
  {
    icon: <ElementsSelectorIcon color="orange" icon="short_answer" />,
    text: "Short Answer",
  },
  {
    icon: <ElementsSelectorIcon color="red" icon="short_answer" />,
    text: "Long Answer",
  },
  {
    icon: <ElementsSelectorIcon color="green" icon="email" />,
    text: "Email",
  },
  {
    icon: <ElementsSelectorIcon color="purple" icon="url" />,
    text: "URL",
  },
];

export const dragPolygons = {
  home: null,
  destination: null,
};
