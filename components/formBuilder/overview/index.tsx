import { Typography } from "@material-ui/core";
import { formElements } from "../../../data/formElements";
import { FormElement } from "../../../src/generated/graphql";
import { QuestionSummaryCard } from "./QuestionSummaryCard";
import {
  StyledOverviewNestedColumn,
  StyledOverviewRow,
  StyledOverviewWrapper,
} from "./styledComponents";
import { SubmissionTimeline } from "./SubmissionTimeline";

export interface OverviewProps {}

export const Overview: React.FC<OverviewProps> = () => {
  const selection = {
    formTitle: "Water Gun",
    publishedFormTitle: "Water Guns",
    formElements: [...formElements.slice(0, 5)],
  };

  return (
    <StyledOverviewWrapper>
      <Typography variant="h2" align="left" style={{ marginBottom: "3rem" }}>
        {selection.formTitle}
      </Typography>
      <div style={{ width: "100%", display: "grid", placeItems: "center" }}>
        <div style={{ width: "61%" }}>
          <SubmissionTimeline />
        </div>
      </div>
      <StyledOverviewRow>
        <StyledOverviewNestedColumn>
          <Typography variant="h6">Preview</Typography>
          <Typography variant="body1" aria-label="title">
            {`Title: `}
            <strong>{selection.publishedFormTitle}</strong>
          </Typography>
          {selection.formElements.map((el: FormElement, i, arr) => {
            if (i < arr.length - 1)
              return (
                <div style={{ marginBottom: "1rem" }}>
                  <QuestionSummaryCard formElement={el} />
                </div>
              );
            return (
              <div>
                <QuestionSummaryCard formElement={el} />
              </div>
            );
          })}
        </StyledOverviewNestedColumn>
        <StyledOverviewNestedColumn>
          <Typography variant="h4">Published</Typography>
        </StyledOverviewNestedColumn>
      </StyledOverviewRow>
    </StyledOverviewWrapper>
  );
};
