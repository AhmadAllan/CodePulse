import { apiSlice } from "./apiSlice";

const TASK_URL = "/api/tasks";

export const TaskApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createTask: builder.mutation({
      query: (data) => ({
        url: `${TASK_URL}`,
        method: "POST",
        body: data,
      }),
    }),
    getAllTasks: builder.mutation({
      query: () => ({
        url: `${TASK_URL}`,
        method: "GET",
      }),
    }),
    getTasksByProject: builder.mutation({
      query: (projectId) => ({
        url: `${TASK_URL}/project/${projectId}`,
        method: "GET",
      }),
    }),
    getTaskById: builder.mutation({
      query: (taskId) => ({
        url: `${TASK_URL}/${taskId}`,
        method: "GET",
      }),
    }),
    updateTask: builder.mutation({
      query: (data) => ({
        url: `${TASK_URL}/:taskId`,
        method: "PUT",
        body: data,
      }),
    }),
    deleteTask: builder.mutation({
      query: (data) => ({
        url: `${TASK_URL}/:taskId`,
        method: "DELETE",
        body: data,
      }),
    }),
  }),
});

export const {
  useCreateTaskMutation,
  useGetAllTasksMutation,
  useGetTasksByProjectMutation,
  useGetTaskByIdMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} = TaskApiSlice;