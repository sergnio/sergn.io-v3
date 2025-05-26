import { json } from "@tanstack/react-start";
import { createAPIFileRoute } from "@tanstack/react-start/api";
import { getSupabaseServerInstance } from "~/utils/supabase-instance";

export const APIRoute = createAPIFileRoute("/api/users/authenticated")({
  GET: async ({ request }) => {
    console.info(`Fetching authenticated user... @`, request.url);
    try {
      const supabase = getSupabaseServerInstance();
      const { data, error: _error } = await supabase.auth.getUser();

      if (!data.user?.email || _error) {
        return json({ error: "No authenticated user found" }, { status: 404 });
      }

      return json({
        email: data.user.email,
      });
    } catch (e) {
      console.error(e);
      return json({ error: "Something went wrong!" }, { status: 500 });
    }
  },
});
