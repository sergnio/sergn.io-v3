import { json } from "@tanstack/react-start";
import { createAPIFileRoute } from "@tanstack/react-start/api";
import axios from "redaxios";
import { CoffeeType } from "~/utils/coffee";
import { getSupabaseServerInstance } from "~/utils/supabase-instance";

export const APIRoute = createAPIFileRoute("/api/coffee")({
  GET: async ({ request, params }) => {
    console.info(`Fetching all coffee... @`, request.url);
    try {
      const supabase = getSupabaseServerInstance();
      // const res = await axios.get<CoffeeType[]>(
      //   "https://jsonplaceholder.typicode.com/users/",
      // );

      const res = supabase.from("coffee");
      const { data } = await res.select(`
    id,
    name,
    bag_size (
      id,
      g,
      oz
    ),
    brew_method (
      id,
      name,
      grinder (
        id,
        type
      )
    )
  `);
      if (!data?.length) {
        return json({ error: "No coffee entries found" }, { status: 404 });
      }
      console.log("Coffee data:", JSON.stringify(data));

      return json(
        data.map(({ id, name }) => ({
          id: id.toString(),
          name,
        })),
      );
    } catch (e) {
      console.error(e);
      return json({ error: "Something went wrong!" }, { status: 500 });
    }
  },
});
