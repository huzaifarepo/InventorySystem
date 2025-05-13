import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const finalGoodApi = createApi({
  reducerPath: 'finalGoodApi', // Unique key for the API service
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000' }), // Base URL for your backend
  endpoints: (builder) => ({
    // Define your endpoints here
    saveRolledPaperRim: builder.mutation({
      query: (newProduct) => ({
        url: '/api/final-good', // The endpoint to send the POST request to
        method: 'POST',
        body: newProduct, // Pass the body data from the front end
      }),
    }),
    getRolledPaperRims: builder.query({
      query: () => '/api/final-good', // Assuming same endpoint for GET
    }),
    // Update an existing product
    updateRolledPaperRim: builder.mutation({
      query: ({ id, ...updatedData }) => ({
        url: `/api/final_good_update/${id}`,
        method: 'PUT',
        body: updatedData,
      }),
    }),

    deleteRolledPaperRim: builder.mutation({
      query: (id) => ({
        url: `/api/final_good_delete/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const { useSaveRolledPaperRimMutation, useGetRolledPaperRimsQuery,useUpdateRolledPaperRimMutation, useDeleteRolledPaperRimMutation }  = finalGoodApi;
