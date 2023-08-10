import { apiSlice } from "./apiSlice";

const PROJECT_URL = "/api/projects";

export const ProjectApiSlice = apiSlice.
injectEndpoints({
    endpoints: (builder) => ({
        createProject: builder.mutation({
            query: (data) => ({
                url: `${PROJECT_URL}`,
                method: "POST",
                body: data,
            }),
        }),
        getAllProjects: builder.mutation({
            query: () => ({
                url: `${PROJECT_URL}`,
                method: "GET"
            }),
        }),
        getProjectById: builder.mutation({
            query: () => ({
                url: `${PROJECT_URL}/:id`,
                method: "GET",
            }),
        }),
        updateProject: builder.mutation({
            query: (data) => ({
                url: `${PROJECT_URL}/:id`,
                method: "PUT",
                body: data
            }),
        }),
        deleteProject: builder.mutation({
            query: (data) => ({
                url: `${PROJECT_URL}/:id`,
                method: "DELETE",
                body: data,
            }),
        }),
    }),
});

export const {
    useCreateProjectMutation,
    useGetAllProjectsMutation,
    useGetProjectByIdMutation,
    useUpdateProjectMutation,
    useDeleteProjectMutation,
} = ProjectApiSlice;