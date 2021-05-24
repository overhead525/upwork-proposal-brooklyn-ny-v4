import styled from "styled-components";
import Button from "@atlaskit/button";

export interface SubmitButtonProps {
  onClick?: (...args) => void;
}

export const SubmitButton: React.FC<SubmitButtonProps> = ({ onClick }) => (
  <Button appearance="primary" onClick={onClick}>
    Submit
  </Button>
);
