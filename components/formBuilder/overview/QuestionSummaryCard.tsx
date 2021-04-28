import { Typography } from "@material-ui/core";
import FilterOutlined from "@material-ui/icons/FilterOutlined";
import { StyledQuestionSummaryCard } from "./styledComponents";
import { elements } from "../../../features/formBuilder/defaults";
import { FormElement } from "../../../src/generated/graphql";

export interface QuestionSummaryCardProps {
  formElement: FormElement;
}

export const QuestionSummaryCard: React.FC<QuestionSummaryCardProps> = ({
  formElement,
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
          justifySelf: "center",
        }}
      >
        {
          parsedElements.find(
            (el) => el.text === formElement.type.replace(" ", "").toLowerCase()
          ).icon
        }
        <Typography style={{ fontSize: "0.5rem" }}>
          {formElement.type.toUpperCase()}
        </Typography>
      </div>
      <Typography
        variant="h6"
        style={{ justifySelf: "start", fontWeight: 500 }}
      >
        {formElement.question.length <= 30
          ? formElement.question
          : formElement.question.slice(0, 29) + "..."}
      </Typography>
    </StyledQuestionSummaryCard>
  );
};
