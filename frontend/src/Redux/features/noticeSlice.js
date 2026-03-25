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
  }),
});

export const { useGetNoticesQuery, useGetNoticeByIdQuery } = noticeAPIs;
