import React from "react";
import { useRouter } from "next/router";
import { Form } from "../../src/generated/graphql";

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

  return (
    <div>
      <p>This means we found the formID! 🤣</p>
      <p>{id}</p>
    </div>
  );
}

export default FormPage;
