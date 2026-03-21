import { indexSlice } from "./indexSlice";

export const authAPIs = indexSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({ url: "/auth/login", method: "POST", body: data }),
      invalidatesTags: ["auth"],
    }),
    logout: builder.query({
      query: () => ({ url: "/auth/logout", method: "GET" }),
    }),
  }),
});

export const { useLoginMutation, useLogoutQuery } = authAPIs;
