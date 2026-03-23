import { indexSlice } from "./indexSlice";

export const reviewAPIs = indexSlice.injectEndpoints({
  endpoints: (builder) => ({
    getReviews: builder.query({
      query: () => ({ url: "/reviews", method: "GET" }),
      providesTags: ["reviews"],
    }),
    addReview: builder.mutation({
      query: (data) => ({ url: "/reviews", method: "POST", body: data }),
      invalidatesTags: ["reviews"],
    }),
    deleteReview: builder.mutation({
      query: (id) => ({ url: `/reviews/${id}`, method: "DELETE" }),
      invalidatesTags: ["reviews"],
    }),
    updateReview: builder.mutation({
      query: ({ id, data }) => ({ url: `/reviews/${id}`, method: "PUT", body: data }),
      invalidatesTags: ["reviews"],
    }),
  }),
});

export const { useGetReviewsQuery, useAddReviewMutation, useDeleteReviewMutation, useUpdateReviewMutation } = reviewAPIs;
