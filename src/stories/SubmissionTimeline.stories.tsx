import React from "react";
import { Story, Meta } from "@storybook/react";

import {
  SubmissionTimeline,
  SubmissionTimelineProps,
} from "../../components/formBuilder/overview/SubmissionTimeline";

export default {
  title: "Overview/SubmissionTimeline",
  component: SubmissionTimeline,
} as Meta;

const Template: Story<SubmissionTimelineProps> = (args) => (
  <SubmissionTimeline {...args} />
);

export const SubmissionTimelineExample = Template.bind({});
SubmissionTimelineExample.args = {
  resultData: [0, 10, 15, 9, 3, 17, 7],
} as SubmissionTimelineProps;
