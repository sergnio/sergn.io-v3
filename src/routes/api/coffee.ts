import { json } from "@tanstack/react-start";
import { createAPIFileRoute } from "@tanstack/react-start/api";
import { getSupabaseServerInstance } from "~/utils/supabase-instance";

export const APIRoute = createAPIFileRoute("/api/coffee")({
  GET: async ({ request }) => {
    console.info(`Fetching all coffee... @`, request.url);
    try {
      const serverInstance = getSupabaseServerInstance();
      const table = serverInstance.from("coffee");
      const { data } = await table.select(`
  id,
  name,
  price,
  image_url,
  bag_size (
    id,
    g,
    oz
  ),
  coffee_brew_method (
    brew_method (
      id,
      name
    ),
    grinder_settings (
      id,
      number,
      rotations,
      setting,
      grinder_model (
        id,
        type
      )
    )
  )
`);

      if (!data?.length) {
        return json({ error: "No coffee entries found" }, { status: 404 });
      }

      return json(data);
    } catch (e) {
      console.error(e);
      return json({ error: "Something went wrong!" }, { status: 500 });
    }
  },
});
