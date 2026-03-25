import { indexSlice } from "./indexSlice";

export const departmentAPIs = indexSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDepartments: builder.query({
      query: () => ({ url: "/departments", method: "GET", params: { limit: 100 } }),
      transformResponse: (response) => response.data ?? response,
      providesTags: ["departments"],
    }),
    getDepartmentById: builder.query({
      query: (id) => ({ url: `/departments/${id}`, method: "GET" }),
      providesTags: ["departments"],
    }),
  }),
});

export const { useGetDepartmentsQuery, useGetDepartmentByIdQuery } = departmentAPIs;
