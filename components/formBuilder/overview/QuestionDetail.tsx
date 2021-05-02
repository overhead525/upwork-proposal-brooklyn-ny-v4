import {
  Paper,
  Table,
  TableHead,
  TableRow,
  Typography,
  TableCell,
  TableBody,
} from "@material-ui/core";
import { FormElement } from "../../../src/generated/graphql";
import { StyledQuestionDetailCard } from "./styledComponents";
import { rgba, colors } from "../../../features/formBuilder/components";

const colorVals = Object.values(colors);

const colorMap = {
  radio: colorVals[0],
  checkbox: colorVals[1],
  shortanswer: colorVals[2],
  longanswer: colorVals[3],
  email: colorVals[4],
  url: colorVals[5],
};

export interface QuestionDetailProps {
  formElement: FormElement;
  stateUpdateFunctions: {
    setQuestionDetailView: React.Dispatch<React.SetStateAction<boolean>>;
    setQuestionFormElement: React.Dispatch<React.SetStateAction<FormElement>>;
  };
}

export const QuestionDetail: React.FC<QuestionDetailProps> = ({
  formElement,
  stateUpdateFunctions,
}) => {
  const typeColor = rgba(
    colorMap[formElement.type.replaceAll(" ", "").toLowerCase()][0],
    colorMap[formElement.type.replaceAll(" ", "").toLowerCase()][1],
    colorMap[formElement.type.replaceAll(" ", "").toLowerCase()][2],
    colorMap[formElement.type.replaceAll(" ", "").toLowerCase()][3]
  );

  const createData = (property: string, value: string | string[]) => {
    return { property, value };
  };

  const rows = Object.entries(formElement).map(([property, value]) => {
    return createData(property, value);
  });

  const renderTableBody = () => {
    return rows.map((row) => (
      <TableRow key={row.property}>
        <TableCell component="th" scope="row">
          {row.property}
        </TableCell>
        <TableCell align="right">{row.value}</TableCell>
      </TableRow>
    ));
  };

  return (
    <StyledQuestionDetailCard
      style={{
        backgroundColor: `${typeColor}`,
      }}
      onClick={() => {
        stateUpdateFunctions.setQuestionFormElement({} as FormElement);
        stateUpdateFunctions.setQuestionDetailView(false);
      }}
    >
      <Typography
        variant="caption"
        style={{
          marginBottom: "0.5rem",
          color: "white",
        }}
      >
        {formElement.questionKey}
      </Typography>
      <Paper elevation={3} style={{ width: "100%" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="h6">Property</Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant="h6">Value</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{renderTableBody()}</TableBody>
        </Table>
      </Paper>
    </StyledQuestionDetailCard>
  );
};
