import { indexSlice } from "./indexSlice";

export const appointmentAPIs = indexSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAppointments: builder.query({
      query: () => ({ url: "/appointments", method: "GET" }),
      providesTags: ["appointments"],
    }),
    getAppointmentById: builder.query({
      query: (id) => ({ url: `/appointments/${id}`, method: "GET" }),
      providesTags: ["appointments"],
    }),
    updateAppointmentStatus: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/appointments/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["appointments"],
    }),
    deleteAppointment: builder.mutation({
      query: (id) => ({ url: `/appointments/${id}`, method: "DELETE" }),
      invalidatesTags: ["appointments"],
    }),
  }),
});

export const {
  useGetAppointmentsQuery,
  useGetAppointmentByIdQuery,
  useUpdateAppointmentStatusMutation,
  useDeleteAppointmentMutation,
} = appointmentAPIs;
