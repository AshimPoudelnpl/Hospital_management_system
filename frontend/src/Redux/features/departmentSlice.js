import { indexSlice } from "./indexSlice";

export const departmentAPIs = indexSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDepartments: builder.query({
      query: () => ({ url: "/departments", method: "GET" }),
      providesTags: ["departments"],
    }),
    getDepartmentById: builder.query({
      query: (id) => ({ url: `/departments/${id}`, method: "GET" }),
      providesTags: ["departments"],
    }),
  }),
});

export const { useGetDepartmentsQuery, useGetDepartmentByIdQuery } = departmentAPIs;
