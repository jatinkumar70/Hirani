import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const ARTIST_URL = "/show-all-artists";

const artistApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    Artists: build.query({
      query: (arg: Record<string, any>) => ({
        url: ARTIST_URL,
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.artist],
    }),
    Artist: build.query({
      query: (arg: Record<string, any>) => ({
        url: "/artist-playlist",
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.artist],
    }),
  }),
  overrideExisting: false,
});

export const { useArtistsQuery, useArtistQuery } = artistApi;
