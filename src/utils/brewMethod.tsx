import { queryOptions } from "@tanstack/react-query";
import { GET_BREW_METHODS_KEY } from "~/constants/query-keys";
import { createServerFn } from "@tanstack/react-start";
import { getSupabaseServerInstance } from "~/utils/supabase-instance";

const fetchBrewMethods = createServerFn({ method: "GET" }).handler(async () => {
  const supabase = getSupabaseServerInstance();
  const { data } = await supabase.from("brew_method").select(`*`);

  return data;
});

export const fetchBrewMethodsQueryOptions = () =>
  queryOptions({
    queryKey: GET_BREW_METHODS_KEY,
    queryFn: fetchBrewMethods,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
