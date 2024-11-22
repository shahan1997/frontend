import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IApiResponse, IProductData } from "../core/interface/api.interface";

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
      return headers;
    },
  }),
  tagTypes: ["Product"],
  endpoints: (builder) => ({
    getAllProduct: builder.query<IApiResponse, void>({
      query: (request) => {
        return {
          url: "/products",
          method: "GET",
        };
      },
      providesTags: ["Product"],
      keepUnusedDataFor: 0,
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
    deleteProduct: builder.mutation<IApiResponse, string>({
      query: (Id) => {
        return {
          url: `/product/${Id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["Product"],
    }),
  }),
});

export const {
  useGetAllProductQuery,
  useSaveProductMutation,
  useDeleteProductMutation,
} = posApi;
