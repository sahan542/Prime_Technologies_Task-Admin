import { baseApi } from "./baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: (args: Record<string, any>) => ({
        url: "/users",
        method: "GET",
        params: args,
      }),
      providesTags: ["user"],
    }),
    getCurrentUserByEmail: builder.query({
      query: (email: string) => ({
        url: `/users/current-user/${email}`,
        method: "GET",
      }),
      providesTags: ["user"],
    }),
    updateUser: builder.mutation({
      query: (payload) => ({
        url: `/users/${payload.userId}`,
        method: "PATCH",
        body: payload.updatedData,
      }),
      invalidatesTags: ["user"],
    }),
    deleteUser: builder.mutation({
      query: (userId) => ({
        url: `/users/${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["user"],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetCurrentUserByEmailQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = userApi;
