import styled from "styled-components";
import CodeRoundedIcon from "@material-ui/icons/CodeRounded";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import SettingsIcon from "@material-ui/icons/Settings";
import Typography from "@material-ui/core/Typography";
import { colors, rgba } from "../../../../features/formBuilder/components";

export const SettingsSelectorIcon = {
  edit: <EditRoundedIcon fontSize="inherit" />,
  options: <SettingsIcon fontSize="inherit" />,
  logic: <CodeRoundedIcon fontSize="inherit" />,
};

export interface SettingsSelectorProps {
  selectState: "edit" | "options" | "logic";
  selected: boolean;
}

const StyledSettingsSelectorWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: min-content;
  padding: 0.3rem 0.5rem;

  border-radius: 0.6rem;

  ${(props) =>
    props.className.includes("selected")
      ? `
    background-color: ${rgba(
      colors.blue[0],
      colors.blue[1],
      colors.blue[2],
      0.2
    )};
    color: ${rgba(
      colors.blue[0],
      colors.blue[1],
      colors.blue[2],
      colors.blue[3]
    )};
  }`
      : null}
`;

export const SettingsSelector: React.FC<SettingsSelectorProps> = ({
  selectState,
  selected,
}) => {
  return (
    <StyledSettingsSelectorWrapper className={selected ? "selected" : ""}>
      {SettingsSelectorIcon[selectState]}
      <Typography variant="caption" style={{ marginLeft: "0.3rem" }}>
        {`${selectState.charAt(0).toUpperCase() + selectState.slice(1)}`}
      </Typography>
    </StyledSettingsSelectorWrapper>
  );
};
