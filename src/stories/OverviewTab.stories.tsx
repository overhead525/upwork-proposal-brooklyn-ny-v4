import React from "react";
import { Story, Meta } from "@storybook/react";

import { Overview, OverviewProps } from "../../components/formBuilder/overview";

export default {
  title: "Overview/OverviewTab",
  component: Overview,
} as Meta;

const Template: Story<OverviewProps> = (args) => <Overview {...args} />;

export const OverviewTab = Template.bind({});
OverviewTab.args = {} as OverviewProps;
