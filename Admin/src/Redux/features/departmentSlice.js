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
    addDepartment: builder.mutation({
      query: (data) => ({ url: "/departments", method: "POST", body: data }),
      invalidatesTags: ["departments"],
    }),
    updateDepartment: builder.mutation({
      query: ({ id, body }) => ({ url: `/departments/${id}`, method: "PUT", body }),
      invalidatesTags: ["departments"],
    }),
    deleteDepartment: builder.mutation({
      query: (id) => ({ url: `/departments/${id}`, method: "DELETE" }),
      invalidatesTags: ["departments"],
    }),
  }),
});

export const {
  useGetDepartmentsQuery,
  useGetDepartmentByIdQuery,
  useAddDepartmentMutation,
  useUpdateDepartmentMutation,
  useDeleteDepartmentMutation,
} = departmentAPIs;
