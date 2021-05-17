import styled from "styled-components";

export interface FormPageProps {
  id: string | string[];
}

export const FormPage: React.FC<FormPageProps> = ({ id }) => {
  return (
    <div>
      <p>This means we found the formID! 🤣</p>
      <p>{typeof id === "string" ? id : null}</p>
    </div>
  );
};
