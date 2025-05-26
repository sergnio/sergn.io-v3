import { createAPIFileRoute } from "@tanstack/react-start/api";
import { getSupabaseServerInstance } from "~/utils/supabase-instance";
import { json } from "@tanstack/react-start";

export const GetAuthenticatedUserRoute = createAPIFileRoute(
  "/api/users/authenticated",
)({
  GET: async () => {
    console.log("trying");
    try {
      console.log("god damnit");
      const serverInstance = getSupabaseServerInstance();
      console.log("help");
      const { data, error } = await serverInstance.auth.getUser();
      if (!data.user?.email || error) {
        return json(null, { status: 401 });
      }

      return json({
        id: data.user.id,
        email: data.user.email,
      });
    } catch (e) {
      console.error("Error fetching authenticated user:", e);
      return json({ error: "Internal Server Error" }, { status: 500 });
    }
  },
});
