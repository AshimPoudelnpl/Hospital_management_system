import { indexSlice } from "./indexSlice";

export const doctorAPIs = indexSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDoctors: builder.query({
      query: (params = {}) => {
        const { department_id, page = 1, limit = 8 } = params;
        const url = department_id 
          ? `/doctors?department_id=${department_id}&page=${page}&limit=${limit}`
          : `/doctors?page=${page}&limit=${limit}`;
        return { url, method: "GET" };
      },
      providesTags: ["doctors"],
    }),
    getDoctorById: builder.query({
      query: (id) => ({ url: `/doctors/${id}`, method: "GET" }),
      providesTags: ["doctors"],
    }),
  }),
});

export const { useGetDoctorsQuery, useGetDoctorByIdQuery } = doctorAPIs;
