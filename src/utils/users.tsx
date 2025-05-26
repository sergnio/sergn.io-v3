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

export const fetchLoggedInUser = createServerFn({ method: "GET" }).handler(
  async () => {
    const serverInstance = getSupabaseServerInstance();
    const { data, error: _error } = await serverInstance.auth.getUser();

    if (!data.user?.email || _error) {
      return null;
    }

    return {
      id: data.user.id,
      email: data.user.email,
    };
  },
);

export const usersQueryOptions = () =>
  queryOptions({
    queryKey: GET_USERS_KEY,
    queryFn: () =>
      axios
        .get<Array<User>>(DEPLOY_URL + "/api/users")
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
        .get<User>(DEPLOY_URL + "/api/users/" + id)
        .then((r) => r.data)
        .catch(() => {
          throw new Error("Failed to fetch user");
        }),
  });
