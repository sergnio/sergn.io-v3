import { useQuery } from "@tanstack/react-query";
import { fetchGrinderModelsQueryOptions } from "~/utils/grinderModel";

export const useGrinderModelsQuery = () => {
  const { data, ...rest } = useQuery(fetchGrinderModelsQueryOptions());

  return {
    grinderModels: data ?? [],
    ...rest,
  };
};
