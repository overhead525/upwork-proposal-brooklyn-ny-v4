import { CardContent, Typography } from "@material-ui/core";

export interface FormElementComponentProps {}

import styled from "styled-components";
import Card from "@material-ui/core/Card";
import { SettingsSelector } from "./SettingsSelector";

export const StyledFormElement = styled(Card)`
  width: 34rem;
`;

export const StyledContentRow = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const StyledContentColumn = styled.div`
  display: flex;
  align-items: center;

  font-size: 0.85rem;
`;

export const FormElementComponent: React.FC<FormElementComponentProps> = () => {
  return (
    <StyledFormElement>
      <CardContent>
        <StyledContentRow>
          <StyledContentColumn>
            <SettingsSelector selectState="edit" selected={false} />
            <SettingsSelector selectState="options" selected={false} />
            <SettingsSelector selectState="logic" selected={false} />
          </StyledContentColumn>
        </StyledContentRow>
      </CardContent>
    </StyledFormElement>
  );
};
