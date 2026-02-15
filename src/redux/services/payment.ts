import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const PaymentAPI = createApi({
  reducerPath: "PaymentAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: `https://merchant.upigateway.com/api/`,
    mode: "no-cors",
    prepareHeaders: (headers, { getState }: any) => {
	  headers.set("Content-Type", "application/json");
      headers.set("Access-Control-Allow-Origin", "http://localhost:3001/");
      headers.set("Access-Control-Allow-Headers", "content-type, authorization");
      headers.set("Access-Control-Allow-Methods", "POST");
      headers.set("authorization", getState().auth.token);
      return headers;
    },
  }),
  tagTypes: ["PaymentAPI"],
  endpoints: (builder) => ({
    createPayment: builder.mutation({
      query: (data) => ({
        url: `/create_order`,
        method: "POST",
        body: data,
      }),
    }),
    checkPaymentStatus: builder.mutation({
      query: (data) => ({
        url: `/check_order_status`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useCreatePaymentMutation, useCheckPaymentStatusMutation } =
  PaymentAPI;
