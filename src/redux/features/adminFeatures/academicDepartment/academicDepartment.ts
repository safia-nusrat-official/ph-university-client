import { TAcademicDepartment } from "../../../../types/academicDepartment.types";
import { QueryParam, TReduxResponse } from "../../../../types/global.types";
import { baseApi } from "../../../api/baseApi";

const academicDepartmentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllDepartments: builder.query({
      query: (args: QueryParam[]) => {
        const params = new URLSearchParams();

        if (args.length) {
          args.forEach((arg: QueryParam) => params.append(arg.name, arg.value));
        }

        return {
          url: `/academic-departments`,
          method: "GET",
          params,
        };
      },
      transformResponse: (res:TReduxResponse<TAcademicDepartment[]>) => {
        return { data: res.data, meta:res.meta };
      },
      providesTags: ["academicDepartments"],
    }),

    getAcademicDepartment: builder.query({
      query: (id: string) => ({
        url: `/academic-departments/${id}`,
        method: "GET",
      }),
      transformResponse: (res:TReduxResponse<TAcademicDepartment>) => {
        return { data: res.data };
      },
      providesTags: ["academicDepartment"],
    }),

    createAcademicDepartment: builder.mutation({
      query: (data: TAcademicDepartment) => ({
        url: `/academic-departments/create-academic-department`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["academicDepartments"],
    }),
  }),
});

export const {
  useGetAllDepartmentsQuery,
  useCreateAcademicDepartmentMutation,
} = academicDepartmentApi;
