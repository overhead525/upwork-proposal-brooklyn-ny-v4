import styled from "styled-components";
import { AppHeader } from "../appHeader";
import { TabsHandler } from "./tabsHandler";
import { useSelector } from "react-redux";
import {
  actionButtonsSelector,
  tabsSelector,
} from "../../features/formBuilder/formBuilderSlice";

const StyledFormBuilder = styled.main`
  display: grid;
  place-items: center;
`;

interface FormBuilderProps {
  username: string;
}

export const FormBuilder: React.FC<FormBuilderProps> = (props) => {
  const actionButtons = useSelector(actionButtonsSelector);
  const tabs = useSelector(tabsSelector);

  return (
    <StyledFormBuilder>
      <AppHeader actionButtons={actionButtons} />
      <TabsHandler tabs={tabs.tabs} />
    </StyledFormBuilder>
  );
};
