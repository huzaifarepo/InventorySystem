import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const packedCardRimsApi = createApi({
  reducerPath: 'packedCardRimsApi', // Unique key for the API service
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000' }), // Base URL for your backend
  endpoints: (builder) => ({
    // Define your endpoints here
    saveRolledPaperRim: builder.mutation({
      query: (newProduct) => ({
        url: '/api/packed-card-rims', // The endpoint to send the POST request to
        method: 'POST',
        body: newProduct, // Pass the body data from the front end
      }),
    }),
    getRolledPaperRims: builder.query({
      query: () => '/api/packed-card-rims', // Assuming same endpoint for GET
    }),
    // Update an existing product
    updateRolledPaperRim: builder.mutation({
      query: ({ id, ...updatedData }) => ({
        url: `/api/packed_card_update/${id}`,
        method: 'PUT',
        body: updatedData,
      }),
    }),

    deleteRolledPaperRim: builder.mutation({
      query: (id) => ({
        url: `/api/packed_card_delete/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const { useSaveRolledPaperRimMutation, useGetRolledPaperRimsQuery,useUpdateRolledPaperRimMutation, useDeleteRolledPaperRimMutation }  = packedCardRimsApi;
