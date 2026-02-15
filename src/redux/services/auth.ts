import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { aspirantsignup, companysignup, login } from "../reducers/auth";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_APIBASE,
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body) => ({
        url: "/api/user/login",
        method: "POST",
        body,
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          if (data.code === 200) dispatch(login(data.data));
          throw data;
        } catch (error) {
          console.error(error);
        }
      },
    }),
    companySignUp: builder.mutation({
      query: (body) => ({
        url: "/api/company/signup",
        method: "POST",
        body,
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          if (data.code === 200) dispatch(companysignup(data.data));
          throw data;
        } catch (error) {
          console.error(error);
        }
      },
    }),
    aspirantSignUp: builder.mutation({
      query: (body) => ({
        url: "/api/user/signup",
        method: "POST",
        body,
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          if (data.code === 200) dispatch(aspirantsignup(data.data));
          throw data;
        } catch (error) {
          console.error(error);
        }
      },
    }),
  }),
});

export const { useLoginMutation, useCompanySignUpMutation, useAspirantSignUpMutation } = authApi;
