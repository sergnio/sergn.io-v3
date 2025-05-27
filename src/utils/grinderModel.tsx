import { queryOptions } from "@tanstack/react-query";
import { GET_GRINDER_MODELS_KEY } from "~/constants/query-keys";
import { createServerFn } from "@tanstack/react-start";
import { getSupabaseServerInstance } from "~/utils/supabase-instance";

const fetchGrinderModels = createServerFn({ method: "GET" }).handler(
  async () => {
    const supabase = getSupabaseServerInstance();
    const { data } = await supabase.from("grinder_model").select(`*`);

    return data;
  },
);

export const fetchGrinderModelsQueryOptions = () =>
  queryOptions({
    queryKey: GET_GRINDER_MODELS_KEY,
    queryFn: fetchGrinderModels,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
