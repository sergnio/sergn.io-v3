import { queryOptions } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";
import axios from "redaxios";
import { GET_COFFEE_KEY } from "~/constants/query-keys";

export type CoffeeType = {
  id: string;
  name: string;
  price: number;
};

export const fetchCoffee = createServerFn({ method: "GET" }).handler(
  async () => {
    console.info("Fetching coffee...");
    return axios
      .get<Array<CoffeeType>>("http://localhost:3000/api/coffee")
      .then((r) => r.data);
  },
);

export const coffeeQueryOptions = () =>
  queryOptions({
    queryKey: GET_COFFEE_KEY,
    queryFn: () => fetchCoffee(),
  });
