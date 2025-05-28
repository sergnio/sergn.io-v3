import { useQuery } from "@tanstack/react-query";
import { fetchBrewMethodsQueryOptions } from "~/utils/brewMethod";

export const useBrewMethodQuery = () => {
  const { data: brewMethods, ...rest } = useQuery(
    fetchBrewMethodsQueryOptions(),
  );
  return {
    brewMethods: brewMethods ?? [],
    ...rest,
  };
};
