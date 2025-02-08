import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const creditApi = createApi({
  reducerPath: "creditApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_BASE_URL}/api`, 
  }),
  endpoints: (builder) => ({
    getReportById: builder.query({
      query: (id) => `/reports/${id}`,
    }),
    uploadXML: builder.mutation<any, FormData>({
      query: (formData) => ({
        url: "/upload",
        method: "POST",
        body: formData,
      }),
    }),
  }),
});

export const { useGetReportByIdQuery, useUploadXMLMutation } = creditApi;
