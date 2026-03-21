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
  }),
});

export const { useGetDoctorsQuery, useGetDoctorByIdQuery } = doctorAPIs;
