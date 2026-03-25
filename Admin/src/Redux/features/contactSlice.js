import { indexSlice } from "./indexSlice";

export const contactAPIs = indexSlice.injectEndpoints({
  endpoints: (builder) => ({
    getContacts: builder.query({
      query: () => ({ url: "/contacts", method: "GET", params: { limit: 100 } }),
      transformResponse: (response) => response.data ?? response,
      providesTags: ["contacts"],
    }),
    getContactById: builder.query({
      query: (id) => ({ url: `/contacts/${id}`, method: "GET" }),
      providesTags: ["contacts"],
    }),
    deleteContact: builder.mutation({
      query: (id) => ({ url: `/contacts/${id}`, method: "DELETE" }),
      invalidatesTags: ["contacts"],
    }),
  }),
});

export const {
  useGetContactsQuery,
  useGetContactByIdQuery,
  useDeleteContactMutation,
} = contactAPIs;
