import { TAcademicSemester } from "../../../../types/academicSemester.types";
import { QueryParam } from "../../../../types/global.types";
import { TReduxResponse } from "../../../../types/global.types";
import { baseApi } from "../../../api/baseApi";

const academicSemesterApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllSemesters: builder.query({
      query: (args: QueryParam[]) => {
        const params = new URLSearchParams();

        if (args.length) {
          args.forEach((arg: QueryParam) => params.append(arg.name, arg.value));
        }

        return {
          url: `/academic-semesters`,
          method: "GET",
          params,
        };
      },
      transformResponse: (res: TReduxResponse<TAcademicSemester[]>) => {
        return { data: res?.data, meta: res?.meta };
      },
      providesTags: ["academicSemesters"],
    }),
    createAcademicSemester: builder.mutation({
      query: (data: TAcademicSemester) => ({
        url: `/academic-semesters/create-academic-semester`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["academicSemesters"],
    }),
  }),
});

export const { useGetAllSemestersQuery, useCreateAcademicSemesterMutation } =
  academicSemesterApi;
