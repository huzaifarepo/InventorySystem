


import { configureStore } from '@reduxjs/toolkit';
import { authApi } from '../Slices/LoginSlice'; // Existing authApi
import { packedPaperRimsApi } from '../Slices/Paked_Paper_Rim_Slice'; // Import your new packedPaperRimsApi
import { rolledPaperRimsApi } from '../Slices/Rolled_Paper_Rim_Slice';
import { packedCardRimsApi } from '../Slices/Packed_Card_Rim_Slice';
import { titleCardRimsApi } from '../Slices/Title_Card_Rim_Slice';
import { finalGoodApi } from '../Slices/Final_Good_Slice';

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer, // Existing authentication reducer
    [packedPaperRimsApi.reducerPath]: packedPaperRimsApi.reducer, // Add the new packedPaperRimsApi reducer
    [rolledPaperRimsApi.reducerPath]: rolledPaperRimsApi.reducer, // Add the new packedPaperRimsApi reducer
    [packedCardRimsApi.reducerPath]: packedCardRimsApi.reducer, // Add the new packedPaperRimsApi reducer
    [titleCardRimsApi.reducerPath]: titleCardRimsApi.reducer, // Add the new packedPaperRimsApi reducer
    [finalGoodApi.reducerPath]: finalGoodApi.reducer, // Add the new packedPaperRimsApi reducer


  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware, // Include the authApi middleware
      packedPaperRimsApi.middleware, // Add packedPaperRimsApi middleware
      rolledPaperRimsApi.middleware,
      packedCardRimsApi.middleware,
      titleCardRimsApi.middleware,
      finalGoodApi.middleware,
    ),
});
