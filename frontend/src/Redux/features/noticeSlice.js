import { indexSlice } from "./indexSlice";

export const noticeAPIs = indexSlice.injectEndpoints({
  endpoints: (builder) => ({
    getNotices: builder.query({
      query: () => ({ url: "/notices", method: "GET", params: { limit: 100 } }),
      transformResponse: (response) => response.data ?? response,
      providesTags: ["notices"],
    }),
    getNoticeById: builder.query({
      query: (id) => ({ url: `/notices/${id}`, method: "GET" }),
      providesTags: ["notices"],
    }),
    getNoticeBySlug: builder.query({
      query: (slug) => ({ url: `/notices/slug/${slug}`, method: "GET" }),
      providesTags: ["notices"],
    }),
    addNotice: builder.mutation({
      query: (data) => ({ url: "/notices", method: "POST", body: data }),
      invalidatesTags: ["notices"],
    }),
    updateNotice: builder.mutation({
      query: ({ id, ...data }) => ({ url: `/notices/${id}`, method: "PUT", body: data }),
      invalidatesTags: ["notices"],
    }),
    deleteNotice: builder.mutation({
      query: (id) => ({ url: `/notices/${id}`, method: "DELETE" }),
      invalidatesTags: ["notices"],
    }),
  }),
});

export const {
  useGetNoticesQuery,
  useGetNoticeByIdQuery,
  useGetNoticeBySlugQuery,
  useAddNoticeMutation,
  useUpdateNoticeMutation,
  useDeleteNoticeMutation,
} = noticeAPIs;
