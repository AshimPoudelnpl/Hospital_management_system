import { indexSlice } from "./indexSlice";

export const contactAPIs = indexSlice.injectEndpoints({
  endpoints: (builder) => ({
    sendContact: builder.mutation({
      query: (data) => ({
        url: "/contacts",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["contacts"],
    }),
  }),
});

export const { useSendContactMutation } = contactAPIs;
