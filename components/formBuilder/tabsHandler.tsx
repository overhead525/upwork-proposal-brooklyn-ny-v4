import styled from "styled-components";
import Tabs from "@atlaskit/tabs";
import { StyledTabsWrapper } from "./styledComponents";

interface TabData {
  label: string;
  content: string | JSX.Element;
}

export interface TabsHandlerProps {
  tabs: TabData[];
}

export const TabsHandler: React.FC<TabsHandlerProps> = ({ tabs }) => {
  return (
    <StyledTabsWrapper>
      <Tabs tabs={tabs} />
    </StyledTabsWrapper>
  );
};
