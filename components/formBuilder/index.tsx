import styled from "styled-components";
import { AppHeader } from "../appHeader";

const StyledFormBuilder = styled.main`
  display: grid;
  place-items: center;
`;

interface FormBuilderProps {
  username: string;
}

export const FormBuilder: React.FC<FormBuilderProps> = (props) => {
  return (
    <StyledFormBuilder>
      <AppHeader />
    </StyledFormBuilder>
  );
};
