import { queryOptions } from "@tanstack/react-query";
import axios from "redaxios";
import {
  GET_AUTHENTICATED_USERS_KEY,
  GET_SINGLE_USER_KEY,
  GET_USERS_KEY,
} from "~/constants/query-keys";
import { createServerFn } from "@tanstack/react-start";
import { getSupabaseServerInstance } from "~/utils/supabase-instance";

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

export const usersQueryOptions = () =>
  queryOptions({
    queryKey: GET_USERS_KEY,
    queryFn: () =>
      axios
        .get<User[]>(`${DEPLOY_URL}/api/users`)
        .then((r) => r.data)
        .catch(() => {
          throw new Error("Failed to fetch users");
        }),
  });

export const userQueryOptions = (id: string) =>
  queryOptions({
    queryKey: GET_SINGLE_USER_KEY(id),
    queryFn: () =>
      axios
        .get<User>(`${DEPLOY_URL}/api/users/${id}`)
        .then((r) => r.data)
        .catch(() => {
          throw new Error("Failed to fetch user");
        }),
  });
