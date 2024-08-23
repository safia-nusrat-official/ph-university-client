import { TAcademicFaculty } from "../../../../types/academicFaculty.types";
import { QueryParam, TReduxResponse } from "../../../../types/global.types";
import { TStudent } from "../../../../types/user/student.types";
import { IUser } from "../../../../types/user/user.types";
import { baseApi } from "../../../api/baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: (args: QueryParam[]) => {
        const params = new URLSearchParams();

        if (args.length) {
          args.forEach((arg: QueryParam) => params.append(arg.name, arg.value));
        }

        return {
          url: `/users`,
          method: "GET",
          params,
        };
      },
      transformResponse: (res: TReduxResponse<IUser[]>) => {
        return { data: res.data, meta: res.meta };
      },
      providesTags: ["users"],
    }),

    getUser: builder.query({
      query: (id: string) => ({
        url: `/users/${id}`,
        method: "GET",
      }),
      transformResponse: (res: TReduxResponse<IUser>) => {
        return { data: res.data };
      },
      providesTags: ["user"],
    }),

    createStudent: builder.mutation({
      query: (data) => ({
        url: `/users/create-student`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["students"],
    }),
  }),
});

export const { useCreateStudentMutation } = userApi;
