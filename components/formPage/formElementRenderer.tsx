import { CircularProgress, Divider } from "@material-ui/core";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { FormElement } from "../../src/generated/graphql";
import {
  BaseFormElement,
  ReportStateFunction,
} from "../formBuilder/editor/FormElements/BaseFormElement";
import { SubmitButton } from "./submitButton";

interface FormElementRendererProps {
  formElements: FormElement[][];
}

const StyledWrapper = styled.div``;

export const FormElementRenderer: React.FC<FormElementRendererProps> = ({
  formElements,
}) => {
  const [loaded, setLoaded] = useState(false);
  const [formState, setFormState] = useState({});

  const handleSubmit = () => {
    alert(`
      Here is the data you submitted:

      ${JSON.stringify(formState)}
    `);
  };

  const reportStateManager: ReportStateFunction = (data) => {
    const stateCopy = { ...formState };
    stateCopy[data.question] = {
      type: data.type,
      value: data.value,
    };
    setFormState(stateCopy);
  };

  const renderFormElements = () => {
    const FEs = formElements[0].map((fe, index) => (
      <div key={index}>
        <BaseFormElement
          reportState={reportStateManager}
          formElement={fe}
          key={index}
        />
        <Divider style={{ margin: "1.5rem 0" }} />
      </div>
    ));
    return FEs;
  };

  useEffect(() => {
    setTimeout(() => setLoaded(true), 100);
  });

  return (
    <StyledWrapper>
      {loaded ? renderFormElements() : null}
      <SubmitButton onClick={handleSubmit} />
    </StyledWrapper>
  );
};
