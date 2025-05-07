import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const packedPaperRimsApi = createApi({
  reducerPath: 'packedPaperRimsApi', // Unique key for the API service
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000' }), // Base URL for your backend
  endpoints: (builder) => ({
    // Define your endpoints here
    savePackedPaperRim: builder.mutation({
      query: (newProduct) => ({
        url: '/api/packed-paper-rims', // The endpoint to send the POST request to
        method: 'POST',
        body: newProduct, // Pass the body data from the front end
      }),
    }),
    getPackedPaperRims: builder.query({
      query: () => '/api/packed-paper-rims', // Assuming same endpoint for GET
    }),
    // Update an existing product
    updatePackedPaperRim: builder.mutation({
      query: ({ id, ...updatedData }) => ({
        url: `/api/update/${id}`,
        method: 'PUT',
        body: updatedData,
      }),
    }),
  }),
});

export const { useSavePackedPaperRimMutation, useGetPackedPaperRimsQuery,useUpdatePackedPaperRimMutation  } = packedPaperRimsApi;
