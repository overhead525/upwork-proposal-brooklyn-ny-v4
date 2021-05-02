import { Typography } from "@material-ui/core";
import { StyledVisibilityIcon } from "./styledComponents";
import { StyledQuestionSummaryCard } from "./styledComponents";
import { elements } from "../../../features/formBuilder/defaults";
import { FormElement } from "../../../src/generated/graphql";

export interface QuestionSummaryCardProps {
  formElement: FormElement;
  stateUpdateFunctions: {
    setQuestionDetailView: React.Dispatch<React.SetStateAction<boolean>>;
    setQuestionFormElement: React.Dispatch<React.SetStateAction<FormElement>>;
  };
}

export const QuestionSummaryCard: React.FC<QuestionSummaryCardProps> = ({
  formElement,
  stateUpdateFunctions,
}) => {
  const parsedElements = elements.map((el) => {
    return {
      ...el,
      text: el.text.replaceAll(" ", "").toLowerCase(),
    };
  });

  return (
    <StyledQuestionSummaryCard>
      <div
        style={{
          display: "grid",
          placeItems: "center",
          justifySelf: "left",
          width: "2rem",
          flexGrow: 1,
        }}
      >
        {
          parsedElements.find(
            (el) => el.text === formElement.type.replace(" ", "").toLowerCase()
          ).icon
        }
      </div>
      <Typography
        variant="h6"
        style={{ justifySelf: "start", fontWeight: 500, flexGrow: 7 }}
      >
        {formElement.question.length <= 30
          ? formElement.question
          : formElement.question.slice(0, 29) + "..."}
      </Typography>
      <StyledVisibilityIcon
        onClick={() => {
          stateUpdateFunctions.setQuestionFormElement(formElement);
          stateUpdateFunctions.setQuestionDetailView(true);
        }}
      />
    </StyledQuestionSummaryCard>
  );
};
