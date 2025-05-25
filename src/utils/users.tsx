import { queryOptions } from "@tanstack/react-query";
import axios from "redaxios";
import { GET_SINGLE_USER_KEY, GET_USERS_KEY } from "~/utils/query-keys";

export type User = {
  id: number;
  name: string;
  email: string;
};

export const DEPLOY_URL = "http://localhost:3000";

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
