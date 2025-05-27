import { queryOptions } from "@tanstack/react-query";
import {
  GET_AUTHENTICATED_USERS_KEY,
  GET_BREW_METHODS_KEY,
} from "~/constants/query-keys";
import { createServerFn } from "@tanstack/react-start";
import { getSupabaseServerInstance } from "~/utils/supabase-instance";

export type User = {
  id: number;
  name: string;
  email: string;
};

const fetchBrewMethods = createServerFn({ method: "GET" }).handler(async () => {
  const supabase = getSupabaseServerInstance();
  const results = await supabase.from("brew_method").select(`*`);

  return {
    user: {
      id: data.user.id,
      email: data.user.email,
    },
  };
});

export const loggedInUserQueryOptions = () =>
  queryOptions({
    queryKey: GET_BREW_METHODS_KEY,
    queryFn: fetchBrewMethods,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
