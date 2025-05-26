import { queryOptions } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";
import axios from "redaxios";
import { GET_COFFEE_KEY } from "~/constants/query-keys";
import { User } from "~/utils/users";

export type LoginUser = {
  email: string;
  password: string;
};

export const loginUser = createServerFn({ method: "POST" }).handler(
  async ({ data }) => {
    console.info("Logging in user");
    return axios
      .post<User>("http://localhost:3000/api/coffee", {
        data: {
          email: data.email,
          password: data.password,
        },
      })
      .then((r) => r.data)
      .catch((error) => {
        console.error("Error fetching coffee:", error);
        throw new Error("Failed to fetch coffee");
      });
  },
);

export const coffeeQueryOptions = () =>
  queryOptions({
    queryKey: GET_COFFEE_KEY,
    queryFn: () => loginUser(),
  });
