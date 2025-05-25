import { queryOptions } from "@tanstack/react-query";
import { notFound } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import axios from "redaxios";
import { GET_COFFEE_KEY, GET_SINGLE_COFFEE_KEY } from "~/constants/query-keys";

export type CoffeeType = {
  id: string;
  title: string;
  body: string;
};

export const fetchCoffee = createServerFn({ method: "GET" }).handler(
  async () => {
    console.info("Fetching posts...");
    return (
      axios
        // todo - use a real API endpoint
        .get<Array<CoffeeType>>("https://jsonplaceholder.typicode.com/posts")
        .then((r) => r.data.slice(0, 10))
    );
  },
);

export const postsQueryOptions = () =>
  queryOptions({
    queryKey: GET_COFFEE_KEY,
    queryFn: () => fetchCoffee(),
  });

export const fetchSingleCoffee = createServerFn({ method: "GET" })
  .validator((d: string) => d)
  .handler(async ({ data }) => {
    console.info(`Fetching post with id ${data}...`);

    return await axios
      .get<CoffeeType>(`https://jsonplaceholder.typicode.com/posts/${data}`)
      .then((r) => r.data)
      .catch((err) => {
        console.error(err);
        if (err.status === 404) {
          throw notFound();
        }
        throw err;
      });
  });

export const postQueryOptions = (coffeeId: string) =>
  queryOptions({
    queryKey: GET_SINGLE_COFFEE_KEY(coffeeId),
    queryFn: () => fetchSingleCoffee({ data: coffeeId }),
  });
