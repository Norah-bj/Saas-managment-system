import { apiSlice } from "./apiSlice";

const ADMIN_URL = "/api/admin";
const AdminSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    createAdmin: builder.mutation({
        query: (data) => ({
        url: `${ADMIN_URL}/create`,
        method: "POST",
        body: data
        }),
      }),
    adminLogin: builder.mutation({
        query: (data) => ({
        url: `${ADMIN_URL}/login`,
        method: "POST",
        body: data
        }),
    })
    }),
});

export const {
  useCreateAdminMutation,
  useAdminLoginMutation
} = AdminSlice;
