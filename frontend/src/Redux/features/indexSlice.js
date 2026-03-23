import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const indexSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL, credentials: "include" }),
  tagTypes: ["doctors", "departments", "services", "appointments", "notices", "contacts", "reviews"],
  endpoints: () => ({}),
});
