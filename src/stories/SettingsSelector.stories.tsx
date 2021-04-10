import React from "react";
import { Story, Meta } from "@storybook/react";

import {
  SettingsSelector,
  SettingsSelectorProps,
} from "../../components/formBuilder/editor/FormElementComponent/SettingsSelector";

export default {
  title: "Editor/SettingsSelector",
  component: SettingsSelector,
} as Meta;

const Template: Story<SettingsSelectorProps> = (args) => (
  <SettingsSelector {...args} />
);

export const EditSelector = Template.bind({});
EditSelector.args = {
  selectState: "edit",
};

export const OptionsSelector = Template.bind({});
OptionsSelector.args = {
  selectState: "options",
};

export const LogicSelector = Template.bind({});
LogicSelector.args = {
  selectState: "logic",
};
