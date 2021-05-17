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

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <p>This means we found the formID! 🤣</p>
    </div>
  );
}

export async function getStaticPaths() {
  const formData = await fetchFormIDsRequest();
  const formIDs = formData.map((id) => {
    return {
      params: {
        id,
      },
    };
  });
  const paths = formIDs;

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params }: { params: { id: string } }) {
  const formData = await fetchFormIDsRequest();
  return {
    props: {},
  };
}

export default FormPage;
