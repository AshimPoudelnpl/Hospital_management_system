import { indexSlice } from "./indexSlice";

export const noticeAPIs = indexSlice.injectEndpoints({
  endpoints: (builder) => ({
    getNotices: builder.query({
      query: () => ({ url: "/notices", method: "GET" }),
      providesTags: ["notices"],
    }),
    getNoticeById: builder.query({
      query: (id) => ({ url: `/notices/${id}`, method: "GET" }),
      providesTags: ["notices"],
    }),
  }),
});

export const { useGetNoticesQuery, useGetNoticeByIdQuery } = noticeAPIs;
