import React from "react";
import { useRouter } from "next/router";
import { FormPage as FormPageComponent } from "../../components/formPage";

const fetchFormIDsRequest = async (): Promise<string[]> => {
  const query = `
    query {
      getAllFormIDs
    }
  `;

  const response = await fetch("http://localhost:3000/api/data", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      query,
    }),
  });

  const parsedResponse = await response.json();
  const formData = parsedResponse.data.getAllFormIDs;

  return formData;
};

function FormPage() {
  const router = useRouter();
  const { id } = router.query;

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return <FormPageComponent id={id} />;
}

export default FormPage;
