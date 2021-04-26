import React from "react";
import { Story, Meta } from "@storybook/react";

import { formElements } from "../../data/formElements";

import {
  BaseFormElement,
  BaseFormElementProps,
} from "../../components/formBuilder/editor/FormElements/BaseFormElement";

export default {
  title: "Editor/BaseFormElement",
  component: BaseFormElement,
} as Meta;

const Template: Story<BaseFormElementProps> = (args) => (
  <BaseFormElement {...args} />
);

export const Radio = Template.bind({});
Radio.args = {
  formElement: formElements[0],
} as BaseFormElementProps;

export const Checkbox = Template.bind({});
Checkbox.args = {
  formElement: formElements[2],
} as BaseFormElementProps;

export const ShortAnswer = Template.bind({});
ShortAnswer.args = {
  formElement: formElements[6],
} as BaseFormElementProps;

export const LongAnswer = Template.bind({});
LongAnswer.args = {
  formElement: {
    ...formElements[6],
    type: "longAnswer",
  },
} as BaseFormElementProps;

export const Email = Template.bind({});
Email.args = {
  formElement: {
    ...formElements[6],
    type: "email",
    question: "What is your email?",
    helperText: "Enter below ⬇",
  },
} as BaseFormElementProps;

export const URL = Template.bind({});
URL.args = {
  formElement: {
    ...formElements[6],
    type: "URL",
    question: "You've got a URL for us?",
    helperText: "Enter below ⬇",
  },
} as BaseFormElementProps;
