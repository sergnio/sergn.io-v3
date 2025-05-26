import { queryOptions } from "@tanstack/react-query";
import axios from "redaxios";
import { GET_SINGLE_USER_KEY, GET_USERS_KEY } from "~/constants/query-keys";
import { getSupabaseServerInstance } from "~/utils/supabase-instance";
import { createServerFn } from "@tanstack/react-start";

export type User = {
  id: number;
  name: string;
  email: string;
};

export const DEPLOY_URL = "http://localhost:3000";

export const loggedInUserQueryOptions = () =>
  queryOptions({
    queryKey: ["user"],
    queryFn: () =>
      axios
        .get<User | null>(`${DEPLOY_URL}/api/users/authenticated`)
        .then((r) => r.data)
        .catch((e) => {
          console.error(e);
          return null;
        }),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

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
