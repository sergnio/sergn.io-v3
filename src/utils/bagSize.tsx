import { queryOptions } from "@tanstack/react-query";
import {
  GET_BAG_SIZES_KEY,
  GET_BREW_METHODS_KEY,
} from "~/constants/query-keys";
import { createServerFn } from "@tanstack/react-start";
import { getSupabaseServerInstance } from "~/utils/supabase-instance";

const fetchBagSizes = createServerFn({ method: "GET" }).handler(async () => {
  const supabase = getSupabaseServerInstance();
  const { data } = await supabase.from("bag_size").select(`*`);

  return data;
});

export const fetchBagSizesQueryOptions = () =>
  queryOptions({
    queryKey: GET_BAG_SIZES_KEY,
    queryFn: fetchBagSizes,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
