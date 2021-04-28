import { Typography } from "@material-ui/core";
import {
  StyledOverviewNestedColumn,
  StyledOverviewRow,
  StyledOverviewWrapper,
} from "./styledComponents";

export interface OverviewProps {}

export const Overview: React.FC<OverviewProps> = () => {
  const selection = {
    formTitle: "Water Gun",
    publishedFormTitle: "Water Guns",
  };

  return (
    <StyledOverviewWrapper>
      <Typography variant="h2" align="left">
        {selection.formTitle}
      </Typography>
      <StyledOverviewRow>
        <StyledOverviewNestedColumn>
          <Typography variant="h4">Preview</Typography>
          <Typography variant="h6" aria-label="title">
            {`Title: `}
            <strong>{selection.publishedFormTitle}</strong>
          </Typography>
        </StyledOverviewNestedColumn>
        <StyledOverviewNestedColumn>
          <Typography variant="h4">Published</Typography>
        </StyledOverviewNestedColumn>
      </StyledOverviewRow>
    </StyledOverviewWrapper>
  );
};
