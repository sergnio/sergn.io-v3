import { queryOptions } from "@tanstack/react-query";
import { GET_AUTHENTICATED_USERS_KEY } from "~/constants/query-keys";
import { createServerFn } from "@tanstack/react-start";
import { getSupabaseServerInstance } from "~/utils/supabase-instance";

export type User = {
  id: number;
  name: string;
  email: string;
};

const fetchAuthenticatedUser = createServerFn({ method: "GET" }).handler(
  async () => {
    const supabase = getSupabaseServerInstance();
    const { data, error: _error } = await supabase.auth.getUser();

    if (!data.user?.email || _error) {
      return null;
    }

    return {
      user: {
        id: data.user.id,
        email: data.user.email,
      },
    };
  },
);

export const loggedInUserQueryOptions = () =>
  queryOptions({
    queryKey: GET_AUTHENTICATED_USERS_KEY,
    queryFn: fetchAuthenticatedUser,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

export const loginUser = createServerFn({ method: "POST" })
  .validator((data: { email: unknown; password: unknown }) => {
    if (!data.email || !data.password) {
      throw new Error("Email and password are required fields");
    }

    return data as { email: string; password: string };
  })
  .handler(async ({ data }) => {
    const supabase = getSupabaseServerInstance();
    const { error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });

    if (error) {
      return {
        error: true,
        message: error.message,
      };
    }
  });

export const logoutUser = createServerFn().handler(async () => {
  console.log("Logging out user...");
  const supabase = getSupabaseServerInstance();
  const { error } = await supabase.auth.signOut();

  if (error) {
    return {
      error: true,
      message: error.message,
    };
  }
});
