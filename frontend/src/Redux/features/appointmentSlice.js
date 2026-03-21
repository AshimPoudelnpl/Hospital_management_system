import { indexSlice } from "./indexSlice";

export const appointmentAPIs = indexSlice.injectEndpoints({
  endpoints: (builder) => ({
    bookAppointment: builder.mutation({
      query: (data) => ({
        url: "/appointments",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["appointments"],
    }),
  }),
});

export const { useBookAppointmentMutation } = appointmentAPIs;
