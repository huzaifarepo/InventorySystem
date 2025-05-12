import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const titleCardRimsApi = createApi({
  reducerPath: 'titleCardRimsApi', // Unique key for the API service
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000' }), // Base URL for your backend
  endpoints: (builder) => ({
    // Define your endpoints here
    saveRolledPaperRim: builder.mutation({
      query: (newProduct) => ({
        url: '/api/title-card-rims', // The endpoint to send the POST request to
        method: 'POST',
        body: newProduct, // Pass the body data from the front end
      }),
    }),
    getRolledPaperRims: builder.query({
      query: () => '/api/title-card-rims', // Assuming same endpoint for GET
    }),
    // Update an existing product
    updateRolledPaperRim: builder.mutation({
      query: ({ id, ...updatedData }) => ({
        url: `/api/title_card_update/${id}`,
        method: 'PUT',
        body: updatedData,
      }),
    }),

    deleteRolledPaperRim: builder.mutation({
      query: (id) => ({
        url: `/api/title_card_delete/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const { useSaveRolledPaperRimMutation, useGetRolledPaperRimsQuery,useUpdateRolledPaperRimMutation, useDeleteRolledPaperRimMutation }  = titleCardRimsApi;
