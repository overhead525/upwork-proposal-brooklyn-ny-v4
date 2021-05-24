import styled from "styled-components";
import Image from "next/image";
import { useState, useEffect } from "react";
import { PopulatedFormObject } from "../../features/userData/userDataSlice";
import { FormElementRenderer } from "./formElementRenderer";
import { Divider } from "@material-ui/core";

export interface FormPageProps {
  id: string | string[];
}

const FormPageWrapper = styled.div`
  @import url("https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap");

  padding: 0.5rem 2rem;

  h1.brandName {
    display: flex;
    font-family: "Bebas Neue", cursive;
    margin: 0;

    span {
      margin-top: 0.25rem;
      font-size: 1rem;
    }
  }
`;

export const FormPage: React.FC<FormPageProps> = ({ id }) => {
  const [loaded, setLoaded] = useState(false);
  const [formData, setFormData] = useState({} as PopulatedFormObject);

  const fetchFormData = async (theID) => {
    const formQuery = `
    query GetForm($formID: String!) {
      getForm(formID: $formID) {
        preview {
          title
          pages
        }
        published {
          title
          pages
        }
      }
    }`;

    const fetchFormElementData = async (formElementID) => {
      const formElementQuery = `
      query GetFormElement($formElementID: String!) {
        getFormElement(formElementID: $formElementID) {
          question
          type
          questionKey
          helperText
          choices
          draftOf
          displayFor
        }
      }
      `;

      const response = await fetch("http://localhost:3000/api/data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          query: formElementQuery,
          variables: { formElementID },
        }),
      });

      const parsed = await response.json();
      return parsed.data.getFormElement;
    };

    const formResponse = await fetch("http://localhost:3000/api/data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query: formQuery,
        variables: { formID: theID },
      }),
    });

    const parsedForm = await formResponse.json();
    let formData = parsedForm.data.getForm;

    const newPages = [];
    formData.published.pages.forEach((page: string[], index) => {
      if (!newPages[index]) newPages.push([]);
      page.forEach(async (formElementID) => {
        newPages[index].push(await fetchFormElementData(formElementID));
      });
    });
    formData.published.pages = newPages;

    setFormData(formData.published);
    setLoaded(true);
    console.log(formData);
  };

  useEffect(() => {
    if (id) {
      typeof id === "string" ? id : null;
      fetchFormData(id);
    }
  }, [id]);

  return (
    <FormPageWrapper>
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginBottom: "2rem",
          }}
        >
          <Image src="/logo.png" width={94} height={40} />
          <h1 className="brandName">
            Brooklyn Proposal<span>©</span>
          </h1>
        </div>
      </div>
      {loaded && (
        <main>
          <h2 style={{ fontSize: "4rem", marginBottom: "1.5rem" }}>
            {formData.title}
          </h2>
          <Divider style={{ marginBottom: "1.5rem" }} />
          <FormElementRenderer formElements={formData.pages} />
        </main>
      )}
    </FormPageWrapper>
  );
};
