import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const rolledPaperRimsApi = createApi({
  reducerPath: 'rolledPaperRimsApi', // Unique key for the API service
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000' }), // Base URL for your backend
  endpoints: (builder) => ({
    // Define your endpoints here
    saveRolledPaperRim: builder.mutation({
      query: (newProduct) => ({
        url: '/api/rolled-paper-rims', // The endpoint to send the POST request to
        method: 'POST',
        body: newProduct, // Pass the body data from the front end
      }),
    }),
    getRolledPaperRims: builder.query({
      query: () => '/api/rolled-paper-rims', // Assuming same endpoint for GET
    }),
    // Update an existing product
    updateRolledPaperRim: builder.mutation({
      query: ({ id, ...updatedData }) => ({
        url: `/api/rolled_update/${id}`,
        method: 'PUT',
        body: updatedData,
      }),
    }),

    deleteRolledPaperRim: builder.mutation({
      query: (id) => ({
        url: `/api/rolled_delete/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const { useSaveRolledPaperRimMutation, useGetRolledPaperRimsQuery,useUpdateRolledPaperRimMutation, useDeleteRolledPaperRimMutation }  = rolledPaperRimsApi;
