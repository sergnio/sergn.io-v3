import { createAPIFileRoute } from "@tanstack/react-start/api";
import { getSupabaseServerInstance } from "~/utils/supabase-instance";
import { json } from "@tanstack/react-start";

import { queryOptions } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";
import axios from "redaxios";
import { GET_COFFEE_KEY } from "~/constants/query-keys";

export type CoffeeType = {
  id: string;
  name: string;
  price: number;
};

export const LoginRoute = createAPIFileRoute("/api/login")({
  POST: async ({ request }) => {
    console.log("asdfasdfasdfadsf");
    console.log("got here");
    const { email, password } = await request.json();

    const supabase = getSupabaseServerInstance();
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error || !data.user) {
      return json(
        { error: error?.message ?? "Invalid credentials" },
        { status: 401 },
      );
    }

    return json({
      user: data.user,
    });
  },
});
