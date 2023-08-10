import { apiSlice } from "./apiSlice";

const GITHUB_URL = "/api/github";

export const GithubApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getRepository: builder.mutation({
      query: (params) => ({
        url: `${GITHUB_URL}/repository/${params.owner}/${params.repo}`,
        method: "GET",
      }),
    }),
    getUser: builder.mutation({
      query: (params) => ({
        url: `${GITHUB_URL}/user/${params.username}`,
        method: "GET",
      }),
    }),
    createRepo: builder.mutation({
      query: (data) => ({
        url: `${GITHUB_URL}/create-repo`,
        method: "POST",
        body: data,
      }),
    }),
    deleteRepo: builder.mutation({
      query: (params) => ({
        url: `${GITHUB_URL}/delete-repo/${params.owner}/${params.repo}`,
        method: "DELETE",
      }),
    }),
    addCollaborator: builder.mutation({
      query: (data) => ({
        url: `${GITHUB_URL}/add-collaborator`,
        method: "POST",
        body: data,
      }),
    }),
    removeCollaborator: builder.mutation({
      query: (data) => ({
        url: `${GITHUB_URL}/remove-collaborator`,
        method: "POST",
        body: data,
      }),
    }),
    fetchFile: builder.mutation({
      query: () => ({
        url: `${GITHUB_URL}/fetch-file`,
        method: "GET",
      }),
    }),
    updateFile: builder.mutation({
      query: (data) => ({
        url: `${GITHUB_URL}/update-file`,
        method: "POST",
        body: data,
      }),
    }),
    createFile: builder.mutation({
      query: (data) => ({
        url: `${GITHUB_URL}/create-file`,
        method: "POST",
        body: data,
      }),
    }),
    deleteFile: builder.mutation({
      query: () => ({
        url: `${GITHUB_URL}/delete-file`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetRepositoryMutation,
  useGetUserMutation,
  useCreateRepoMutation,
  useDeleteRepoMutation,
  useAddCollaboratorMutation,
  useRemoveCollaboratorMutation,
  useFetchFileMutation,
  useUpdateFileMutation,
  useCreateFileMutation,
  useDeleteFileMutation,
} = GithubApiSlice;
