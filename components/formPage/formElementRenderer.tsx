import { CircularProgress, Divider } from "@material-ui/core";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { FormElement } from "../../src/generated/graphql";
import { BaseFormElement } from "../formBuilder/editor/FormElements/BaseFormElement";

interface FormElementRendererProps {
  formElements: FormElement[][];
}

const StyledWrapper = styled.div``;

export const FormElementRenderer: React.FC<FormElementRendererProps> = ({
  formElements,
}) => {
  const [loaded, setLoaded] = useState(false);

  const renderFormElements = () => {
    const FEs = formElements[0].map((fe, index) => (
      <div key={index}>
        <BaseFormElement formElement={fe} key={index} />
        <Divider style={{ margin: "1.5rem 0" }} />
      </div>
    ));
    return FEs;
  };

  useEffect(() => {
    setTimeout(() => setLoaded(true), 100);
  });

  return <StyledWrapper>{loaded ? renderFormElements() : null}</StyledWrapper>;
};
