import { useQuery } from "@tanstack/react-query";
import { fetchGrinderModelsQueryOptions } from "~/utils/grinderModel";
import { fetchBagSizesQueryOptions } from "~/utils/bagSize";

export const useBagSizes = () => {
  const { data, ...rest } = useQuery(fetchBagSizesQueryOptions());

  return {
    bagSizes: data ?? [],
    ...rest,
  };
};
