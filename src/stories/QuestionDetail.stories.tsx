import React from "react";
import { Story, Meta } from "@storybook/react";

import {
  QuestionDetailProps,
  QuestionDetail,
} from "../../components/formBuilder/overview/QuestionDetail";
import { formElements } from "../../data/formElements";

export default {
  title: "Overview/QuestionDetail",
  component: QuestionDetail,
} as Meta;

const Template: Story<QuestionDetailProps> = (args) => (
  <QuestionDetail {...args} />
);

export const QuestionDetailExample = Template.bind({});
QuestionDetailExample.args = {
  formElement: formElements[0],
} as QuestionDetailProps;
