import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  IApiResponse,
  IPizzaUpdate,
  IProductData,
  IUser,
  IUserRegistrar,
} from "../core/interface/api.interface";

/**
 * Holds all the API callbacks
 * @returns RTK Implementation for backend
 */

export const posApi = createApi({
  reducerPath: "posApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/products",
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      headers.set(
        "Authorization",
        `Bearer ${localStorage.getItem("token") || ""}`
      );
      return headers;
    },
  }),
  tagTypes: ["Product", "User", "Order"],
  endpoints: (builder) => ({
    getAllProduct: builder.query<IApiResponse, void>({
      query: (request) => {
        return {
          url: "/",
          method: "GET",
        };
      },
      providesTags: ["Product"],
      keepUnusedDataFor: 0,
    }),
    getAllOrders: builder.query<IApiResponse, void>({
      query: () => ({
        url: "/get/orders",
        method: "GET",
      }),
      providesTags: ["Order"],
      keepUnusedDataFor: 0,
    }),
    updateOrderStatus: builder.mutation<
      IApiResponse,
      { orderId: string; status: string }
    >({
      query: ({ orderId, status }) => ({
        url: `/order/${orderId}`,
        method: "PUT",
        body: { status },
      }),
      invalidatesTags: ["Order"],
    }),
    placeOrder: builder.mutation<IApiResponse, Object>({
      query: (orderData) => ({
        url: "/place-order",
        method: "POST",
        body: JSON.stringify(orderData),
      }),
      invalidatesTags: ["Order"],
    }),
    cancelOrder: builder.mutation<IApiResponse, string>({
      query: (orderId) => ({
        url: `/order/cancel/${orderId}`,
        method: "PUT",
        body: {},
      }),
    }),
    login: builder.mutation<IApiResponse, IUser>({
      query: (request) => {
        return {
          url: "/login",
          method: "POST",
          body: JSON.stringify(request),
        };
      },
    }),
    register: builder.mutation<IApiResponse, IUserRegistrar>({
      query: (data) => ({
        url: "/register",
        method: "POST",
        body: JSON.stringify(data),
      }),
    }),
    saveProduct: builder.mutation<IApiResponse, Object>({
      query: (request) => {
        return {
          url: "/add",
          method: "POST",
          body: JSON.stringify(request),
        };
      },
      invalidatesTags: ["Product"],
    }),
    updateProduct: builder.mutation<
      IApiResponse,
      { id: string; data: IPizzaUpdate }
    >({
      query: ({ id, data }) => {
        return {
          url: `/${id}`,
          method: "PUT",
          body: JSON.stringify(data),
        };
      },
      invalidatesTags: ["Product"],
    }),
    deleteProduct: builder.mutation<IApiResponse, string>({
      query: (id) => {
        return {
          url: `/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["Product"],
    }),
  }),
});

export const {
  useGetAllProductQuery,
  useGetAllOrdersQuery,
  useUpdateOrderStatusMutation,
  usePlaceOrderMutation,
  useSaveProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useLoginMutation,
  useRegisterMutation,
  useCancelOrderMutation,
} = posApi;
