import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const CATEGORY_URL = "/get-categories";

const categoryApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    Categories: build.query({
      query: (arg: Record<string, any>) => ({
        url: CATEGORY_URL,
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.artist],
    }),
    Category: build.query({
      query: (arg: Record<string, any>) => ({
        url: "/category-playlist",
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.category],
    }),
  }),
  overrideExisting: false,
});

export const { useCategoriesQuery, useCategoryQuery } = categoryApi;
