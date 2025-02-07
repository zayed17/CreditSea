import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const creditApi = createApi({
    reducerPath: 'creditApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000' }),
    endpoints: (builder) => ({
        getCreditReport: builder.query<any, void>({
            query: () => '/reports',
        }),
        uploadXML: builder.mutation<any, FormData>({
            query: (formData) => ({
                url: '/upload',
                method: 'POST',
                body: formData,
            }),
        }),
    }),
});

export const { useGetCreditReportQuery, useUploadXMLMutation } = creditApi;
