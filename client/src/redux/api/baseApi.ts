import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "../store";

export const baseApi = createApi({
  reducerPath: "api",
  tagTypes: ["Posts", "Comments", "Likes", "User"],
  baseQuery: fetchBaseQuery({
    baseUrl: "https://buddy-script-server-lyart.vercel.app/api/v1",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).user.token;

      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (userData) => ({
        url: "/user/create-user",
        method: "POST",
        body: userData,
      }),
    }),
    login: builder.mutation({
      query: (userData) => ({
        url: "/auth/login",
        method: "POST",
        body: userData,
      }),
    }),

    createPost: builder.mutation({
      query: (postData) => ({
        url: "/post/create-post",
        method: "POST",
        body: postData,
      }),
      invalidatesTags: ["Posts"],
    }),

    getFeed: builder.query({
      query: () => "/post/feed",
      providesTags: ["Posts"],
    }),

    toggleLike: builder.mutation({
      query: (data) => ({
        url: "/like/toggle",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Posts", "Comments", "Likes"],
    }),

    createComment: builder.mutation({
      query: (data) => ({
        url: "/comment",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Comments", "Posts"],
    }),

    getLikers: builder.query({
      query: (targetId) => `/like/${targetId}`,
      providesTags: ["Likes"],
    }),

    getComments: builder.query({
      query: (postId) => `/comment/${postId}`,
      providesTags: ["Comments"],
    }),

    getMe: builder.query({
      query: () => ({
        url: "/user/me",
        method: "GET",
      }),
      providesTags: ["User"],
    }),

  }),
});

export const {
  useRegisterUserMutation,
  useLoginMutation,
  useCreatePostMutation,
  useGetFeedQuery,
  useToggleLikeMutation,
  useCreateCommentMutation,
  useGetLikersQuery, 
  useGetCommentsQuery,
  useGetMeQuery
} = baseApi;
