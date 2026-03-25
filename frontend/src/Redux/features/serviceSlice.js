import { indexSlice } from "./indexSlice";

export const serviceAPIs = indexSlice.injectEndpoints({
  endpoints: (builder) => ({
    getServices: builder.query({
      query: () => ({ url: "/services", method: "GET", params: { limit: 100 } }),
      transformResponse: (response) => response.data ?? response,
      providesTags: ["services"],
    }),
    getServiceById: builder.query({
      query: (id) => ({ url: `/services/${id}`, method: "GET" }),
      providesTags: ["services"],
    }),
  }),
});

export const { useGetServicesQuery, useGetServiceByIdQuery } = serviceAPIs;
