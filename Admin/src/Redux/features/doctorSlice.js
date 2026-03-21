import { indexSlice } from "./indexSlice";

export const doctorAPIs = indexSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDoctors: builder.query({
      query: () => ({ url: "/doctors", method: "GET" }),
      providesTags: ["doctors"],
    }),
    getDoctorById: builder.query({
      query: (id) => ({ url: `/doctors/${id}`, method: "GET" }),
      providesTags: ["doctors"],
    }),
    addDoctor: builder.mutation({
      query: (data) => ({ url: "/doctors", method: "POST", body: data }),
      invalidatesTags: ["doctors"],
    }),
    updateDoctor: builder.mutation({
      query: ({ id, body }) => ({ url: `/doctors/${id}`, method: "PUT", body }),
      invalidatesTags: ["doctors"],
    }),
    deleteDoctor: builder.mutation({
      query: (id) => ({ url: `/doctors/${id}`, method: "DELETE" }),
      invalidatesTags: ["doctors"],
    }),
  }),
});

export const {
  useGetDoctorsQuery,
  useGetDoctorByIdQuery,
  useAddDoctorMutation,
  useUpdateDoctorMutation,
  useDeleteDoctorMutation,
} = doctorAPIs;
