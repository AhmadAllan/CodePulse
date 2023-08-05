import { apiSlice } from "./apiSlice";

const COMMENT_URL = "/api/comments";

export const CommentApiSlice = apiSlice.
injectEndpoints({
    endpoints: (builder) => ({
        createComment: builder.mutation({
            query: (data) => ({
                url: `${COMMENT_URL}`,
                method: "POST",
                body: data
            }),
        }),
        getAllComments: builder.mutation({
            query: () => ({
                url: `${COMMENT_URL}`,
                method: "GET"
            }),
        }),
        getCommentsByProject: builder.mutation({
            query: () => ({
                url: `${COMMENT_URL}/project/:projectId`,
                method: "GET"
            }),
        }),
        getCommentById: builder.mutation({
            query: () => ({
                url: `${COMMENT_URL}/:commentId`,
                method: "GET",
            }),
        }),
        updateComment: builder.mutation({
            query: (data) => ({
                url: `${COMMENT_URL}/:commentId`,
                method: "PUT",
                body: data,
            }),
        }),
        deleteComment: builder.mutation({
            query: (data) => ({
                url: `${COMMENT_URL}/:commentId`,
                method: "DELETE",
                body: data,
            }),
        }),
    }),
});

export const {
    useCreateCommentMutation,
    useDeleteCommentMutation,
    useGetAllCommentsMutation,
    useGetCommentByIdMutation,
    useGetCommentsByProjectMutation,
    useUpdateCommentMutation,
} = CommentApiSlice;