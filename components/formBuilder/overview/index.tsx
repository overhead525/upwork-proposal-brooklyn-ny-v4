import {
  CircularProgress,
  LinearProgress,
  Typography,
} from "@material-ui/core";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  currentFormIndexSelector,
  formDataSelector,
  formElementDataSelector,
} from "../../../features/userData/userDataSlice";
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

export interface OverviewProps {
  resultData: number[];
}

export const Overview: React.FC<OverviewProps> = ({ resultData }) => {
  const [questionDetailView, setQuestionDetailView] = useState(false);
  const [questionFormElement, setQuestionFormElement] = useState(
    null as FormElement
  );
  const currentFormIndex = useSelector(currentFormIndexSelector);
  const formElementData = useSelector(formElementDataSelector);
  const formData = useSelector(formDataSelector);
  const currentForm = formData[Object.keys(formData)[currentFormIndex]];
  const [selection, setSelection] = useState({
    previewFormTitle: "pending",
    publishedFormTitle: "pending",
    formElements: {
      preview: [],
      published: [],
    },
  });

  const populateStateFormElements = (): {
    preview: FormElement[];
    published: FormElement[];
  } => {
    let preview = [];
    currentForm.preview.pages.forEach((page) => {
      page.forEach((formElementID) => {
        preview.push(formElementData[formElementID]);
      });
    });

    let published = [];
    currentForm.published.pages.forEach((page) => {
      page.forEach((formElementID) => {
        published.push(formElementData[formElementID]);
      });
    });

    return {
      preview,
      published,
    };
  };

  useEffect(() => {
    if (currentForm) {
      const FEs = populateStateFormElements();

      setSelection({
        ...selection,
        previewFormTitle: currentForm.preview.title,
        publishedFormTitle: currentForm.published.title,
        formElements: FEs,
      });
    }
  }, [currentForm]);

  const tabs: TabsHandlerProps = {
    tabs: [
      {
        label: "Preview",
        content: (
          <StyledOverviewNestedColumn about="left">
            <Typography variant="h6">Preview</Typography>
            <Typography variant="body1" aria-label="title">
              {`Title: `}
              <strong>{selection.previewFormTitle}</strong>
            </Typography>
            {selection.formElements.preview.map((el: FormElement, i, arr) => {
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
            {selection.formElements.published.map((el: FormElement, i, arr) => {
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

  return selection.publishedFormTitle === "pending" ? (
    <div
      style={{
        width: "100%",
        height: "90vh",
        display: "grid",
        placeItems: "center",
      }}
    >
      <CircularProgress size="20vw" />
    </div>
  ) : (
    <StyledOverviewWrapper>
      <div
        style={{
          width: "100%",
          display: "grid",
          placeItems: "center",
          marginBottom: "3rem",
        }}
      >
        <motion.div
          style={{ width: "73%", display: "flex", flexDirection: "column" }}
          initial={{ x: -100 }}
          animate={{ x: 0 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
            duration: 1,
          }}
        >
          <Typography variant="h2" align="left">
            {selection.publishedFormTitle}
          </Typography>
          <Typography variant="caption">{`\nCreated on: 04-06-2021`}</Typography>
        </motion.div>
      </div>
      <div
        style={{
          width: "100%",
          display: "grid",
          placeItems: "center",
          marginBottom: "2rem",
        }}
      >
        <div style={{ width: "51%" }}>
          <SubmissionTimeline resultData={resultData} />
        </div>
      </div>
      {questionDetailView ? (
        <div style={{ width: "100%", display: "grid", placeItems: "center" }}>
          <QuestionDetail
            formElement={questionFormElement}
            stateUpdateFunctions={{
              setQuestionDetailView,
              setQuestionFormElement,
            }}
          />
        </div>
      ) : (
        <div style={{ width: "100%", display: "grid", placeItems: "center" }}>
          <motion.div
            style={{ width: "73%" }}
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
            }}
          >
            <TabsHandler tabs={tabs.tabs} />
          </motion.div>
        </div>
      )}
    </StyledOverviewWrapper>
  );
};
