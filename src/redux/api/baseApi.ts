import {
  BaseQueryApi,
  BaseQueryFn,
  createApi,
  DefinitionType,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { logout, setUser } from "../features/auth/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:5000/api/v1/",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set("Authorization", token);
    }
    return headers;
  },
});

// when accessToken expires, use this to get new access token from backend via refresh token
const customBaseQueryWithRefreshToken: BaseQueryFn<
  FetchArgs,
  BaseQueryApi,
  DefinitionType
> = async (args: any, api: any, extraOptions: any): Promise<any> => {
  let result = await baseQuery(args, api, extraOptions);
  if (result.error?.status === 401) {
    const res = await fetch(`http://localhost:5000/api/v1/auth/refresh-token`, {
      method: "POST",
      credentials: "include",
    })
      .then((data) => data.json())
      .then((data) => data);

    const newAccessToken = await res?.data?.access_token;
    if (newAccessToken) {
      const user = (api.getState() as RootState).auth.user;
      api.dispatch(
        setUser({
          user,
          token: newAccessToken,
        })
      );
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logout());
    }
  }
  return result;
};
export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: customBaseQueryWithRefreshToken,
  endpoints: () => ({}),
  tagTypes: [
    "academicSemesters",
    "academicSemester",
    "academicDepartments",
    "academicDepartment",
    "academicFaculties",
    "academicFaculty",
    "students",
    "admins",
    "users",
    "faculties",
    "offeredCourses",
    "enrolledCourses"
  ],
});
