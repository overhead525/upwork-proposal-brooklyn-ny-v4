import { Typography } from "@material-ui/core";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { formElements } from "../../../data/formElements";
import { questionDetailViewSelector } from "../../../features/formBuilder/overviewSlice";
import { FormElement } from "../../../src/generated/graphql";
import { TabsHandler, TabsHandlerProps } from "../tabsHandler";
import { QuestionDetail } from "./QuestionDetail";
import { QuestionSummaryCard } from "./QuestionSummaryCard";
import {
  StyledOverviewNestedColumn,
  StyledOverviewRow,
  StyledOverviewWrapper,
} from "./styledComponents";
import { SubmissionTimeline } from "./SubmissionTimeline";

export interface OverviewProps {}

export const Overview: React.FC<OverviewProps> = () => {
  const [questionDetailView, setQuestionDetailView] = useState(false);
  const [questionFormElement, setQuestionFormElement] = useState(
    null as FormElement
  );

  const selection = {
    formTitle: "Water Gun",
    publishedFormTitle: "Water Guns",
    formElements: [...formElements.slice(0, 5)],
  };

  const tabs: TabsHandlerProps = {
    tabs: [
      {
        label: "Preview",
        content: (
          <StyledOverviewNestedColumn about="left">
            <Typography variant="h6">Preview</Typography>
            <Typography variant="body1" aria-label="title">
              {`Title: `}
              <strong>{selection.publishedFormTitle}</strong>
            </Typography>
            {selection.formElements.map((el: FormElement, i, arr) => {
              if (i < arr.length - 1)
                return (
                  <div style={{ marginBottom: "1rem", width: "100%" }}>
                    <QuestionSummaryCard
                      formElement={el}
                      stateUpdateFunctions={{
                        setQuestionDetailView,
                        setQuestionFormElement,
                      }}
                    />
                  </div>
                );
              return (
                <div style={{ width: "100%" }}>
                  <QuestionSummaryCard
                    formElement={el}
                    stateUpdateFunctions={{
                      setQuestionDetailView,
                      setQuestionFormElement,
                    }}
                  />
                </div>
              );
            })}
          </StyledOverviewNestedColumn>
        ),
      },
      {
        label: "Published",
        content: (
          <StyledOverviewNestedColumn>
            <Typography variant="h6">Published</Typography>
            <Typography variant="body1" aria-label="title">
              {`Title: `}
              <strong>{selection.publishedFormTitle}</strong>
            </Typography>
            {selection.formElements.map((el: FormElement, i, arr) => {
              if (i < arr.length - 1)
                return (
                  <div style={{ marginBottom: "1rem", width: "100%" }} key={i}>
                    <QuestionSummaryCard
                      formElement={el}
                      stateUpdateFunctions={{
                        setQuestionDetailView,
                        setQuestionFormElement,
                      }}
                    />
                  </div>
                );
              return (
                <div style={{ width: "100%" }} key={i}>
                  <QuestionSummaryCard
                    formElement={el}
                    stateUpdateFunctions={{
                      setQuestionDetailView,
                      setQuestionFormElement,
                    }}
                  />
                </div>
              );
            })}
          </StyledOverviewNestedColumn>
        ),
      },
    ],
  };

  return (
    <StyledOverviewWrapper>
      <Typography variant="h2" align="left" style={{ marginBottom: "3rem" }}>
        {selection.formTitle}
      </Typography>
      <div
        style={{
          width: "100%",
          display: "grid",
          placeItems: "center",
          marginBottom: "2rem",
        }}
      >
        <div style={{ width: "61%" }}>
          <SubmissionTimeline />
        </div>
      </div>
      {questionDetailView ? (
        <QuestionDetail
          formElement={questionFormElement}
          stateUpdateFunctions={{
            setQuestionDetailView,
            setQuestionFormElement,
          }}
        />
      ) : (
        <TabsHandler tabs={tabs.tabs} />
      )}
    </StyledOverviewWrapper>
  );
};
