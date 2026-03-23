import { indexSlice } from "./indexSlice";

export const reviewAPIs = indexSlice.injectEndpoints({
  endpoints: (builder) => ({
    getReviews: builder.query({
      query: () => ({ url: "/reviews", method: "GET" }),
      providesTags: ["reviews"],
    }),
    createReview: builder.mutation({
      query: (data) => ({ url: "/reviews", method: "POST", body: data }),
      invalidatesTags: ["reviews"],
    }),
  }),
});

export const { useGetReviewsQuery, useCreateReviewMutation } = reviewAPIs;
