import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const VIDEO_URL = "/get-all-videos";

const videoApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    Videos: build.query({
      query: (arg: Record<string, any>) => ({
        url: VIDEO_URL,
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.video],
    }),
    Video: build.query({
      query: (id: string) => ({
        url: `/video-detail-by-id?id=${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.video],
    }),
  }),
  overrideExisting: false,
});

export const { useVideosQuery, useVideoQuery } = videoApi;
