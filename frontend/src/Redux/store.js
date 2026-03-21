import { configureStore } from "@reduxjs/toolkit";
import { indexSlice } from "./features/indexSlice";

const store = configureStore({
  reducer: {
    [indexSlice.reducerPath]: indexSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(indexSlice.middleware),
});

export default store;
