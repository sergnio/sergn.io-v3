import { createAPIFileRoute } from "@tanstack/react-start/api";
import { getSupabaseServerInstance } from "~/utils/supabase-instance";
import { json } from "@tanstack/react-start";

export const GetAuthenticatedUserRoute = createAPIFileRoute("/api/users/authenticated")({
  GET: async () => {
    const serverInstance = getSupabaseServerInstance();
    const { data, error } = await serverInstance.auth.getUser();

    if (!data.user?.email || error) {
      return json(null, { status: 401 });
    }

    return json({
      id: data.user.id,
      email: data.user.email,
    });
  },
});
