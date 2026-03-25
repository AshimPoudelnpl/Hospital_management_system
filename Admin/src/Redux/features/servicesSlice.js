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
    addService: builder.mutation({
      query: (data) => ({ url: "/services", method: "POST", body: data }),
      invalidatesTags: ["services"],
    }),
    updateService: builder.mutation({
      query: ({ id, body }) => ({ url: `/services/${id}`, method: "PUT", body }),
      invalidatesTags: ["services"],
    }),
    deleteService: builder.mutation({
      query: (id) => ({ url: `/services/${id}`, method: "DELETE" }),
      invalidatesTags: ["services"],
    }),
  }),
});

export const {
  useGetServicesQuery,
  useGetServiceByIdQuery,
  useAddServiceMutation,
  useUpdateServiceMutation,
  useDeleteServiceMutation,
} = serviceAPIs;
