import { TAcademicFaculty } from "../../../../types/academicFaculty.types";
import { QueryParam, TReduxResponse } from "../../../../types/global.types";
import { baseApi } from "../../../api/baseApi";

const academicFacultyApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllAcademicFaculties: builder.query({
      query: (args: QueryParam[]) => {
        const params = new URLSearchParams();

        if (args.length) {
          args.forEach((arg: QueryParam) => params.append(arg.name, arg.value));
        }

        return {
          url: `/academic-faculties`,
          method: "GET",
          params,
        };
      },
      transformResponse: (res: TReduxResponse<TAcademicFaculty[]>) => {
        return { data: res.data, meta: res.meta };
      },
      providesTags: ["academicFaculties"],
    }),

    getAcademicFaculty: builder.query({
      query: (id: string) => ({
        url: `/academic-faculties/${id}`,
        method: "GET",
      }),
      transformResponse: (res: TReduxResponse<TAcademicFaculty>) => {
        return { data: res.data };
      },
      providesTags: ["academicFaculty"],
    }),

    createAcademicFaculty: builder.mutation({
      query: (data: TAcademicFaculty) => ({
        url: `/academic-faculties/create-academic-faculty`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["academicFaculties"],
    }),
  }),
});

export const {
  useGetAcademicFacultyQuery,
  useCreateAcademicFacultyMutation,
  useGetAllAcademicFacultiesQuery,
} = academicFacultyApi;
