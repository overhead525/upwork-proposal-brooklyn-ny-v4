import React from "react";
import { Story, Meta } from "@storybook/react";

import {
  QuestionSummaryCard as QSumCard,
  QuestionSummaryCardProps,
} from "../../components/formBuilder/overview/QuestionSummaryCard";
import { formElements } from "../../data/formElements";

export default {
  title: "Overview/QuestionSummaryCard",
  component: QSumCard,
} as Meta;

const Template: Story<QuestionSummaryCardProps> = (args) => (
  <QSumCard {...args} />
);

export const RadioQuestionSummaryCardExample = Template.bind({});
RadioQuestionSummaryCardExample.args = {
  formElement: formElements[0],
} as QuestionSummaryCardProps;

export const CheckboxesSummaryCardExample = Template.bind({});
CheckboxesSummaryCardExample.args = {
  formElement: formElements[2],
} as QuestionSummaryCardProps;
