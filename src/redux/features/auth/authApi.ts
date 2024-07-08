import { baseApi } from "../../api/baseApi";

type TUserInfo = { userId: string; password: string };

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (userInfo: TUserInfo) => ({
        url: "/auth/login",
        method: "POST",
        body: userInfo,
        credentials: "include",
      }),
    }),
  }),
});

export const { useLoginMutation } = authApi;
