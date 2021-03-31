import Breadcrumbs, { BreadcrumbsItem } from "@atlaskit/breadcrumbs";
import { StyledBreadcrumbsWrapper } from "./styledComponents";

interface BreadcrumbHandlerProps {
  username: string;
  formTitles: string[];
}

const formBreadcrumbs = (formTitles: string[]) => {
  return formTitles.map((title) => (
    <BreadcrumbsItem href="/form-builder" text={title} key={title} />
  ));
};

export const BreadcrumbHandler: React.FC<BreadcrumbHandlerProps> = ({
  username,
  formTitles,
}) => {
  return (
    <StyledBreadcrumbsWrapper>
      <Breadcrumbs>
        <BreadcrumbsItem href="/form-builder" text={username} />
        {formBreadcrumbs(formTitles)}
      </Breadcrumbs>
    </StyledBreadcrumbsWrapper>
  );
};
