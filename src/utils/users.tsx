import { queryOptions } from "@tanstack/react-query";
import axios from "redaxios";
import {
  GET_AUTHENTICATED_USERS_KEY,
  GET_SINGLE_USER_KEY,
  GET_USERS_KEY,
} from "~/constants/query-keys";
import { createServerFn } from "@tanstack/react-start";
import { getSupabaseServerInstance } from "~/utils/supabase-instance";
import { redirect } from "@tanstack/react-router";

export type User = {
  id: number;
  name: string;
  email: string;
};

export const DEPLOY_URL = "http://localhost:3000";

const fetchAuthenticatedUser = createServerFn({ method: "GET" }).handler(
  async () => {
    const supabase = getSupabaseServerInstance();
    const { data, error: _error } = await supabase.auth.getUser();

    if (!data.user?.email || _error) {
      return null;
    }

    return {
      email: data.user.email,
    };
  },
);

export const loggedInUserQueryOptions = () => {
  return queryOptions({
    queryKey: GET_AUTHENTICATED_USERS_KEY,
    queryFn: fetchAuthenticatedUser,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const loginUser = createServerFn({ method: "POST" })
  .validator((d: { email: string; password: string }) => d)
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

  throw redirect({
    href: "/",
  });
});
