


import { configureStore } from '@reduxjs/toolkit';
import { authApi } from '../Slices/LoginSlice'; // Existing authApi
import { packedPaperRimsApi } from '../Slices/Paked_Paper_Rim_Slice'; // Import your new packedPaperRimsApi

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer, // Existing authentication reducer
    [packedPaperRimsApi.reducerPath]: packedPaperRimsApi.reducer, // Add the new packedPaperRimsApi reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware, // Include the authApi middleware
      packedPaperRimsApi.middleware // Add packedPaperRimsApi middleware
    ),
});
